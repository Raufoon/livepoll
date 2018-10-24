import React from 'react';
import PropTypes from 'prop-types'
import {withRouter} from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Typography from "@material-ui/core/Typography/Typography";
import MoreButton from "../../buttons/MoreButton/MoreButton";
import VoteCountChip from "../VoteCountChip/VoteCountChip";
import {FIRST_TROPHY_IMG_URL} from "../../../constants/livepoll-constants";

const styles = theme => ({
  root: {
    width: '100%',
    backgroundColor: '#fbfbfb',
    boxShadow: 'none',
    border: '1px solid lightgray',
    cursor: 'pointer'
  },
  moreButton: {
    margin: '0 auto',
    color: 'gray'
  },
  notAvailableText: {
    color: 'gray'
  },
  itemChip: {
    backgroundColor: 'transparent',
    marginTop: 5,
  },
  itemText: {
    color: '#222',
    fontWeight: 'normal',
    textTransform: 'none',
  },
  itemAvatar: {
    backgroundColor: '#f2f2f2'
  }
});

function PollListCard(props) {
  const { classes } = props;

  const listItemSecondaryText = {
    gutterBottom: true,
    variant: 'body1',
  };
  return (
    <Paper className={classes.root}>
      <List>
        <ListItem>
          <Typography variant="h5" gutterBottom>{props.title}</Typography>
        </ListItem>
        {
          props.polls.map((poll, index) => (
            <React.Fragment key={poll.id}>
              { index > 0 && <li><Divider/></li> }

              <ListItem>
                <ListItemText
                  primary={poll.settings.title}
                  primaryTypographyProps={{
                    variant: 'body1',
                    gutterBottom: true,
                    onClick: () => props.history.push('/poll/' + poll.id),
                  }}
                  secondaryTypographyProps={listItemSecondaryText}
                  secondary={
                    poll.items.map((item, itemIdx) => (
                      <Chip
                        key={item.id}
                        className={classes.itemChip}
                        avatar={
                          itemIdx === 0 ? (
                            <Avatar src={FIRST_TROPHY_IMG_URL}>{itemIdx + 1}</Avatar>
                          ):(
                            <Avatar className={classes.itemAvatar}>{itemIdx + 1}</Avatar>
                          )
                        }
                        label={
                          <div>
                            <Button className={classes.itemText} size={'small'}>{item.content.text}</Button>
                            <VoteCountChip count={item.voteCount}/>
                          </div>
                        }
                      />
                    ))
                  } />
              </ListItem>
            </React.Fragment>
          ))
        }
        {
          props.polls.length > 0 && (
            <ListItem>
              <MoreButton className={classes.moreButton} moreLink={props.moreLink}/>
            </ListItem>
          )
        }
        {
          props.polls.length === 0 && (
            <ListItem>
              <Typography className={'m-auto ' + props.classes.notAvailableText} variant={'body1'}>None available</Typography>
            </ListItem>
          )
        }
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