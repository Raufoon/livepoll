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
    data.endDatetime = !!data.endDatetime ? new Date(data.endDatetime).toISOString() : undefined;

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
          LPFormField.createOptionalField({
            name: 'isPrivate',
            type: 'checkbox',
            placeholder: 'the poll is private (link only)'
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
        <br/>
        {
          LPFormField.createOptionalField({
            name: 'hideVoters',
            placeholder: 'Hide voter list',
            type: 'checkbox'
          })
        }
      </LPForm>
    )
  }
}

const s2p = state => ({
  creatorId: state.auth.currentUser.uid
});
export default withRouter(connect(s2p)(PollCreationForm))