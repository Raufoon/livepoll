import React from 'react';
import {connect} from 'react-redux'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import SignoutIcon from '@material-ui/icons/ExitToAppSharp';
import EditIcon from '@material-ui/icons/Edit';
import {actionSignoutRequest} from "../../../state-management/actions/auth-actions";

const ProfileCard = (props) => {
  if (!props.myProfile.basicInfo) return 'loading...';
  const signOut = () => props.dispatch(actionSignoutRequest());
  return (
    <Card>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="display1" component="h2">
            {props.myProfile.basicInfo.name}
          </Typography>
          <List>
            <ListItem>
              <ListItemText primary={props.myProfile.basicInfo.dob} secondary="Date of birth" />
            </ListItem>
          </List>
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
};
const s2p = state => ({
  myProfile: state.myProfile
});
export default connect(s2p)(ProfileCard);
