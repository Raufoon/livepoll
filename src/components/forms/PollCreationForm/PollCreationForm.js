import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom';

import LPForm from "../LPForm/LPForm";
import LPFormField from "../form-fields/LPFormField/LPFormField";
import PollSettings from "../../../util/poll/poll-definitions/poll-settings";
import {requestPublishLivepoll} from "../../../util/cloud/livepoll";

class PollCreationForm extends React.Component {
  constructor(props) {
    super(props);
    this.publishPoll = this.publishPoll.bind(this);
  }

  publishPoll(data) {
    // converting the time to utc
    data.startDatetime = new Date(data.startDatetime).toISOString();
    data.endDatetime = !!data.endDatetime ? new Date(data.endDatetime).toISOString() : 'infinite';

    requestPublishLivepoll(
      new PollSettings({
        ...data,
        creatorId: this.props.creatorId,
      })
    ).then(response => {
      this.props.history.push('/poll/' + response.livepoll.id);
      if (this.props.onModalResult) this.props.onModalResult();
    });
  }

  render() {
    return (
      <LPForm title={'Create a poll'} submitButtonLabel={'Publish your poll'} onSubmit={this.publishPoll}>
        {
          LPFormField.createRequiredField({
            name: 'title',
            type: 'text',
            placeholder: 'Give a nice title',
          })
        }
        <br/>
        {
          LPFormField.createOptionalField({
            name: 'startDatetime',
            type: 'datetime-local',
            title: 'When will it begin?',
            value: new Date().toLocaleString()
          })
        }
        <br/>
        {
          LPFormField.createOptionalField({
            name: 'endDatetime',
            type: 'datetime-local',
            title: 'When will it end?',
          })
        }
        <br/>
        {
          LPFormField.createDropdownField({
            name: 'privacy',
            title: 'Privacy',
            dropdownOptions: [
              {label: 'Public', value: PollSettings.POLL_PRIVACY.PUBLIC},
              {label: 'Link only', value: PollSettings.POLL_PRIVACY.PRIVATE},
            ]
          })
        }
        <br/>
        {
          LPFormField.createDropdownField({
            name: 'voteType',
            title: 'How to vote?',
            dropdownOptions: [
              {label: 'By tick', value: PollSettings.VOTE_TYPES.TICK_VOTE},
              {label: 'By 0-10', value: PollSettings.VOTE_TYPES.NUMBER_VOTE_0_10},
              {label: 'By 0-100', value: PollSettings.VOTE_TYPES.NUMBER_VOTE_0_100},
            ]
          })
        }
        <br/>
        {
          LPFormField.createDropdownField({
            name: 'itemFormat',
            title: 'Poll structure',
            dropdownOptions: [
              {label: 'Text', value: PollSettings.POLL_ITEM_FORMAT.TEXT},
              {label: 'Text + Image', value: PollSettings.POLL_ITEM_FORMAT.TEXT_WITH_IMAGE},
              {label: 'Text + Images', value: PollSettings.POLL_ITEM_FORMAT.TEXT_WITH_IMAGES},
              {label: 'Text + Video', value: PollSettings.POLL_ITEM_FORMAT.TEXT_WITH_VIDEO},
            ]
          })
        }
        <br/>
        {
          LPFormField.createOptionalField({
            name: 'othersCanAdd',
            placeholder: 'Allow others to add?',
            type: 'checkbox'
          })
        }
      </LPForm>
    )
  }
}

const s2p = state => ({
  creatorId: state.auth.userData.id
});
export default withRouter(connect(s2p)(PollCreationForm))