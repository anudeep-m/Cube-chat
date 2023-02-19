import axios from 'axios'
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
  FRIEND_DETAILS_FAILED,
  FRIEND_DETAILS_REQUEST,
  FRIEND_DETAILS_SUCCESS,
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

export const getFriendDetails = (friendId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: FRIEND_DETAILS_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/users/${friendId}`, config)

    dispatch({
      type: FRIEND_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    dispatch({
      type: FRIEND_DETAILS_FAILED,
      payload: message,
    })
  }
}

export const listFriends = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: FRIENDS_LIST_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/friends`, config)

    dispatch({
      type: FRIENDS_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: FRIENDS_LIST_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listFriendRequests = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: FRIEND_REQUESTS_LIST_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/friends/requests`, config)

    dispatch({
      type: FRIEND_REQUESTS_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: FRIEND_REQUESTS_LIST_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listSentRequests = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: SENT_REQUESTS_LIST_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/friends/sentRequests`, config)

    dispatch({
      type: SENT_REQUESTS_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: SENT_REQUESTS_LIST_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listSuggestions = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: SUGGESTIONS_LIST_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/friends/suggestions`, config)

    dispatch({
      type: SUGGESTIONS_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: SUGGESTIONS_LIST_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const sendFriendRequest = (friendId) => async (dispatch, getState) => {
  const sendData = { requestedFriendId: friendId }
  try {
    dispatch({
      type: SEND_FRIEND_REQUEST_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/friends/sendFriendRequest`, sendData, config)

    dispatch({ type: SEND_FRIEND_REQUEST_SUCCESS })
  } catch (error) {
    dispatch({
      type: SEND_FRIEND_REQUEST_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const acceptFriendRequest = (friendId) => async (dispatch, getState) => {
  const sendData = { requestedFriendId: friendId }
  try {
    dispatch({
      type: ACCEPT_FRIEND_REQUEST_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/friends/acceptFriendRequest`, sendData, config)

    dispatch({ type: ACCEPT_FRIEND_REQUEST_SUCCESS })
  } catch (error) {
    dispatch({
      type: ACCEPT_FRIEND_REQUEST_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const deleteFriendRequest = (friendId) => async (dispatch, getState) => {
  const sendData = { requestedFriendId: friendId }
  try {
    dispatch({
      type: DELETE_FRIEND_REQUEST_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/friends/deleteFriendRequest`, sendData, config)

    dispatch({ type: DELETE_FRIEND_REQUEST_SUCCESS })
  } catch (error) {
    dispatch({
      type: DELETE_FRIEND_REQUEST_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const deleteSentRequest = (friendId) => async (dispatch, getState) => {
  const sendData = { requestedFriendId: friendId }
  try {
    dispatch({
      type: DELETE_SENT_REQUEST_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/friends/deleteSentRequest`, sendData, config)

    dispatch({ type: DELETE_SENT_REQUEST_SUCCESS })
  } catch (error) {
    dispatch({
      type: DELETE_SENT_REQUEST_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const unfriend =
  (friendId, conversationId) => async (dispatch, getState) => {
    const sendData = { requestedFriendId: friendId }
    try {
      dispatch({
        type: UNFRIEND_REQUEST,
      })

      const {
        userLogin: { userInfo },
      } = getState()

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      }

      await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/friends/unfriend`, sendData, config)
      if (conversationId) {
        await axios.delete(`${process.env.REACT_APP_SERVER_URL}/api/conversations/${conversationId}`, config)
        await axios.delete(`${process.env.REACT_APP_SERVER_URL}/api/messages/${conversationId}`)
      }

      dispatch({ type: UNFRIEND_SUCCESS })
    } catch (error) {
      dispatch({
        type: UNFRIEND_FAILED,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }
