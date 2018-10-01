import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import WorkIcon from '@material-ui/icons/Work';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
});

function MostPopularPollsCard(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <List>
        {
          props.polls.map((poll, index) => (
            <ListItem key={poll.id}>
              <Avatar>
                {index + 1}
              </Avatar>
              <ListItemText primary={poll.settings.title}
                            secondary={`${poll.items[0].content.text} (${poll.items[0].voteCount} votes)`} />
            </ListItem>
          ))
        }
      </List>
    </div>
  );
}

export default withStyles(styles)(MostPopularPollsCard)