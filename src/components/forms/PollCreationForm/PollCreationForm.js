import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom';

import './PollCreationForm.css'
import LPForm from "../LPForm/LPForm";
import LPFormField from "../form-fields/LPFormField/LPFormField";
import PollSettings from "../../../services/util/poll/poll-definitions/poll-settings";
import {requestPublishLivepoll} from "../../../services/util/cloud/livepoll";
import LPDateInput from "../form-fields/LPDateInput/LPDateInput";
import LPCheckboxInput from "../form-fields/LPCheckboxInput/LPCheckboxInput";
import LPDropdownInput from "../form-fields/LPDropdownInput/LPDropdownInput";
import {actionMakeErrorToast} from "../../../services/state-management/actions/toast-actions";
import Typography from "@material-ui/core/Typography/Typography";

class PollCreationForm extends React.Component {
  constructor(props) {
    super(props);
    this.publishPoll = this.publishPoll.bind(this);
  }

  publishPoll(data) {
    // converting the time to utc
    data.startDatetime = new Date(data.startDatetime).toISOString();
    data.endDatetime = !!data.endDatetime ? new Date(data.endDatetime).toISOString() : undefined;

    if (data.endDatetime) {
      if (new Date(data.endDatetime) - new Date(data.startDatetime) < 2*60*60*1000) {
        this.props.dispatch(actionMakeErrorToast('Poll should last at least 2 hours'));
        return;
      }
    }

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
        <br/>
        <Typography className={'tac'} variant="h5" gutterBottom>Create your poll</Typography>
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
              {label: 'Text + Image (COMING SOON)', value: PollSettings.POLL_ITEM_FORMAT.TEXT_WITH_IMAGE},
              {label: 'Text + Images (COMING SOON)', value: PollSettings.POLL_ITEM_FORMAT.TEXT_WITH_IMAGES},
              {label: 'Text + Video (COMING SOON)', value: PollSettings.POLL_ITEM_FORMAT.TEXT_WITH_VIDEO},
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

export default withRouter(
  connect(s2p)(
    PollCreationForm
  )
)