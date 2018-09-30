import React from 'react'
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import { withStyles } from '@material-ui/core/styles';

import './TrendingPollsSlider.css'

const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 2,
  },
  gridListRoot: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  tile: {
    border: '1px solid lightgray',
    margin: '3px'
  },
  widthMaker: {
    width: '400px',
    display: 'block',
  },
  gridList: {
    flexWrap: 'nowrap',
    transform: 'translateZ(0)',
  },
  title: {
    color: 'black',
  },
  titleBar: {
    backgroundColor: 'lightgray',
    opacity: '0.5'
  },
});

const TrendingPollsSlider = (props) => {
  const { classes } = props;
  return (
    <Paper className={classes.root}>
      <Typography gutterBottom variant="display1">Trending now</Typography>
      <br/>
      <div className={`${classes.gridListRoot}`}>
        <GridList className={`${classes.gridList} trending-slider-gridlist`} cols={2.5}>
          {
            props.polls.map(poll => (
              <GridListTile key={poll.id} className={classes.tile}>
                <div className={classes.widthMaker}/>
                <GridListTileBar
                  title={poll.settings.title}
                  classes={{
                    root: classes.titleBar,
                    title: classes.title,
                  }}
                  actionIcon={
                    <IconButton>
                      <StarBorderIcon className={classes.title} />
                    </IconButton>
                  }
                />
              </GridListTile>
            ))
          }
        </GridList>
      </div>
    </Paper>
  );
}
export default withStyles(styles)(TrendingPollsSlider)