import React from 'react'
import CardActions from '@material-ui/core/CardActions';
import MediaQuery from 'react-responsive';
import PropTypes from 'prop-types'
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader'
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar'
import Typography from "@material-ui/core/Typography/Typography";
import StarIcon from '@material-ui/icons/StarBorder';
import Loadable from 'react-loadable';

import './TextItem.css'
import {FIRST_TROPHY_IMG_URL} from '../../../../constants/livepoll-constants';
import ModalOpenerButton from "../../../utils/modal-openers/ModalOpenerButton/ModalOpenerButton";

const LivepollItemVoterList = Loadable({
  loader: ()=>import('../../LivepollItemVoterList/LivepollItemVoterList'),
  loading: ()=>'',
});

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
          {props.item.voteCount} votes
        </ModalOpenerButton>
      )
    } else {
      VoteCounter = `${props.item.voteCount} votes`;
    }
  }

  return (
    <Card className={`text-item text-item-resp`}>
      <CardHeader
        avatar={
          props.isFirst ? (
            <Avatar className={'avatar-first-item'} src={FIRST_TROPHY_IMG_URL}>
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
              <Button
                onClick={props.vote}
                color={props.isAlreadyVoted ? 'secondary':'default'}>
                <StarIcon/>
                &nbsp;&nbsp;
                {props.isAlreadyVoted ? 'Unvote':'Vote'}
              </Button>
            </MediaQuery>
          )
        }
        title={props.item.content.text}
        titleTypographyProps={{
          variant: props.isFirst ? 'h4' : 'h5',
        }}
        subheader={VoteCounter}
        subheaderTypographyProps={{
          variant: props.isFirst ? 'subtitle1' : 'caption'
        }}
      />
      <CardActions>
        {
          !props.voteDisabled && (
            <MediaQuery maxWidth={799}>
              <Button
                onClick={props.vote}
                color={props.isAlreadyVoted ? 'secondary':'default'}>
                <StarIcon/>
                &nbsp;&nbsp;
                {props.isAlreadyVoted ? 'Unvote':'Vote'}
              </Button>
            </MediaQuery>
          )
        }
      </CardActions>
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