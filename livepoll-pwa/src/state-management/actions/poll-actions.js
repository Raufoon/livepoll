import { createNewPoll, createNewItem, voteForItem, unvoteItem } from "../../services/write-requests"
import { fetchPollDetails, fetchPollItems, fetchVotedItemId } from "../../services/read-requests"

export function actionCreateNewPoll(pollData) {
  return async function(dispatch) {
    try {
      const {data, errors} = await createNewPoll(pollData)

      if (data) dispatch(actionCreateNewPollSuccess(data))
      else if (errors) dispatch(actionCreateNewPollFailure(errors))
    }
    catch(err) {
      dispatch(actionCreateNewPollFailure(err))
    }
  }
}

export const ACTION_CREATE_NEW_POLL_SUCCESS = 'ACTION_CREATE_NEW_POLL_SUCCESS'

function actionCreateNewPollSuccess(pollData) {
  return {
    type: ACTION_CREATE_NEW_POLL_SUCCESS,
    ...pollData
  }
}

export const ACTION_CREATE_NEW_POLL_FAILURE = 'ACTION_CREATE_NEW_POLL_FAILURE'

function actionCreateNewPollFailure(error) {
  return {
    type: ACTION_CREATE_NEW_POLL_FAILURE,
    error
  }
}

export function actionFetchPollDetails(id) {
  return async function(dispatch) {
    try {
      const {data, errors} = await fetchPollDetails(id)
      if (data) dispatch(actionFetchPollDetailsSuccess(data))
      else if (errors) dispatch(actionFetchPollDetailsFailure(errors))
    }
    catch(err) {
      dispatch(actionFetchPollDetailsFailure(err))
    }
  }
}

export const ACTION_FETCH_POLL_DETAILS_SUCCESS = 'ACTION_FETCH_POLL_DETAILS_SUCCESS'

function actionFetchPollDetailsSuccess({poll}) {
  return {
    type: ACTION_FETCH_POLL_DETAILS_SUCCESS,
    poll
  }
}

export const ACTION_FETCH_POLL_DETAILS_FAILURE = 'ACTION_FETCH_POLL_DETAILS_FAILURE'

function actionFetchPollDetailsFailure(error) {
  return {
    type: ACTION_FETCH_POLL_DETAILS_FAILURE,
    error
  }
}

export function actionCreateNewItem(pollId, newItem) {
  return async function(dispatch) {
    try {
      const {data, errors} = await createNewItem(pollId, newItem)
      if (data) dispatch(actionCreateNewItemSuccess(pollId, data))
      else if (errors) dispatch(actionCreateNewItemFailure(errors))
    }
    catch(err) {
      dispatch(actionCreateNewItemFailure(err))
    }
  }
}

export const ACTION_CREATE_NEW_ITEM_SUCCESS = 'ACTION_CREATE_NEW_ITEM_SUCCESS'

function actionCreateNewItemSuccess(pollId, {newItem}) {
  return {
    type: ACTION_CREATE_NEW_ITEM_SUCCESS,
    newItem,
    pollId
  }
}

export const ACTION_CREATE_NEW_ITEM_FAILURE = 'ACTION_CREATE_NEW_ITEM_FAILURE'

function actionCreateNewItemFailure(error) {
  return {
    type: ACTION_CREATE_NEW_ITEM_FAILURE,
    error
  }
}

export function actionFetchPollItems(pollId) {
  return async function(dispatch) {
    try {
      const {data, errors} = await fetchPollItems(pollId)
      if (data) dispatch(actionFetchPollItemsSuccess(data))
      else if (errors) dispatch(actionFetchPollItemsFailure(errors))
    }
    catch(err) {
      dispatch(actionFetchPollItemsFailure(err))
    }
  }
}

export const ACTION_FETCH_POLL_ITEMS_SUCCESS = 'ACTION_FETCH_POLL_ITEMS_SUCCESS'

