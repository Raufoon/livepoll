import React from 'react'
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader'
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar'

import {FIRST_TROPHY_IMG_URL} from '../../../../constants/livepoll-constants';

import './TextItem.css'

const TextItem = props => {
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
          variant: props.isFirst ? 'display1' : 'headline'
        }}
        subheader={props.hideVotes ? false: `${props.item.voteCount} votes`}
        subheaderTypographyProps={{
          variant: props.isFirst ? 'subheading' : 'caption'
        }}
      />
    </Card>
  )
};

export default TextItem