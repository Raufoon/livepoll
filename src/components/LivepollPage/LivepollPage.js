import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';

import './LivepollPage.css'
import {actionFetchPollInfo, actionRequestTopItems} from "../../state-management/actions/livepoll-actions";
import LivepollInfoCard from "./LivepollInfoCard/LivepollInfoCard";
import LivepollItemList from "./LivepollItemList/LivepollItemList";
import {actionRequestCheckAlreadyVotedPoll} from "../../state-management/actions/my-profile-actions";
import ModalOpenerButton from "../modal-openers/ModalOpenerButton/ModalOpenerButton";
import CreateItemForm from "../forms/CreateItemForm/CreateItemForm";

class LivepollPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    };
  }

  componentDidMount() {
    const pid = this.props.match.params.id;
    if (!this.props.livepoll) {
      this.props.dispatch(actionFetchPollInfo(pid));
      this.props.dispatch(actionRequestCheckAlreadyVotedPoll(pid));
    } else {
      this.setState({
        items: Object.values(this.props.livepoll.items || {})
          .sort((A, B) => A.voteCount > B.voteCount ? -1 : 1)
      })
    }
    this.refreshInterval = setInterval(() => {
      props.dispatch(actionRequestTopItems(this.props.livepoll.id, 0, this.state.items.length));
    }, 300000)
  }

  componentWillUnmount() {
    clearInterval(this.refreshInterval);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.livepoll !== this.props.livepoll) {
      this.setState({
        items: Object.values(this.props.livepoll.items || {})
          .sort((A, B) => A.voteCount > B.voteCount ? -1 : 1)
      })
    }
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
    const isLive = !(willStartOnFuture || hasEnded);
    const canIAdd = settings.othersCanAdd || (!settings.othersCanAdd && settings.creatorId === this.props.authUserId);
    const showAddItemButton = canIAdd && !hasEnded;

    if (isLive) {

    }

    return (
      <div>
        <LivepollInfoCard
          livepoll={this.props.livepoll}
          isLive={isLive}
          willStartOnFuture={willStartOnFuture}
          hasEnded={hasEnded}
        />

        <br/><br/>

        <LivepollItemList
          items={this.state.items}
          lastVotedItemId={this.props.lastVotedItemId}
          voteDisabled={!isLive}
          willStartOnFuture={willStartOnFuture}
          livepoll={this.props.livepoll}/>

        <br/>
        {
          showAddItemButton &&
          <ModalOpenerButton
            className={'add-item-button'}
            ModalComponent={CreateItemForm}
            openerComponentProps={{
              variant: 'extendedFab', size: "small",
              color: 'primary'
            }}
            childProps={{
              pollId: this.props.livepoll.id,
              format: this.props.livepoll.settings.itemFormat,
            }}
          >Add an item</ModalOpenerButton>
        }
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