function actionFetchPollItemsSuccess({poll}) {
  const {id, items} = poll
  return {
    type: ACTION_FETCH_POLL_ITEMS_SUCCESS,
    pollId: id,
    items: items || []
  }
}

export const ACTION_FETCH_POLL_ITEMS_FAILURE = 'ACTION_FETCH_POLL_ITEMS_FAILURE'

function actionFetchPollItemsFailure(error) {
  return {
    type: ACTION_FETCH_POLL_ITEMS_FAILURE,
    error
  }
}

export function actionVoteForItem(pollId, itemId, voteValue=1) {
  return async function (dispatch) {
    try {
      const {data, errors} = await voteForItem(pollId, itemId, voteValue)
      if (data) {
        dispatch(actionVoteForItemSuccess(pollId, data))
        dispatch(actionFetchVotedItemIdSuccess(pollId, {votedItemId: itemId}))
      }
      else if (errors) dispatch(actionVoteForItemFailure(errors))
    }
    catch(err) {
      dispatch(actionVoteForItemFailure(err))
    }
  }
}

export const ACTION_VOTE_FOR_ITEM_SUCCESS = 'ACTION_VOTE_FOR_ITEM_SUCCESS'

function actionVoteForItemSuccess(pollId, {updatedItems}) {
  return {
    type: ACTION_VOTE_FOR_ITEM_SUCCESS,
    pollId,
    updatedItems
  }
}

export const ACTION_VOTE_FOR_ITEM_FAILURE = 'ACTION_VOTE_FOR_ITEM_FAILURE'

function actionVoteForItemFailure(error) {
  return {
    type: ACTION_VOTE_FOR_ITEM_FAILURE,
    error
  }
}

export function actionUnvoteForItem(pollId, itemId, voteValue=1) {
  return async function (dispatch) {
    try {
      const {data, errors} = await unvoteItem(pollId, itemId, voteValue)
      if (data) {
        dispatch(actionUnvoteItemSuccess(pollId, data))
        dispatch(actionFetchVotedItemIdSuccess(pollId, {}))
      }
      else if (errors) dispatch(actionUnvoteItemFailure(errors))
    }
    catch(err) {
      dispatch(actionUnvoteItemFailure(err))
    }
  }
}

export const ACTION_UNVOTE_ITEM_SUCCESS = 'ACTION_UNVOTE_ITEM_SUCCESS'

function actionUnvoteItemSuccess(pollId, {updatedItem}) {
  return {
    type: ACTION_UNVOTE_ITEM_SUCCESS,
    pollId,
    updatedItem
  }
}

export const ACTION_UNVOTE_ITEM_FAILURE = 'ACTION_UNVOTE_ITEM_FAILURE'

function actionUnvoteItemFailure(error) {
  return {
    type: ACTION_UNVOTE_ITEM_FAILURE,
    error
  }
}

export function actionFetchVotedItemId(pollId) {
  return async function (dispatch) {
    try {
      const {data, errors} = await fetchVotedItemId(pollId)
      if (data) dispatch(actionFetchVotedItemIdSuccess(pollId, data))
      else if (errors) dispatch(actionFetchVotedItemIdFailure(errors))
    }
    catch(err) {
      dispatch(actionFetchVotedItemIdFailure(err))
    }
  }
}

export const ACTION_FETCH_VOTED_ITEM_ID_SUCCESS = 'ACTION_FETCH_VOTED_ITEM_ID_SUCCESS'

function actionFetchVotedItemIdSuccess(pollId, {votedItemId}) {
  return {
    type: ACTION_FETCH_VOTED_ITEM_ID_SUCCESS,
    pollId,
    votedItemId
  }
}


export const ACTION_FETCH_VOTED_ITEM_ID_FAILURE = 'ACTION_FETCH_VOTED_ITEM_ID_FAILURE'

function actionFetchVotedItemIdFailure(error) {
  return {
    type: ACTION_FETCH_VOTED_ITEM_ID_FAILURE,
    error
  }
}
