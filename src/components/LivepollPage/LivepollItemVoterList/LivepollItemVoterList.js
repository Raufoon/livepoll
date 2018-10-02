import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Typography from "@material-ui/core/Typography/Typography";
import BigRemoteDataDisplay from "../../BigRemoteDataDisplay/BigRemoteDataDisplay";
import {actionFetchVoterList} from "../../../state-management/actions/livepoll-actions";

const LivepollItemVoterList = props => (
  <BigRemoteDataDisplay
    doRequest={(startAt, limit) => props.dispatch(actionFetchVoterList(props.pollId, props.itemId, startAt, limit))}
    limit={5}
    totalFetched={props.voters ? props.voters.length: 0}>
    <List>
      <ListItem dense button>
        <Typography variant="headline" gutterBottom>
          Members Who Voted
        </Typography>
      </ListItem>
      {
        props.voterList.map(voter => (
          <ListItem key={voter.id} dense button>
            <Avatar>{voter.basicInfo.name[0]}</Avatar>
            <ListItemText primary={voter.basicInfo.name} />
          </ListItem>
        ))
      }
    </List>
  </BigRemoteDataDisplay>
);

LivepollItemVoterList.propTypes = {
  voters: PropTypes.array
};

export default connect()(LivepollItemVoterList)