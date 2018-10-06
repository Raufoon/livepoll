import React from 'react';
import {connect} from 'react-redux'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import SignoutIcon from '@material-ui/icons/ExitToAppSharp';
import EditIcon from '@material-ui/icons/Edit';
import { withStyles } from '@material-ui/core/styles';
import CardMedia from '@material-ui/core/CardMedia';

import {actionSignoutRequest} from "../../../state-management/actions/auth-actions";

const styles = {
  card: {
  },
  media: {
    height: 100,
  },
};

function ProfileCard(props) {
  const { classes } = props;
  if (!props.myProfile.basicInfo) return 'loading...';
  const signOut = () => props.dispatch(actionSignoutRequest());
  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image="/static/images/cards/contemplative-reptile.jpg"
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="headline" component="h2">
            {props.myProfile.basicInfo.name}
          </Typography>
          <Typography component="p">
            {props.myProfile.basicInfo.name} has been an active member of this community, creating
            and voting in many polls.
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="secondary" onClick={signOut}>
          <SignoutIcon/>&nbsp;&nbsp;Sign out
        </Button>
        <Button size="small">
          <EditIcon/>&nbsp;&nbsp;Edit
        </Button>
      </CardActions>
    </Card>
  );
}

const s2p = state => ({
  myProfile: state.myProfile
});

export default withStyles(styles)(
  connect(s2p)(
    ProfileCard
  )
);
