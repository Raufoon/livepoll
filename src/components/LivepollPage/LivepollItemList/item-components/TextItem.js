import React from 'react'
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader'
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar'
import Typography from "@material-ui/core/Typography/Typography";

import {FIRST_TROPHY_IMG_URL} from '../../../../constants/livepoll-constants';
import './TextItem.css'
import ModalOpenerButton from "../../../modal-openers/ModalOpenerButton/ModalOpenerButton";
import LivepollItemVoterList from "../../LivepollItemVoterList/LivepollItemVoterList";

const TextItem = props => {
  let VoteCounter = false;
  if (!props.hideVotes) {
    if (props.showVoters) {
      VoteCounter = (
        <ModalOpenerButton
          ModalComponent={LivepollItemVoterList}
          OpenerComponent={Typography}
          dontHideOpener={true}
          openerComponentProps={{variant: 'body1'}}
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
            <Button
              onClick={props.vote}
              color={props.isAlreadyVoted ? 'secondary':'default'}>
              {props.isAlreadyVoted ? 'Unvote':'Vote'}
            </Button>
          )
        }
        title={props.item.content.text}
        titleTypographyProps={{
          variant: props.isFirst ? 'display1' : 'headline',
        }}
        subheader={VoteCounter}
        subheaderTypographyProps={{
          variant: props.isFirst ? 'subheading' : 'caption'
        }}
      />
    </Card>
  )
};

export default TextItem