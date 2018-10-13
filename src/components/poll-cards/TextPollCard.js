import React from 'react'
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import { withStyles } from '@material-ui/core/styles';
import { Link, withRouter } from 'react-router-dom';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import VoteCountChip from "../utils/VoteCountChip/VoteCountChip";
import MediaQuery from "react-responsive";

const styles = theme => ({
  container: {
    backgroundColor: '#fbfbfb',
    margin: 10,
    boxShadow: 'none',
    border: '1px solid lightgray',
  },
  cardTitle: {
    textDecoration: 'none'
  }
});

function TextPollCard(props) {
  const {classes} = props;
  return (
    <Card className={classes.container + ' ' + props.className}>
      <CardActionArea>
        <CardContent>
          <Typography
            className={classes.cardTitle}
            gutterBottom
            variant="h5"
            component={Link}
            to={`/poll/${props.poll.id}`}
          >
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
    </Card>
  );
}

TextPollCard.propTypes = {
  poll: PropTypes.object.isRequired
};

export default withStyles(styles)(
  withRouter(
    TextPollCard
  )
)