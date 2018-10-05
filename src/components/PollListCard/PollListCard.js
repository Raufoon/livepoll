import React from 'react';
import PropTypes from 'prop-types'
import {withRouter} from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import MoreIcon from '@material-ui/icons/MoreHoriz';
import { Link } from 'react-router-dom'
import Typography from "@material-ui/core/Typography/Typography";

const styles = theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  avatar: {
    cursor: 'pointer'
  },
  moreButton: {
    margin: '0 auto'
  }
});
const listItemPrimaryText = {
  variant: 'subheading',
  gutterBottom: true
};
const listItemSecondaryText = {
  gutterBottom: true
};

function PollListCard(props) {
  const { classes } = props;
  return (
    <Paper className={classes.root}>
      <List>
        <ListItem>
          <Typography variant="headline" gutterBottom>Most Popular Ever</Typography>
        </ListItem>
        {
          props.polls.map((poll, index) => (
            <React.Fragment key={poll.id}>
              { index > 0 && <li><Divider inset/></li> }

              <ListItem>
                <Avatar className={classes.avatar} onClick={()=>props.history.push('/poll/' + poll.id)}>{index + 1}</Avatar>
                <ListItemText
                  primary={poll.settings.title}
                  primaryTypographyProps={listItemPrimaryText}
                  secondaryTypographyProps={listItemSecondaryText}
                  secondary={`${poll.items[0].content.text} (${poll.items[0].voteCount} votes)`} />
              </ListItem>
            </React.Fragment>
          ))
        }
        <ListItem>
          <Button
            className={classes.moreButton}
            to={props.moreLink}
            component={Link}>
            <MoreIcon/>
            &nbsp;&nbsp;View More
          </Button>
        </ListItem>
      </List>
    </Paper>
  );
}

PollListCard.propTypes = {
  polls: PropTypes.array,
  moreLink: PropTypes.string,
};

export default withRouter(
  withStyles(styles)(
    PollListCard
  )
)