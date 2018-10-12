import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import AddItemIcon from '@material-ui/icons/Add';
import InfoIcon from '@material-ui/icons/InfoOutlined';
import Loadable from 'react-loadable';
import { withStyles } from '@material-ui/core/styles';
import MediaQuery from "react-responsive";
import Typography from "@material-ui/core/Typography/Typography";
import Badge from "@material-ui/core/Badge/Badge";
import Grid from "@material-ui/core/Grid/Grid";

import {
  actionFetchPollInfo,
  actionPollRealtimeUpdate,
  actionRequestTopItems
} from "../../state-management/actions/livepoll-actions";
import LivepollItemList from "./LivepollItemList/LivepollItemList";
import {actionRequestCheckAlreadyVotedPoll} from "../../state-management/actions/my-profile-actions";
import ModalOpenerButton from "../utils/modal-openers/ModalOpenerButton/ModalOpenerButton";
import {subscribeRealtime, unsubscribeRealtime, updateRealtimeItems} from "../../util/poll/realtime-manager";
import {Loader} from "../loaders/FullScreenLoader";

const LivepollInfoCard = Loadable({
  loader: ()=>import('./LivepollInfoCard/LivepollInfoCard'),
  loading: Loader,
});

const styles = theme => ({
  infoButton: {
    color: '#67908c'
  },
  addButton: {
    color: '#45422a'
  },
  PollInfoCardDesktop: {
    borderLeft: '1px solid lightgray'
  }
});

const CreateItemForm = Loadable({
  loader: ()=>import('../forms/CreateItemForm/CreateItemForm'),
  loading: Loader,
});

class LivepollPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isSubscribed: false,
    };
    this.isLive = this.isLive.bind(this);
  }

  componentDidMount() {
    const pid = this.props.match.params.id;

    if (!this.props.livepoll) {
      this.props.dispatch(actionFetchPollInfo(pid));
      this.props.dispatch(actionRequestCheckAlreadyVotedPoll(pid));
    }
  }

  componentWillUnmount() {
    if (this.state.isSubscribed) {
      unsubscribeRealtime(this.props.livepoll.id);
    }
    clearInterval(this.refreshInterval);
  }

  componentDidUpdate(prevProps) {
    const pid = this.props.match.params.id;
    let items;
    let isSubscribed = this.state.isSubscribed;

    if (prevProps.livepoll !== this.props.livepoll) {
      if (!isSubscribed && this.isLive()) {
        isSubscribed = true;

        subscribeRealtime(pid, (pollId, itemId, voteCount) => {
          this.props.dispatch(actionPollRealtimeUpdate(pollId, itemId, voteCount));
        });

        this.refreshInterval = setInterval(() => {
          this.props.dispatch(actionRequestTopItems(this.props.livepoll.id, 0, this.state.items.length));
        }, 300000)
      }

      items = Object.values(this.props.livepoll.items || {}).sort((A, B) => A.voteCount > B.voteCount ? -1 : 1);
      this.setState({items, isSubscribed}, () => {
        if (isSubscribed) {
          updateRealtimeItems(this.props.livepoll.id, items);
        }
      });
    }
  }

  isLive() {
    const livepoll = this.props.livepoll;
    const settings = livepoll.settings;
    const start = new Date(settings.startDatetime);
    const end = new Date(settings.endDatetime);
    const now = new Date();
    const endTimeExists = !!settings.endDatetime;
    const willStartOnFuture = now < start;
    const hasEnded = endTimeExists && now >= end;
    return !(willStartOnFuture || hasEnded);
  }

  render () {
    const livepoll = this.props.livepoll;

    if (!livepoll) return '';

    const settings = livepoll.settings;
    const start = new Date(settings.startDatetime);
    const end = new Date(settings.endDatetime);
    const now = new Date();
    const endTimeExists = !!settings.endDatetime;
    const willStartOnFuture = now < start;
    const hasEnded = endTimeExists && now >= end;
    const isLive = this.isLive();
    const canIAdd = settings.othersCanAdd || (!settings.othersCanAdd && settings.creatorId === this.props.authUserId);
    const showAddItemButton = canIAdd && !hasEnded;

    const PollTitle = (
      <Badge
        color="default"
        badgeContent={isLive ? 'LIVE':''}
        classes={{
          badge: isLive ? 'poll-live-indicator blink' : ''
        }}>
        <MediaQuery minWidth={800}>
          <Typography variant="h2" gutterBottom>{settings.title}</Typography>
        </MediaQuery>
        <MediaQuery maxWidth={799}>
          <Typography variant="h5" gutterBottom>{settings.title}</Typography>
        </MediaQuery>
      </Badge>
    );

    const PollActions = (
      <div>
        <MediaQuery maxWidth={799}>
          <ModalOpenerButton
            className={this.props.classes.infoButton}
            ModalComponent={LivepollInfoCard}
            OpenerIcon={InfoIcon}
            openerComponentProps={{size: "small"}}
            childProps={{
              livepoll: this.props.livepoll,
              isLive: isLive,
              willStartOnFuture: willStartOnFuture,
              hasEnded: hasEnded
            }}>Info
          </ModalOpenerButton>
        </MediaQuery>
        {
          showAddItemButton &&
          <ModalOpenerButton
            className={this.props.classes.addButton}
            ModalComponent={CreateItemForm}
            OpenerIcon={AddItemIcon}
            openerComponentProps={{size: "small"}}
            childProps={{
              pollId: this.props.livepoll.id,
              format: this.props.livepoll.settings.itemFormat,
            }}
          >Add</ModalOpenerButton>
        }
      </div>
    );

    const PollItems = (
      <LivepollItemList
        items={this.state.items}
        lastVotedItemId={this.props.lastVotedItemId}
        voteDisabled={!isLive}
        willStartOnFuture={willStartOnFuture}
        livepoll={this.props.livepoll}
      />
    );

    return (
      <React.Fragment>
        {PollTitle}
        <MediaQuery minWidth={800}>
          <Grid container alignItems="flex-start" spacing={40}>
            <Grid item xs={7}>
              {PollActions}
              <br/>
              {PollItems}
            </Grid>
            <Grid item xs={2}/>
            <Grid item xs={3} className={this.props.classes.PollInfoCardDesktop}>
              <LivepollInfoCard
                livepoll={this.props.livepoll}
                isLive={isLive}
                willStartOnFuture={willStartOnFuture}
                hasEnded={hasEnded}
              />
            </Grid>
          </Grid>
        </MediaQuery>
        <MediaQuery maxWidth={799}>
          {PollActions}
          <br/>
          {PollItems}
        </MediaQuery>
      </React.Fragment>
    )
  }
}

const s2p = (state, ownProps) => ({
  livepoll: state.polls[ownProps.match.params.id],
  lastVotedItemId: state.myProfile.votedPolls[ownProps.match.params.id],
  authUserId: state.auth.currentUser.uid,
});

LivepollPage.propTypes = {
  livepoll: PropTypes.object,
  lastVotedItemId: PropTypes.string,
  authUserId: PropTypes.string,
};

export default connect(s2p)(
  withRouter(
    withStyles(styles)(LivepollPage)
  )
)