import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom';

import './PollCreationForm.css'
import LPForm from "../LPForm/LPForm";
import LPFormField from "../form-fields/LPFormField/LPFormField";
import PollSettings from "../../../util/poll/poll-definitions/poll-settings";
import {requestPublishLivepoll} from "../../../util/cloud/livepoll";
import LPDateInput from "../form-fields/LPDateInput/LPDateInput";
import LPCheckboxInput from "../form-fields/LPCheckboxInput/LPCheckboxInput";
import LPDropdownInput from "../form-fields/LPDropdownInput/LPDropdownInput";

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
            className: 'w100',
            name: 'title',
            type: 'text',
            label: 'Give a nice title',
            defaultValue: '',
          })
        }
        <br/>
        <LPDateInput name={'startDatetime'}
                     label={'When will it begin?'}
                     defaultValue={new Date()}/>
        <br/>
        <LPDateInput name={'endDatetime'} label={'When will it end?'} defaultValue={''}/>
        <LPCheckboxInput name={'isPrivate'} label={'This poll is private'}/>
        {
          LPDropdownInput.createDropdownField({
            name: 'itemFormat',
            label: 'Poll format',
            dropdownOptions: [
              {label: 'Text', value: PollSettings.POLL_ITEM_FORMAT.TEXT},
              {label: 'Text + Image', value: PollSettings.POLL_ITEM_FORMAT.TEXT_WITH_IMAGE},
              {label: 'Text + Images', value: PollSettings.POLL_ITEM_FORMAT.TEXT_WITH_IMAGES},
              {label: 'Text + Video', value: PollSettings.POLL_ITEM_FORMAT.TEXT_WITH_VIDEO},
            ]
          })
        }<br/>
        <LPCheckboxInput name={'othersCanAdd'} label={'Allow others to add'}/>
        <LPCheckboxInput name={'showVoters'} label={'Show voter list'}/>
      </LPForm>
    )
  }
}

const s2p = state => ({
  creatorId: state.auth.currentUser.uid
});
export default withRouter(connect(s2p)(PollCreationForm))