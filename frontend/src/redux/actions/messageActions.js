import axios from 'axios'
import {
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

export const listMessages = (convoId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: MESSAGE_LIST_REQUEST,
    })

    const { data } = await axios.get(`/api/messages/${convoId}`)

    dispatch({
      type: MESSAGE_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: MESSAGE_LIST_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const clearMessages = (convoId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: MESSAGE_LIST_CLEAR_REQUEST,
    })

    await axios.delete(`/api/messages/${convoId}`)

    dispatch({ type: MESSAGE_LIST_CLEAR_SUCCESS })
  } catch (error) {
    dispatch({
      type: MESSAGE_LIST_CLEAR_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const createMessage = (message) => async (dispatch, getState) => {
  try {
    dispatch({
      type: MESSAGE_CREATE_REQUEST,
    })

    const { data } = await axios.post(`/api/messages`, message)

    dispatch({
      type: MESSAGE_CREATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: MESSAGE_CREATE_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const messageSend = (message) => async (dispatch) => {
  try {
    dispatch({
      type: SEND_MESSAGE,
      payload: message,
    })
  } catch (error) {
    console.log(error)
  }
}

export const messageReceive = (message) => async (dispatch) => {
  try {
    dispatch({
      type: RECEIVE_MESSAGE,
      payload: message,
    })
  } catch (error) {
    console.log(error)
  }
}
