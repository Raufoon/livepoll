import React from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { actionVoteForItem } from '../../../../state-management/actions/poll-actions'

function ItemsPanel(props) {
  console.log('Rendering ItemsPanel')
  const dispath = useDispatch()

  const {pollId, items} = props
  
  function giveVote(itemId, voteValue) {
    dispath(actionVoteForItem(pollId, itemId, voteValue))
  }

  return (
    <div>
      <h3>items:</h3>

      {
        items.map(item => <div key={item.id}>
          <h3>{JSON.stringify(item)}</h3>
          <button onClick={() => giveVote(item.id, 1)}>vote</button>
        </div>)
      }
    </div>
  )
}

ItemsPanel.propTypes = {
  items: PropTypes.array.isRequired
}

export default ItemsPanel
