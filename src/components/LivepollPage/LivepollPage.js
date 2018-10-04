import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import AddItemIcon from '@material-ui/icons/AddToHomeScreen';

import './LivepollPage.css'
import {
  actionFetchPollInfo,
  actionPollRealtimeUpdate,
  actionRequestTopItems
} from "../../state-management/actions/livepoll-actions";
import LivepollInfoCard from "./LivepollInfoCard/LivepollInfoCard";
import LivepollItemList from "./LivepollItemList/LivepollItemList";
import {actionRequestCheckAlreadyVotedPoll} from "../../state-management/actions/my-profile-actions";
import ModalOpenerButton from "../modal-openers/ModalOpenerButton/ModalOpenerButton";
import CreateItemForm from "../forms/CreateItemForm/CreateItemForm";
import {subscribeRealtime, unsubscribeRealtime, updateRealtimeItems} from "../../util/poll/realtime-manager";

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

    if (!livepoll) {
      return "loading..."
    }

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

    return (
      <div>
        <LivepollInfoCard
          livepoll={this.props.livepoll}
          isLive={isLive}
          willStartOnFuture={willStartOnFuture}
          hasEnded={hasEnded}
        />
        <br/>
        {
          showAddItemButton &&
          <ModalOpenerButton
            ModalComponent={CreateItemForm}
            OpenerIcon={AddItemIcon}
            openerComponentProps={{
              size: "small",
              color: 'primary'
            }}
            childProps={{
              pollId: this.props.livepoll.id,
              format: this.props.livepoll.settings.itemFormat,
            }}
          >New item</ModalOpenerButton>
        }

        <br/><br/>

        <LivepollItemList
          items={this.state.items}
          lastVotedItemId={this.props.lastVotedItemId}
          voteDisabled={!isLive}
          willStartOnFuture={willStartOnFuture}
          livepoll={this.props.livepoll}/>
      </div>
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

export default connect(s2p)(withRouter(LivepollPage))