import React from 'react';
import PropTypes from 'prop-types'
import {withRouter} from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Typography from "@material-ui/core/Typography/Typography";
import MoreButton from "../../buttons/MoreButton/MoreButton";
import VoteCountChip from "../VoteCountChip/VoteCountChip";

const styles = theme => ({
  root: {
    width: '100%',
    backgroundColor: '#fbfbfb',
    boxShadow: 'none',
    border: '1px solid lightgray',
  },
  avatar: {
    cursor: 'pointer'
  },
  moreButton: {
    margin: '0 auto',
    color: 'gray'
  }
});
const listItemPrimaryText = {
  variant: 'body2',
  gutterBottom: true
};
const listItemSecondaryText = {
  gutterBottom: true,
  variant: 'body1',
};

function PollListCard(props) {
  const { classes } = props;
  return (
    <Paper className={classes.root}>
      <List>
        <ListItem>
          <Typography variant="h5" gutterBottom>{props.title}</Typography>
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
                  secondary={<Typography variant={'subtitle1'} gutterBottom>{poll.items[0].content.text} <VoteCountChip count={poll.items[0].voteCount}/></Typography>} />
              </ListItem>
            </React.Fragment>
          ))
        }
        <ListItem>
          <MoreButton className={classes.moreButton} moreLink={props.moreLink}/>
        </ListItem>
      </List>
    </Paper>
  );
}

PollListCard.propTypes = {
  polls: PropTypes.array,
  moreLink: PropTypes.string,
  title: PropTypes.string,
};

export default withStyles(styles)(
  withRouter(PollListCard)
)