import React from 'react'
import {connect} from 'react-redux'

import LPForm from "../LPForm/LPForm";
import LPFormField from "../form-fields/LPFormField/LPFormField";
import PollSettings from "../../../util/poll/poll-definitions/poll-settings";
import {VOTE_TYPES} from "../../../util/poll/vote-definitions/vote-types";

const PollCreationForm = props => {
  const onSubmit = (data) => {
    data.creatorId = props.creatorId;
  };
  return (
    <LPForm title={'Create a poll'} totalFields={3} onSubmit={onSubmit}>
      <LPFormField
        name={'title'}
        type={'text'}
        placeholder={'Give a nice title'}
        validate={LPFormField.validators.checkNotNull}
        errorMsg={LPFormField.errorMsgs.shouldNotNull}/>
      <br/>
      <LPFormField
        name={'startDatetime'}
        type={'datetime-local'}
        title={'When will it begin?'}
        validate={LPFormField.validators.checkNotNull}
        errorMsg={LPFormField.errorMsgs.shouldNotNull}/>
      <br/>
      <LPFormField
        name={'endDatetime'}
        type={'datetime-local'}
        title={'When will it end?'}/>
      <br/>
      <LPFormField
        name={'privacy'}
        title={'Privacy'}
        type={'dropdown'}
        dropdownOptions={[
          {label: 'Public', value: PollSettings.POLL_PRIVACY.PUBLIC},
          {label: 'Link only', value: PollSettings.POLL_PRIVACY.PRIVATE},
        ]}
      />
      <br/>
      <LPFormField
        name={'voteType'}
        type={'dropdown'}
        dropdownOptions={[
          {label: 'Vote by tick', value: VOTE_TYPES.TICK_VOTE},
          {label: 'Vote by 0-10', value: VOTE_TYPES.NUMBER_VOTE_0_10},
          {label: 'Vote by 0-100', value: VOTE_TYPES.NUMBER_VOTE_0_100},
        ]}
      />
      <br/>
      <LPFormField
        name={'format'}
        title={'Poll structure'}
        type={'dropdown'}
        dropdownOptions={[
          {label: 'Text', value: PollSettings.POLL_ITEM_FORMAT.TEXT},
          {label: 'Text + Image', value: PollSettings.POLL_ITEM_FORMAT.TEXT_WITH_IMAGE},
          {label: 'Text + Images', value: PollSettings.POLL_ITEM_FORMAT.TEXT_WITH_IMAGES},
          {label: 'Text + Video', value: PollSettings.POLL_ITEM_FORMAT.TEXT_WITH_VIDEO},
        ]}
      />
    </LPForm>
  )
};

const s2p = state => ({
  creatorId: state.auth.userData.id
});
export default connect(s2p)(PollCreationForm)