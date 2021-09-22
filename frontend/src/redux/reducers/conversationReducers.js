import {
  CLEAR_CURRENT_CHAT,
  CONVERSATION_CREATE_FAILED,
  CONVERSATION_CREATE_REQUEST,
  CONVERSATION_CREATE_RESET,
  CONVERSATION_CREATE_SUCCESS,
  CONVERSATION_DELETE_FAILED,
  CONVERSATION_DELETE_REQUEST,
  CONVERSATION_DELETE_SUCCESS,
  CONVERSATION_LIST_FAILED,
  CONVERSATION_LIST_REQUEST,
  CONVERSATION_LIST_SUCCESS,
  CURRENT_CHAT,
} from '../constants'

export const conversationsListReducer = (
  state = { conversations: [] },
  action
) => {
  switch (action.type) {
    case CONVERSATION_LIST_REQUEST:
      return { loading: true }
    case CONVERSATION_LIST_SUCCESS:
      return { loading: false, conversations: action.payload }
    case CONVERSATION_LIST_FAILED:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const conversationCreateReducer = (
  state = { conversation: {} },
  action
) => {
  switch (action.type) {
    case CONVERSATION_CREATE_REQUEST:
      return { loading: true }
    case CONVERSATION_CREATE_SUCCESS:
      return { loading: false, success: true, conversation: action.payload }
    case CONVERSATION_CREATE_FAILED:
      return { loading: false, error: action.payload }
    case CONVERSATION_CREATE_RESET:
      return {}
    default:
      return state
  }
}

export const conversationDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case CONVERSATION_DELETE_REQUEST:
      return { loading: true }
    case CONVERSATION_DELETE_SUCCESS:
      return { loading: false, success: true }
    case CONVERSATION_DELETE_FAILED:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const currentChatChangeReducer = (state = { convo: null }, action) => {
  switch (action.type) {
    case CURRENT_CHAT:
      return { convo: action.payload }
    case CLEAR_CURRENT_CHAT:
      return { convo: null }
    default:
      return state
  }
}
