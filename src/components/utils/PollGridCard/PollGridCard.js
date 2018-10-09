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
    backgroundColor: 'lightgray',
    opacity: '0.5',
    cursor: 'pointer'
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
  }
});
const autoHeight = {
  height: 'auto'
};

function PollGridCard(props) {
  const { classes } = props;

  return (
    <Paper className={classes.root}>
      <GridList cellHeight={150} className={classes.gridList}>
        <GridListTile cols={2} style={autoHeight}>
          <Typography variant="h5" gutterBottom>{props.title}</Typography>
        </GridListTile>

        <GridListTile cols={2} style={autoHeight}><br/></GridListTile>

        {
          props.polls.map(poll => (
            <GridListTile cols={props.columnWidth} key={poll.id}  className={classes.tile}>
              <div className={classes.content}>
                <Typography variant="h5">{poll.items[0].content.text}</Typography>
                <VoteCountChip count={poll.items[0].voteCount}/>
              </div>
              <GridListTileBar
                title={poll.settings.title}
                onClick={()=>props.history.push('/poll/' + poll.id)}
                classes={{
                  root: classes.titleBar,
                  title: classes.title,
                }}
              />
            </GridListTile>
          ))
        }
      </GridList>
      <MoreButton
        className={classes.moreButton}
        moreLink={props.moreLink}/>
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