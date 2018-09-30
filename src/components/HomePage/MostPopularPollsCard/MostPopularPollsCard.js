import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import ListSubheader from '@material-ui/core/ListSubheader';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 500,
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  titleBar: {
    backgroundColor: 'lightgray',
    opacity: '0.5'
  },
  title: {
    color: 'black'
  },
  icon: {
    color: 'black'
  },
  content: {
    display: 'block'
  }
});

function MostPopularPollsCard(props) {
  const { classes } = props;

  return (
    <Paper className={classes.root}>
      <GridList cellHeight={100} spacing={1} className={classes.gridList}>
        <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
          <ListSubheader component="div">Most Popular Polls</ListSubheader>
        </GridListTile>
        {
          props.polls.map(poll => (
            <GridListTile key={poll.id} cols={2} rows={1}>
              <div className={classes.content}/>
              <GridListTileBar
                title={poll.settings.title}
                titlePosition="top"
                actionIcon={
                  <IconButton className={classes.icon}>
                    <StarBorderIcon />
                  </IconButton>
                }
                actionPosition="left"
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

export default withStyles(styles)(MostPopularPollsCard)