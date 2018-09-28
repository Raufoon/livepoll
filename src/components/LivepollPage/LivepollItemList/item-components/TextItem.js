import React from 'react'
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader'
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar'

import './TextItem.css'

const TextItem = props => (
  <Card className={'text-item'}>
    <CardHeader
      avatar={<Avatar>{props.index}</Avatar>}
      action={
        <Button onClick={props.vote} color={'primary'}>Vote</Button>
      }
      title={props.item.content.text}
      titleTypographyProps={{
        variant: 'title'
      }}
      subheader={`${props.item.voteCount} votes`}
    />
  </Card>
);

export default TextItem