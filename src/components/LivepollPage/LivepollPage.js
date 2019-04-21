import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import Loadable from 'react-loadable';
import { withStyles } from '@material-ui/core/styles';

import {
  actionFetchPollInfo,
  actionPollRealtimeUpdate, actionRequestTopItems
} from "../../state-management/actions/livepoll-actions";
import LivepollItemList from "./LivepollItemList/LivepollItemList";
import {actionRequestCheckAlreadyVotedPoll} from "../../state-management/actions/my-profile-actions";
import ModalOpenerButton from "../utils/modal-openers/ModalOpenerButton/ModalOpenerButton";
import {subscribeRealtime, unsubscribeRealtime, updateRealtimeItems} from "../../util/poll/realtime-manager";
import LPLoader from "../loaders/LPLoader";
import ImageButton from "../utils/ImageButton";
import Responsive, {MEDIUM_SCREEN, PHONE_SCREEN} from "../utils/Responsive";

const LivepollInfoCard = Loadable({
  loader: ()=>import('./LivepollInfoCard/LivepollInfoCard'),
  loading: LPLoader,
});

const styles = () => ({
  infoButton: {
    color: '#67908c'
  },
  addButton: {
    color: '#45422a'
  },
  PollInfoCardDesktop: {
    borderLeft: '1px solid lightgray'
  },
  pollLiveIndicator: {
    color: 'crimson',
    fontSize: 'x-small'
  },
  container: {
    fontFamily: 'Comfortaa',
  },
  option: {
    fontSize: 'small',
    textTransform: 'uppercase',
    color: '#10042b',
    backgroundColor: 'white',
  },
});

const CreateItemForm = Loadable({
  loader: ()=>import('../forms/CreateItemForm/CreateItemForm'),
  loading: LPLoader,
});

class LivepollPage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isSubscribed: false,
      viewAsPercent: false,
      isRealtime: false,
    };
    this.isLive = this.isLive.bind(this);
    this.onClickPercentCheckbox = this.onClickPercentCheckbox.bind(this);
    this.onClickLiveCheckbox = this.onClickLiveCheckbox.bind(this);
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

        this.setState({
          isRealtime: true
        });

        subscribeRealtime(pid, (pollId, itemId, voteCount) => {
          this.props.dispatch(actionPollRealtimeUpdate(pollId, itemId, voteCount));
        });

        this.refreshInterval = setInterval(() => {
          this.props.dispatch(actionRequestTopItems(this.props.livepoll.id, 0, this.state.items.length));
        }, 300000)
      }

      items = Object.values(this.props.livepoll.items || {})
        .sort((A, B) => A.voteCount > B.voteCount ? -1 : 1);

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

  onClickPercentCheckbox() {
    this.setState(prevState => ({
      viewAsPercent: !prevState.viewAsPercent
    }))
  }

  onClickLiveCheckbox(event) {
    this.setState(prevState => ({
      isRealtime: !prevState.isRealtime
    }));
    if (event.target.checked && !this.state.isSubscribed) {
      subscribeRealtime(this.props.livepoll.id, (pollId, itemId, voteCount) => {
        this.props.dispatch(actionPollRealtimeUpdate(pollId, itemId, voteCount));
      });
    } else if (!event.target.checked && this.state.isSubscribed) {
      unsubscribeRealtime(this.props.livepoll.id);
    }
  }

  render () {
    if (!this.props.livepoll) return '';

    const {
      livepoll,
      classes,
      authUserId,
      lastVotedItemId,
    } = this.props;

    const {
      startDatetime,
      endDatetime,
      othersCanAdd,
      creatorId,
      itemFormat,
      creatorName,
      title,
    } = livepoll.settings;

    const start = new Date(startDatetime);
    const end = new Date(endDatetime);
    const now = new Date();
    const endTimeExists = !!endDatetime;
    const willStartOnFuture = now < start;
    const hasEnded = endTimeExists && now >= end;
    const isLive = this.isLive();
    const canIAdd = othersCanAdd || (!othersCanAdd && creatorId === authUserId);
    const showAddItemButton = canIAdd && !hasEnded;

    const PollActions = (
      <div>
        <Responsive screen={PHONE_SCREEN}>
          <ModalOpenerButton
            className={`${classes.option} ${classes.infoButton} fl`}
            ModalComponent={LivepollInfoCard}
            childProps={{creatorName, startDatetime, endDatetime, willStartOnFuture, hasEnded, totalVotes: livepoll.totalVotes,}}>
            Info
          </ModalOpenerButton>
        </Responsive>
        {
          showAddItemButton &&
          <ModalOpenerButton
            className={`${classes.option} ${classes.addButton} fl`}
            ModalComponent={CreateItemForm}
            childProps={{ pollId: livepoll.id, format: itemFormat }}
          >+ADD</ModalOpenerButton>
        }
        <ImageButton className={`${classes.option} fl`} onClick={this.onClickPercentCheckbox}>
          <input type={'checkbox'} checked={this.state.viewAsPercent} disabled/> View As Percent
        </ImageButton>
        {
          isLive && (
            <ImageButton className={`${classes.option} fl`} onClick={this.onClickLiveCheckbox}>
              <input type={'checkbox'} checked={this.state.isRealtime} disabled/> Live
            </ImageButton>
          )
        }
        <br/><br/>
      </div>
    );

    const itemList = (
      <LivepollItemList
        items={this.state.items}
        isPercentView={this.state.viewAsPercent}
        lastVotedItemId={lastVotedItemId}
        voteDisabled={!isLive}
        willStartOnFuture={willStartOnFuture}
        livepoll={livepoll}
      />
    );

    return (
      <div className={`pure-g ${classes.container}`}>
        <div className={'pure-u-1-1'}>
          <h2 className={'font-comf'}>
            {title}
            {
              isLive && (
                <sup><small>
                  <span className={`${classes.pollLiveIndicator} blink`}>&nbsp;&nbsp;LIVE</span>
                </small></sup>
              )
            }
          </h2>
        </div>

        <Responsive screen={MEDIUM_SCREEN}>
          <div className={'pure-u-1-1'}>
            <div className={'pure-g'}>
              <div className={'pure-u-1-2'}>
                {PollActions}
                <br/><br/>
                {itemList}
              </div>
              <div className={'pure-u-1-2'}>
                <LivepollInfoCard
                  creatorName={creatorName}
                  startDatetime={startDatetime}
                  endDatetime={endDatetime}
                  willStartOnFuture={willStartOnFuture}
                  hasEnded={hasEnded}
                  totalVotes={livepoll.totalVotes}
                />
              </div>
            </div>
          </div>
        </Responsive>

        <Responsive screen={PHONE_SCREEN}>
          <div className={'pure-u-1-1'}>{PollActions}<br/><br/></div>
          <div className={'pure-u-1-1'}>
            <br/>
            {itemList}
          </div>
        </Responsive>
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

export default connect(s2p)(
  withRouter(
    withStyles(styles)(LivepollPage)
  )
)