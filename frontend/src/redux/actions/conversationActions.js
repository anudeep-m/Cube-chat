import axios from 'axios'
import {
  CONVERSATION_CREATE_FAILED,
  CONVERSATION_CREATE_REQUEST,
  CONVERSATION_CREATE_SUCCESS,
  CONVERSATION_DELETE_FAILED,
  CONVERSATION_DELETE_REQUEST,
  CONVERSATION_DELETE_SUCCESS,
  CONVERSATION_LIST_FAILED,
  CONVERSATION_LIST_REQUEST,
  CONVERSATION_LIST_SUCCESS,
  CURRENT_CHAT,
} from '../constants'

export const changeCurrentChat =
  (conversation, userInfo) => async (dispatch) => {
    try {
      const friendId = conversation.members.find(
        (member) => member !== userInfo._id
      )
      const { data } = await axios.get(`/api/users/${friendId}`)

      const friend = data

      const data1 = { conversation, friend }

      dispatch({
        type: CURRENT_CHAT,
        payload: data1,
      })
    } catch (error) {
      console.log(error)
    }
  }

export const listConversations = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: CONVERSATION_LIST_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const userId = userInfo._id

    const { data } = await axios.get(`/api/conversations/${userId}`, config)

    dispatch({
      type: CONVERSATION_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: CONVERSATION_LIST_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const createConversation =
  (receiverId) => async (dispatch, getState) => {
    const sendData = { receiverId }
    try {
      dispatch({
        type: CONVERSATION_CREATE_REQUEST,
      })

      const {
        userLogin: { userInfo },
      } = getState()

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }

      const { data } = await axios.post(`/api/conversations`, sendData, config)

      dispatch({ type: CONVERSATION_CREATE_SUCCESS, payload: data })
    } catch (error) {
      dispatch({
        type: CONVERSATION_CREATE_FAILED,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

export const deleteConversation =
  (conversationId) => async (dispatch, getState) => {
    try {
      dispatch({
        type: CONVERSATION_DELETE_REQUEST,
      })

      const {
        userLogin: { userInfo },
      } = getState()

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }

      await axios.delete(`/api/conversations/${conversationId}`, config)
      await axios.delete(`/api/messages/${conversationId}`)

      dispatch({ type: CONVERSATION_DELETE_SUCCESS })
    } catch (error) {
      dispatch({
        type: CONVERSATION_DELETE_FAILED,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }
