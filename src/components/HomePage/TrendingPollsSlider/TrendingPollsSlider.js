import React from 'react';
import {withRouter} from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Paper from '@material-ui/core/Paper';
import Typography from "@material-ui/core/Typography/Typography";

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    padding: '20px',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: '100%',
  },
  titleBar: {
    backgroundColor: 'lightgray',
    opacity: '0.5',
  },
  content: {
    margin: '15px'
  },
  title: {
    color: 'black'
  },
  tile: {
    border: '1px solid lightgray',
  }
});

function TrendingPollsSlider(props) {
  const { classes } = props;

  return (
    <Paper className={classes.root}>
      <GridList cellHeight={150} className={classes.gridList}>
        <GridListTile cols={2} style={{ height: 'auto' }}>
          <Typography variant="headline" gutterBottom>
            Trending Now
          </Typography>
        </GridListTile>
        <GridListTile cols={2} style={{ height: 'auto' }}>
          <br/>
        </GridListTile>
        {
          props.polls.map(poll => (
            <GridListTile key={poll.id}  className={classes.tile}>
              <Typography variant="headline" className={classes.content}>{poll.items[0].content.text}</Typography>
              <Typography variant="body1" className={classes.content}>
                {poll.items[0].voteCount} votes
              </Typography>
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
    </Paper>
  );
}

export default withRouter(withStyles(styles)(TrendingPollsSlider))