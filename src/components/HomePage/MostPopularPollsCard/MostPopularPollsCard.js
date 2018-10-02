import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';

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
    <Paper className={classes.root}>
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
    </Paper>
  );
}

export default withStyles(styles)(MostPopularPollsCard)