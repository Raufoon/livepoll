import React from 'react'
import MediaQuery from 'react-responsive';
import PropTypes from 'prop-types'
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader'
import CardActions from '@material-ui/core/CardActions'
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar'
import Typography from "@material-ui/core/Typography/Typography";
import StarIcon from '@material-ui/icons/Star';
import Loadable from 'react-loadable';

import './TextItem.css'
import {FIRST_TROPHY_IMG_URL} from '../../../../constants/livepoll-constants';
import ModalOpenerButton from "../../../utils/modal-openers/ModalOpenerButton/ModalOpenerButton";
import VoteCountChip from "../../../utils/VoteCountChip/VoteCountChip";

const LivepollItemVoterList = Loadable({
  loader: ()=>import('../../LivepollItemVoterList/LivepollItemVoterList'),
  loading: ()=>'',
});

const VoteButton = (props) => {
  let style = {...props.style};
  style.color = props.isAlreadyVoted ? 'gray':'#006e3c';
  return (
    <Button
      style={style}
      onClick={props.vote}>
      <StarIcon/>
        &nbsp;
        {props.isAlreadyVoted ? 'Unvote':'Vote'}
    </Button>
  )
};

const mobileVoteBtn = {
  paddingTop: 0,
  paddingBottom: 0,
  textTransform: 'none',
  marginRight: 0,
  marginLeft: 'auto'
};
const mobileVoteButtonPanel = {
  paddingTop: 0,
  paddingBottom: 0,
  textAlign: 'right',
};

const TextItem = props => {
  let VoteCounter = false;

  if (!props.hideVotes) {
    if (props.showVoters) {
      VoteCounter = (
        <ModalOpenerButton
          ModalComponent={LivepollItemVoterList}
          childProps={{
            pollId: props.pollId,
            itemId: props.item.id,
            voterList: props.item.voterIds || [],
          }}
          OpenerComponent={Typography}
          dontHideOpener={true}
          openerComponentProps={{variant: 'body2'}}
        >
          <VoteCountChip count={props.item.voteCount}/>
        </ModalOpenerButton>
      )
    } else {
      VoteCounter = <VoteCountChip count={props.item.voteCount}/>;
    }
  }

  return (
    <Card className={`text-item text-item-resp`}>
      <CardHeader
        avatar={
          props.isFirst ? (
            <Avatar className={'avatar-first-item avatar-first-item-resp'} src={FIRST_TROPHY_IMG_URL}>
              {props.index}
            </Avatar>
          ):(
            <Avatar>
              {props.index}
            </Avatar>
          )
        }
        action={
          !props.voteDisabled && (
            <MediaQuery minWidth={800}>
              <VoteButton {...props}/>
            </MediaQuery>
          )
        }
        title={props.item.content.text}
        titleTypographyProps={{
          variant: props.isFirst ? 'h4' : 'h5',
        }}
        subheader={
          <div>
            {VoteCounter}
          </div>
        }
        subheaderTypographyProps={{
          variant: props.isFirst ? 'subtitle1' : 'caption'
        }}
      />
      <MediaQuery maxWidth={799}>
        <CardActions style={mobileVoteButtonPanel}>
          <VoteButton {...props} style={mobileVoteBtn}/>
        </CardActions>
      </MediaQuery>
    </Card>
  )
};

TextItem.propTypes = {
  isFirst: PropTypes.bool,
  isAlreadyVoted: PropTypes.bool,
  voteDisabled: PropTypes.bool,
  vote: PropTypes.func,
  item: PropTypes.object,
  pollId: PropTypes.string,
  index: PropTypes.number,
  voterList: PropTypes.array,
};

export default TextItem