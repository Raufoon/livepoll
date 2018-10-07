import React from 'react'
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import VoteCountChip from "../utils/VoteCountChip/VoteCountChip";
import MediaQuery from "react-responsive";
import MoreButton from "../buttons/MoreButton/MoreButton";

const moreButtonStyle = {
  color: 'grey',
};

function TextPollCard(props) {
  return (
    <Card style={props.style}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="headline" component="h2">
            {props.poll.settings.title}
          </Typography>
          <MediaQuery orientation={'portrait'}>
            <Typography variant="subheading">
              {props.poll.items[0].content.text}
            </Typography>
            <VoteCountChip count={props.poll.items[0].voteCount}/>
          </MediaQuery>
          <MediaQuery orientation={'landscape'}>
            <Typography variant="subheading">
              {props.poll.items[0].content.text}&nbsp;&nbsp;<VoteCountChip count={props.poll.items[0].voteCount}/>
            </Typography>
          </MediaQuery>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <MoreButton style={moreButtonStyle} moreLink={`/poll/${props.poll.id}`}/>
      </CardActions>
    </Card>
  );
}

TextPollCard.propTypes = {
  poll: PropTypes.object.isRequired
};

export default TextPollCard