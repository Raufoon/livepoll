import React from 'react'
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader'
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar'

import './TextItem.css'

const TextItem = props => {
  const isFirstItem = props.item.voteCount > 0 && props.index === 1;
  return (
    <Card className={`text-item text-item-resp`}>
      <CardHeader
        avatar={
          isFirstItem ? (
            <Avatar className={'avatar-first-item'} src={'https://mbtskoudsalg.com/images/1st-place-trophy-png-3.png'}>
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
          variant: isFirstItem ? 'display1' : 'headline'
        }}
        subheader={props.hideVotes ? false: `${props.item.voteCount} votes`}
        subheaderTypographyProps={{
          variant: isFirstItem ? 'subheading' : 'caption'
        }}
      />
    </Card>
  )
};

export default TextItem