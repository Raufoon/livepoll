import React from 'react'
import {connect} from 'react-redux'

import LPForm from "../LPForm/LPForm";
import LPFormField from "../form-fields/LPFormField/LPFormField";
import PollSettings from "../../../util/poll/poll-definitions/poll-settings";
import Livepoll from "../../../util/poll/livepoll";

class PollCreationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      livepoll: undefined
    };
    this.createPoll = this.createPoll.bind(this);
    this.publishPoll = this.publishPoll.bind(this);
  }

  createPoll(data) {
    this.setState({
      livepoll: new Livepoll({
        ...data,
        creatorId: this.props.creatorId,
      })
    });
  }

  publishPoll() {

  }

  render() {
    return (
      <div>
        <div className='fl'>
          <LPForm title={'Create a poll'} onSubmit={this.createPoll}>
            {
              LPFormField.createRequiredField({
                name: 'title',
                type: 'text',
                placeholder: 'Give a nice title',
              })
            }
            <br/>
            {
              LPFormField.createRequiredField({
                name: 'startDatetime',
                type: 'datetime-local',
                title: 'When will it begin?',
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
                name: 'format',
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
              LPFormField.createDropdownField({
                name: 'whoCanAddItem',
                title: 'Who can add item?',
                dropdownOptions: [
                  {label: 'Only owner', value: PollSettings.WHO_CAN_ADD_ITEM.ONLY_CREATOR},
                  {label: 'Anyone', value: PollSettings.WHO_CAN_ADD_ITEM.ANYONE},
                ]
              })
            }
          </LPForm>
        </div>
        <div className='fr'>

        </div>
      </div>
    )
  }
}

const s2p = state => ({
  creatorId: state.auth.userData.id
});
export default connect(s2p)(PollCreationForm)