import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import Paper from '@material-ui/core/Paper';

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
  title: {
    color: 'black',
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
        <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
          <ListSubheader component="div">Trending Now</ListSubheader>
        </GridListTile>
        {
          props.polls.map(poll => (
            <GridListTile key={poll.id}  className={classes.tile}>
              <GridListTileBar
                title={poll.settings.title}
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

export default withStyles(styles)(TrendingPollsSlider)