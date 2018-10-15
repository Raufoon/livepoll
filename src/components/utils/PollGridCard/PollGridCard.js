import React from 'react';
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles';
import {withRouter} from 'react-router-dom'
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Paper from '@material-ui/core/Paper';
import Typography from "@material-ui/core/Typography/Typography";

import VoteCountChip from "../VoteCountChip/VoteCountChip";
import MoreButton from "../../buttons/MoreButton/MoreButton";
import Chip from "@material-ui/core/Chip/Chip";
import Avatar from "@material-ui/core/Avatar/Avatar";
import {FIRST_TROPHY_IMG_URL} from "../../../constants/livepoll-constants";
import Button from "@material-ui/core/Button/Button";

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    padding: '20px',
    backgroundColor: '#fbfbfb',
    margin: 'auto',
    boxShadow: 'none',
    border: '1px solid lightgray'
  },
  gridList: {
    width: '100%',
  },
  titleBar: {
    backgroundColor: '#f2f2f2',
    cursor: 'pointer',
  },
  content: {
    marginTop: '15px',
    marginLeft: '15px'
  },
  title: {
    color: 'black'
  },
  tile: {
    border: '1px solid lightgray',
  },
  moreButton: {
    marginTop: 15,
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
    textTransform: 'none',
  },
  itemAvatar: {
    backgroundColor: '#f2f2f2'
  }
});
const autoHeight = {
  height: 'auto'
};

function PollGridCard(props) {
  const { classes } = props;

  return (
    <Paper className={classes.root}>
      <GridList className={classes.gridList} spacing={16}>
        <GridListTile cols={2} style={autoHeight}>
          <Typography variant="h5" gutterBottom>{props.title}</Typography>
        </GridListTile>

        <GridListTile cols={2} style={autoHeight}><br/></GridListTile>

        {
          props.polls.map(poll => (
            <GridListTile cols={props.columnWidth} key={poll.id}  className={classes.tile}>
              <div className={classes.content}>
                {
                  poll.items.map((item, itemIdx) => (
                    <div key={item.id}>
                      <Chip
                        className={props.classes.itemChip}
                        avatar={
                          itemIdx === 0 ? (
                            <Avatar src={FIRST_TROPHY_IMG_URL}>{itemIdx + 1}</Avatar>
                          ):(
                            <Avatar className={props.classes.itemAvatar}>{itemIdx + 1}</Avatar>
                          )
                        }
                        label={
                          <div>
                            <Button className={props.classes.itemText} size={'small'}>{item.content.text}</Button>
                            <VoteCountChip count={item.voteCount}/>
                          </div>
                        }
                      />
                      <br/>
                      <br/>
                    </div>
                  ))
                }
                <GridListTileBar
                  title={poll.settings.title}
                  onClick={()=>props.history.push('/poll/' + poll.id)}
                  classes={{
                    root: classes.titleBar,
                    title: classes.title,
                  }}
                />
              </div>
            </GridListTile>
          ))
        }
      </GridList>
      {
        props.polls.length > 0 && (
          <MoreButton
            className={classes.moreButton}
            moreLink={props.moreLink}/>
        )
      }
      {
        props.polls.length === 0 && (
          <Typography className={props.classes.notAvailableText} variant={'body1'}>None available</Typography>
        )
      }
    </Paper>
  );
}

PollGridCard.propTypes = {
  polls: PropTypes.array,
  moreLink: PropTypes.string,
  title: PropTypes.string,
};

export default withStyles(styles)(
  withRouter(
    PollGridCard
  )
)