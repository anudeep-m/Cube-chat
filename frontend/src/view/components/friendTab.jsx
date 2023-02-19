import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'
import { Image } from 'cloudinary-react'
import { LoaderThin } from './loader'
import { useDispatch } from 'react-redux'
import { unfriend } from '../../redux/actions/friendActions'
import {
  changeCurrentChat,
  createConversation,
} from '../../redux/actions/conversationActions'
import { Link } from 'react-router-dom'

const FriendTab = ({ friendId, currentUser }) => {
  const [friend, setFriend] = useState(null)
  const [conversationId, setConversationId] = useState(null)

  const getFriendDetails = async (friendId) => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/users/${friendId}`)
      setFriend(data)
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      console.log(message)
    }
  }

  const dispatch = useDispatch()

  useEffect(() => {
    getFriendDetails(friendId)
    currentUser.conversations?.map(
      (conversation) =>
        conversation.friendId === friendId &&
        setConversationId(conversation.conversationId)
    )
  }, [friendId, currentUser])

  const unfriendEventHandler = () => {
    dispatch(unfriend(friendId, conversationId && conversationId))
  }

  const goToConversationHandler = () => {
    dispatch(
      changeCurrentChat(
        {
          _id: conversationId,
          members: [currentUser._id, friendId],
        },
        currentUser
      )
    )
  }

  const startConversationHandler = () => {
    dispatch(createConversation(friendId))
  }

  return !friend ? (
    <LoaderThin />
  ) : (
    <>
      <td
        style={{
          color: 'teal',
        }}
      >
        {' '}
        <Image
          cloudName='chegu-builds'
          public_id={friend.profilePicture}
          height='48'
          width='45'
          crop='scale'
          radius='max'
          className='mx-2'
          style={{ borderRadius: '50%' }}
        />{' '}
        {friend.name}
      </td>
      <td>
        <OverlayTrigger
          key='top'
          placement='top'
          overlay={
            <Tooltip id={`tooltip-top`}>
              {conversationId ? 'Message' : 'Start Conversation'}
            </Tooltip>
          }
        >
          <Link to='/'>
            <i
              className='fas fa-comment-alt my-3'
              style={{ color: 'teal' }}
              type='button'
              onClick={
                conversationId
                  ? goToConversationHandler
                  : startConversationHandler
              }
            ></i>
          </Link>
        </OverlayTrigger>
      </td>
      <td>
        <OverlayTrigger
          key='top'
          placement='top'
          overlay={<Tooltip id={`tooltip-top`}>Unfriend</Tooltip>}
        >
          <i
            className='fas fa-user-slash my-3'
            style={{ color: 'red' }}
            type='button'
            onClick={unfriendEventHandler}
          ></i>
        </OverlayTrigger>
      </td>
    </>
  )
}

export default FriendTab
