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
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import {
  actionFetchPollInfo,
  actionPollRealtimeUpdate
} from "../../state-management/actions/livepoll-actions";
import LivepollItemList from "./LivepollItemList/LivepollItemList";
import {actionRequestCheckAlreadyVotedPoll} from "../../state-management/actions/my-profile-actions";
import ModalOpenerButton from "../utils/modal-openers/ModalOpenerButton/ModalOpenerButton";
import {subscribeRealtime, unsubscribeRealtime, updateRealtimeItems} from "../../util/poll/realtime-manager";

const LivepollInfoCard = Loadable({
  loader: ()=>import('./LivepollInfoCard/LivepollInfoCard'),
  loading: ()=>'',
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
  },
  pollLiveIndicator: {
    color: 'crimson',
    fontSize: 'x-small',
  },
  percentText: {
    color: 'gray',
    textTransform: 'uppercase'
  }
});

const CreateItemForm = Loadable({
  loader: ()=>import('../forms/CreateItemForm/CreateItemForm'),
  loading: ()=>'',
});

class LivepollPage extends React.Component {
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

        // this.refreshInterval = setInterval(() => {
        //   this.props.dispatch(actionRequestTopItems(this.props.livepoll.id, 0, this.state.items.length));
        // }, 300000) TODO: add in worker
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

  onClickPercentCheckbox(event) {
    this.setState({viewAsPercent: event.target.checked})
  }

  onClickLiveCheckbox(event) {
    this.setState({isRealtime: event.target.checked});
    if (event.target.checked && !this.state.isSubscribed) {
      subscribeRealtime(this.props.livepoll.id, (pollId, itemId, voteCount) => {
        this.props.dispatch(actionPollRealtimeUpdate(pollId, itemId, voteCount));
      });
    } else if (!event.target.checked && this.state.isSubscribed) {
      unsubscribeRealtime(this.props.livepoll.id);
    }
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
        badgeContent={isLive && this.state.isRealtime ? 'LIVE':''}
        classes={{
          badge: isLive ? this.props.classes.pollLiveIndicator + ' blink' : ''
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
        &nbsp;&nbsp;&nbsp;
        <FormControlLabel
          className={this.props.classes.percentText}
          control={
            <Switch
              checked={this.state.viewAsPercent}
              onChange={this.onClickPercentCheckbox}
              value={'Percent'}
              color={'primary'}
            />
          }
          label={<b className={this.props.classes.percentText}>ratio</b>}
        />
        {
          isLive && (
            <FormControlLabel
              color={'secondary'}
              control={
                <Switch
                  checked={this.state.isRealtime}
                  onChange={this.onClickLiveCheckbox}
                  value={'live'}
                  color={'secondary'}
                />
              }
              label={<b className={this.props.classes.percentText}>Live</b>}
            />
          )
        }
      </div>
    );

    const PollItems = (
      <LivepollItemList
        items={this.state.items}
        isPercentView={this.state.viewAsPercent}
        lastVotedItemId={this.props.lastVotedItemId}
        voteDisabled={!isLive}
        willStartOnFuture={willStartOnFuture}
        livepoll={this.props.livepoll}
      />
    );

    return (
      <React.Fragment>
        {PollTitle}
        {
          hasEnded && <Typography variant="h6" gutterBottom>Poll has ended</Typography>
        }
        {
          willStartOnFuture && <Typography variant="h6" gutterBottom>Poll has not started yet</Typography>
        }
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