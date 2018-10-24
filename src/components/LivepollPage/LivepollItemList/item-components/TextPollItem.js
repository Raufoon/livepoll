import React from 'react'
import MediaQuery from 'react-responsive';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types'
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader'
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar'
import Typography from "@material-ui/core/Typography/Typography";
import StarIcon from '@material-ui/icons/Star';
import Loadable from 'react-loadable';

import './TextItem.css'
import {FIRST_TROPHY_IMG_URL} from '../../../../constants/livepoll-constants';
import ModalOpenerButton from "../../../utils/modal-openers/ModalOpenerButton/ModalOpenerButton";
import VoteCountChip from "../../../utils/VoteCountChip/VoteCountChip";
import LPLoader from "../../../loaders/LPLoader";

const LivepollItemVoterList = Loadable({
  loader: ()=>import('../../LivepollItemVoterList/LivepollItemVoterList'),
  loading: LPLoader,
});

const TextPollItemAvatar = props => {
  if (props.isFirst) {
    return (
      <Avatar className={'avatar-first-item avatar-first-item-resp'} src={FIRST_TROPHY_IMG_URL}>
        {props.index}
      </Avatar>
    )
  } else {
    return (
      <Avatar className={'avatar-regular'}>
        {props.index}
      </Avatar>
    )
  }
};

const VoteButton = (props) => {
  let style = {...props.style};
  style.color = props.isAlreadyVoted ? '#e5abab':'#80af71';
  return (
    <Button
      className={props.className}
      style={style}
      size={'small'}
      onClick={props.vote}>
      <StarIcon/>
      &nbsp;
      {props.isAlreadyVoted ? 'Unvote':'Vote'}
    </Button>
  )
};

const VoteCounter = props => {
  if (props.hideVotes) return <div/>;
  let voteCount = props.item.voteCount;
  if (props.isPercentView) {
    voteCount = parseInt((voteCount / props.totalVotes)*10000, 10);
    voteCount /= 100;
    voteCount += '%';
  }
  if (props.showVoters) {
    return (
      <ModalOpenerButton
        className={props.className}
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
        <VoteCountChip count={voteCount} short={true}/>
      </ModalOpenerButton>
    )
  }
  return <VoteCountChip className={props.className} short={true} count={voteCount}/>;
};

const styles = (theme) => ({
  voteButton: {
    textTransform: 'none',
    padding: 0,
  },
  voteCounter: {
    textTransform: 'none',
    padding: 0,
    color: '#ae7b09',
    fontSize: 'large'
  }
});

const Title = (props) => (
  <React.Fragment>
    <MediaQuery minWidth={800}>
      <Typography variant={props.isFirst ? 'h4' : 'h5'} gutterBottom>{props.text}</Typography>
    </MediaQuery>
    <MediaQuery maxWidth={799}>
      <Typography variant={'h5'} gutterBottom>{props.text}</Typography>
    </MediaQuery>
  </React.Fragment>
);

const TextPollItem = props => (
  <Card className={'text-item text-item-resp'}>
    <CardHeader
      avatar={<TextPollItemAvatar isFirst={props.isFirst} index={props.index}/>}
      action={<VoteCounter {...props} className={props.classes.voteCounter}/>}
      title={<Title isFirst={props.isFirst} text={props.item.content.text}/>}
      subheader={
        <div>
          {!props.voteDisabled && <VoteButton {...props} className={props.classes.voteButton}/>}
        </div>
      }
      subheaderTypographyProps={{
        variant: props.isFirst ? 'subtitle1' : 'caption'
      }}
    />
  </Card>
);

TextPollItem.propTypes = {
  isFirst: PropTypes.bool,
  isAlreadyVoted: PropTypes.bool,
  voteDisabled: PropTypes.bool,
  vote: PropTypes.func,
  item: PropTypes.object,
  pollId: PropTypes.string,
  index: PropTypes.number,
  voterList: PropTypes.array,
};

export default React.memo(withStyles(styles)(TextPollItem));