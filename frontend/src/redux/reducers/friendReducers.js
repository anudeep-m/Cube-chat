import {
  ACCEPT_FRIEND_REQUEST_FAILED,
  ACCEPT_FRIEND_REQUEST_REQUEST,
  ACCEPT_FRIEND_REQUEST_SUCCESS,
  DELETE_FRIEND_REQUEST_FAILED,
  DELETE_FRIEND_REQUEST_REQUEST,
  DELETE_FRIEND_REQUEST_SUCCESS,
  DELETE_SENT_REQUEST_FAILED,
  DELETE_SENT_REQUEST_REQUEST,
  DELETE_SENT_REQUEST_SUCCESS,
  FRIENDS_LIST_FAILED,
  FRIENDS_LIST_REQUEST,
  FRIENDS_LIST_SUCCESS,
  FRIEND_REQUESTS_LIST_FAILED,
  FRIEND_REQUESTS_LIST_REQUEST,
  FRIEND_REQUESTS_LIST_SUCCESS,
  SEND_FRIEND_REQUEST_FAILED,
  SEND_FRIEND_REQUEST_REQUEST,
  SEND_FRIEND_REQUEST_SUCCESS,
  SENT_REQUESTS_LIST_FAILED,
  SENT_REQUESTS_LIST_REQUEST,
  SENT_REQUESTS_LIST_SUCCESS,
  SUGGESTIONS_LIST_FAILED,
  SUGGESTIONS_LIST_REQUEST,
  SUGGESTIONS_LIST_SUCCESS,
  UNFRIEND_FAILED,
  UNFRIEND_REQUEST,
  UNFRIEND_SUCCESS,
} from '../constants'

export const friendsListReducer = (state = { friends: [] }, action) => {
  switch (action.type) {
    case FRIENDS_LIST_REQUEST:
      return { loading: true }
    case FRIENDS_LIST_SUCCESS:
      return { loading: false, friends: action.payload }
    case FRIENDS_LIST_FAILED:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const friendRequestsListReducer = (
  state = { friendRequests: [] },
  action
) => {
  switch (action.type) {
    case FRIEND_REQUESTS_LIST_REQUEST:
      return { loading: true }
    case FRIEND_REQUESTS_LIST_SUCCESS:
      return { loading: false, friendRequests: action.payload }
    case FRIEND_REQUESTS_LIST_FAILED:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const sentRequestsListReducer = (
  state = { sentRequests: [] },
  action
) => {
  switch (action.type) {
    case SENT_REQUESTS_LIST_REQUEST:
      return { loading: true }
    case SENT_REQUESTS_LIST_SUCCESS:
      return { loading: false, sentRequests: action.payload }
    case SENT_REQUESTS_LIST_FAILED:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const suggestionsListReducer = (state = { suggestions: [] }, action) => {
  switch (action.type) {
    case SUGGESTIONS_LIST_REQUEST:
      return { loading: true }
    case SUGGESTIONS_LIST_SUCCESS:
      return { loading: false, suggestions: action.payload }
    case SUGGESTIONS_LIST_FAILED:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const sendFriendRequestReducer = (state = {}, action) => {
  switch (action.type) {
    case SEND_FRIEND_REQUEST_REQUEST:
      return { loading: true }
    case SEND_FRIEND_REQUEST_SUCCESS:
      return { loading: false, success: true }
    case SEND_FRIEND_REQUEST_FAILED:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const acceptFriendRequestReducer = (state = {}, action) => {
  switch (action.type) {
    case ACCEPT_FRIEND_REQUEST_REQUEST:
      return { loading: true }
    case ACCEPT_FRIEND_REQUEST_SUCCESS:
      return { loading: false, success: true }
    case ACCEPT_FRIEND_REQUEST_FAILED:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const deleteFriendRequestReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_FRIEND_REQUEST_REQUEST:
      return { loading: true }
    case DELETE_FRIEND_REQUEST_SUCCESS:
      return { loading: false, success: true }
    case DELETE_FRIEND_REQUEST_FAILED:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const deleteSentRequestReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_SENT_REQUEST_REQUEST:
      return { loading: true }
    case DELETE_SENT_REQUEST_SUCCESS:
      return { loading: false, success: true }
    case DELETE_SENT_REQUEST_FAILED:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const unfriendReducer = (state = {}, action) => {
  switch (action.type) {
    case UNFRIEND_REQUEST:
      return { loading: true }
    case UNFRIEND_SUCCESS:
      return { loading: false, success: true }
    case UNFRIEND_FAILED:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
