import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom';

import LPForm from "../components/LPForm/LPForm";
import LPFormField from "../components/form-fields/LPFormField/LPFormField";
import PollSettings from "../../../services/util/poll/poll-definitions/poll-settings";
import {requestPublishLivepoll} from "../../../services/util/cloud/livepoll";
import LPDateInput from "../components/form-fields/LPDateInput/LPDateInput";
import LPCheckboxInput from "../components/form-fields/LPCheckboxInput/LPCheckboxInput";
import LPDropdownInput from "../components/form-fields/LPDropdownInput/LPDropdownInput";
import {actionMakeErrorToast} from "../../../services/state-management/actions/toast-actions";
import Typography from "@material-ui/core/Typography/Typography";

class Index extends React.Component {
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
        <div className={'pure-u-1-1 xlfont tac'}>
          CREATE YOUR POLL
        </div>

        {
          LPFormField.createRequiredField({
            className: 'pure-u-1-1 xlfont',
            name: 'title',
            type: 'text',
            label: 'Give a nice title',
            defaultValue: '',
          })
        }

        <LPDateInput
          className={'pure-u-1-1'}
          name={'startDatetime'}
          label={'When will it begin?'}
          defaultValue={new Date()}
        />

        <LPDateInput
          className={'pure-u-1-1'}
          name={'endDatetime'}
          label={'When will it end?'}
          defaultValue={''}
        />

        {
          LPDropdownInput.createDropdownField({
            className: 'pure-u-1-1',
            name: 'itemFormat',
            label: 'Poll format',
            dropdownOptions: [
              {label: 'Text', value: PollSettings.POLL_ITEM_FORMAT.TEXT},
              {label: 'Text + Image (COMING SOON)', value: PollSettings.POLL_ITEM_FORMAT.TEXT_WITH_IMAGE},
              {label: 'Text + Images (COMING SOON)', value: PollSettings.POLL_ITEM_FORMAT.TEXT_WITH_IMAGES},
              {label: 'Text + Video (COMING SOON)', value: PollSettings.POLL_ITEM_FORMAT.TEXT_WITH_VIDEO},
            ]
          })
        }

        <LPCheckboxInput
          className={'pure-u-1-1'}
          name={'isPrivate'}
          label={'Private (Coming Soon)'}
        />

        <LPCheckboxInput
          className={'pure-u-1-1'}
          name={'othersCanAdd'}
          label={'Allow others to add'}
        />

        <LPCheckboxInput
          className={'pure-u-1-1'}
          name={'showVoters'}
          label={'Show voter list'}
        />
      </LPForm>
    )
  }
}

const s2p = state => ({
  creatorId: state.auth.currentUser.uid
});

export default withRouter(
  connect(s2p)(
    Index
  )
)