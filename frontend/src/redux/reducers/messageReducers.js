import {
  CLEAR_RECEIVED_MESSAGE,
  CLEAR_SENT_MESSAGE,
  MESSAGE_CREATE_FAILED,
  MESSAGE_CREATE_REQUEST,
  MESSAGE_CREATE_SUCCESS,
  MESSAGE_LIST_CLEAR_FAILED,
  MESSAGE_LIST_CLEAR_REQUEST,
  MESSAGE_LIST_CLEAR_SUCCESS,
  MESSAGE_LIST_FAILED,
  MESSAGE_LIST_REQUEST,
  MESSAGE_LIST_SUCCESS,
  RECEIVE_MESSAGE,
  SEND_MESSAGE,
} from '../constants'

export const messagesListReducer = (state = {}, action) => {
  switch (action.type) {
    case MESSAGE_LIST_REQUEST:
      return { ...state, loading: true }
    case MESSAGE_LIST_SUCCESS:
      return { loading: false, messages: action.payload }
    case MESSAGE_LIST_FAILED:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const messagesListClearReducer = (state = {}, action) => {
  switch (action.type) {
    case MESSAGE_LIST_CLEAR_REQUEST:
      return { ...state, loading: true }
    case MESSAGE_LIST_CLEAR_SUCCESS:
      return { loading: false, success: true }
    case MESSAGE_LIST_CLEAR_FAILED:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const messageCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case MESSAGE_CREATE_REQUEST:
      return { loading: true }
    case MESSAGE_CREATE_SUCCESS:
      return { loading: false, message: action.payload }
    case MESSAGE_CREATE_FAILED:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const sendMessageChangeReducer = (state = { message: null }, action) => {
  switch (action.type) {
    case SEND_MESSAGE:
      return { message: action.payload, success: true }
    case CLEAR_SENT_MESSAGE:
      return {}
    default:
      return state
  }
}

export const receiveMessageChangeReducer = (
  state = { message: null },
  action
) => {
  switch (action.type) {
    case RECEIVE_MESSAGE:
      return { message: action.payload, success: true }
    case CLEAR_RECEIVED_MESSAGE:
      return {}
    default:
      return state
  }
}
