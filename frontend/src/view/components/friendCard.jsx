import axios from 'axios'
import { Image } from 'cloudinary-react'
import React, { useEffect, useState } from 'react'
import { Card, Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import {
  acceptFriendRequest,
  deleteFriendRequest,
  deleteSentRequest,
  sendFriendRequest,
} from '../../redux/actions/friendActions'
import { LoaderThin } from './loader'

const FriendCard = ({
  friendId,
  fRequest = false,
  suggestion = false,
  sRequest = false,
}) => {
  const [friend, setFriend] = useState(null)

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

  useEffect(() => {
    getFriendDetails(friendId)
  }, [friendId])

  const dispatch = useDispatch()

  const acceptFR = () => {
    dispatch(acceptFriendRequest(friendId))
  }
  const deleteFR = () => {
    dispatch(deleteFriendRequest(friendId))
  }
  const sendFR = () => {
    dispatch(sendFriendRequest(friendId))
  }
  const deleteSR = () => {
    dispatch(deleteSentRequest(friendId))
  }

  return !friend ? (
    <LoaderThin />
  ) : (
    <Card
      className='d-flex align-items-center my-3 p-3 rounded border friend-card'
      style={{ backgroundColor: '#0f509b3d' }}
    >
      <Image
        cloudName='chegu-builds'
        public_id={friend.profilePicture}
        height='160'
        width='150'
        crop='scale'
        style={{ borderRadius: '30%' }}
      />
      {fRequest && (
        <Card.Body>
          <h5>{friend.name}</h5>
          <Button
            className='btn-sm btn-success rounded mx-1'
            onClick={acceptFR}
          >
            Accept
          </Button>
          <Button className='btn-sm btn-danger rounded mx-1' onClick={deleteFR}>
            Delete
          </Button>
        </Card.Body>
      )}
      {suggestion && (
        <Card.Body>
          <h5>{friend.name}</h5>
          <Button className='btn-sm btn-success rounded mx-2' onClick={sendFR}>
            Send Friend Request
          </Button>
        </Card.Body>
      )}
      {sRequest && (
        <Card.Body>
          <h5>{friend.name}</h5>
          <Button className='btn-sm btn-danger rounded mx-2' onClick={deleteSR}>
            Delete Request
          </Button>
        </Card.Body>
      )}
    </Card>
  )
}

export default FriendCard
