import React from 'react'
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Typography from "@material-ui/core/Typography/Typography";

const LivepollItemVoterList = props => (
  <List>
    <ListItem dense button>
      <Typography variant="headline" gutterBottom>
        Members Who Voted
      </Typography>
    </ListItem>
    {[0, 1, 2, 3].map(value => (
      <ListItem key={value} dense button>
        <Avatar>X</Avatar>
        <ListItemText primary={`Line item ${value + 1}`} />
      </ListItem>
    ))}
  </List>
);

LivepollItemVoterList.propTypes = {
  voters: PropTypes.array
};

export default LivepollItemVoterList