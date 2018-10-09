import React from 'react'
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import { withStyles } from '@material-ui/core/styles';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import VoteCountChip from "../utils/VoteCountChip/VoteCountChip";
import MediaQuery from "react-responsive";
import MoreButton from "../buttons/MoreButton/MoreButton";

const styles = theme => ({
  moreButton: {
    color: 'grey'
  },
  container: {
    backgroundColor: '#fbfbfb',
  }
});

function TextPollCard(props) {
  const {classes} = props;
  return (
    <Card className={classes.container} style={props.style}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.poll.settings.title}
          </Typography>
          <MediaQuery maxWidth={799}>
            <Typography variant="subtitle1">
              {props.poll.items[0].content.text}
            </Typography>
            <VoteCountChip count={props.poll.items[0].voteCount}/>
          </MediaQuery>
          <MediaQuery minWidth={800}>
            <Typography variant="subtitle1">
              {props.poll.items[0].content.text}&nbsp;&nbsp;<VoteCountChip count={props.poll.items[0].voteCount}/>
            </Typography>
          </MediaQuery>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <MoreButton className={classes.moreButton} moreLink={`/poll/${props.poll.id}`}/>
      </CardActions>
    </Card>
  );
}

TextPollCard.propTypes = {
  poll: PropTypes.object.isRequired
};

export default withStyles(styles)(TextPollCard)