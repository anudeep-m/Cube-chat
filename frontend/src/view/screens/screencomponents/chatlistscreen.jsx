import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Conversation from '../../components/conversation'
import ProfileHead from '../../components/profilehead'
import { Loader } from '../../components/loader'
import Warning from '../../components/warning'
import {
  changeCurrentChat,
  listConversations,
} from '../../../redux/actions/conversationActions'
import {
  CLEAR_CURRENT_CHAT,
  CONVERSATION_CREATE_RESET,
} from '../../../redux/constants'

const ChatList = () => {
  const conversationsList = useSelector((state) => state.conversationsList)
  const { loading, error, conversations } = conversationsList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const currentChatChange = useSelector((state) => state.currentChatChange)
  const { convo } = currentChatChange

  const conversationCreate = useSelector((state) => state.conversationCreate)
  const { success } = conversationCreate

  const conversationDelete = useSelector((state) => state.conversationDelete)
  const { success: successDelete } = conversationDelete

  const unfriendFriend = useSelector((state) => state.unfriendFriend)
  const { success: successUnF } = unfriendFriend

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(listConversations())
    if (success) {
      dispatch({ type: CONVERSATION_CREATE_RESET })
    }
    if (successDelete || successUnF) {
      dispatch({ type: CLEAR_CURRENT_CHAT })
    }
  }, [dispatch, userInfo, success, successDelete, successUnF])

  const chatChange = (conversation) => {
    if (convo) {
      if (convo.conversation._id !== conversation._id) {
        dispatch(changeCurrentChat(conversation, userInfo))
      }
    } else {
      dispatch(changeCurrentChat(conversation, userInfo))
    }
  }

  return (
    <>
      <ProfileHead />
      <div className='chatlist border border-top-0'>
        {loading ? (
          <Loader />
        ) : error ? (
          <Warning>{error}</Warning>
        ) : (
          conversations.map((conversation) => (
            <div
              type='button'
              key={conversation._id}
              onClick={(e) => chatChange(conversation)}
            >
              <Conversation
                conversation={conversation}
                currentUser={userInfo}
              />
            </div>
          ))
        )}
      </div>
    </>
  )
}

export default ChatList
