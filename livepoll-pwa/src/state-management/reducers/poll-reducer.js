import { ACTION_CREATE_NEW_POLL_SUCCESS, ACTION_FETCH_POLL_DETAILS_SUCCESS, ACTION_CREATE_NEW_ITEM_SUCCESS, ACTION_FETCH_POLL_ITEMS_SUCCESS, ACTION_VOTE_FOR_ITEM_SUCCESS, ACTION_UNVOTE_ITEM_SUCCESS, ACTION_FETCH_VOTED_ITEM_ID_SUCCESS, ACTION_FETCH_VOTER_LIST_SUCCESS } from "../actions/poll-actions"

export default function pollReducer(state = {}, action) {
  const {type, ...data} = action

  if (type === ACTION_CREATE_NEW_POLL_SUCCESS) {
    const {newPoll} = data
    const {id} = newPoll
    return {
      ...state,
      [id]: {
        details: newPoll
      }
    }
  }

  else if (type === ACTION_FETCH_POLL_DETAILS_SUCCESS) {
    const {poll} = data
    const {id} = poll
    return {
      ...state,
      [id]: {
        ...state[id],
        details: {
          ...(state[id] || {}).details,
          ...poll
        }
      }
    }
  }

  else if (type === ACTION_CREATE_NEW_ITEM_SUCCESS) {
    const {newItem, pollId} = data
    return {
      ...state,
      [pollId]: {
        ...state[pollId],
        items: {
          ...state[pollId].items || {},
          [newItem.id]: {
            ...newItem,
            score: 0
          }
        }
      }
    }
  }

  else if (type === ACTION_FETCH_POLL_ITEMS_SUCCESS) {
    const {pollId, items} = data
    return {
      ...state,
      [pollId]: {
        ...state[pollId] || {},
        items: {
          ...(state[pollId] || {}).items || {},
          ...items.reduce(function(result, item) {
            result[item.id] = item
            return result
          }, {})
        }
      }
    }
  }

  else if (type === ACTION_VOTE_FOR_ITEM_SUCCESS) {
    const {updatedItems, pollId} = data
    return {
      ...state,
      [pollId]: {
        ...state[pollId],
        items: {
          ...state[pollId].items || {},

          ...updatedItems.reduce((result, item) => {
            const {id} = item
            result[id] = {
             ...state[pollId].items[id],
             ...item
            }
            return result
          }, {})
        }
      }
    }
  }

  else if (type === ACTION_UNVOTE_ITEM_SUCCESS) {
    const {updatedItem, pollId} = data
    return {
      ...state,
      [pollId]: {
        ...state[pollId],
        items: {
          ...state[pollId].items || {},
          [updatedItem.id]: {
            ...state[pollId].items[updatedItem.id],
            ...updatedItem
          }
        }
      }
    }
  }

  else if (type === ACTION_FETCH_VOTED_ITEM_ID_SUCCESS) {
    const {votedItemId, pollId} = data
    return {
      ...state,
      [pollId]: {
        ...state[pollId],
        details: {
          ...(state[pollId] || {}).details,
          votedItemId
        }
      }
    }
  }

  else if (type === ACTION_FETCH_VOTER_LIST_SUCCESS) {
    const {itemId, pollId, voterList} = data
    return {
      ...state,
      [pollId]: {
        ...state[pollId],
        items: {
          ...state[pollId].items || {},
          [itemId]: {
            ...state[pollId].items[itemId],
            voters: voterList
          }
        }
      }
    }
  }

  else return state
}
