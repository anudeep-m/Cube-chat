import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import { Image } from 'cloudinary-react'
import { LoaderThin } from './loader'

const Conversation = ({ conversation, currentUser }) => {
  const [friend, setFriend] = useState(null)

  const getFriendDetails = async (friendId) => {
    try {
      const { data } = await axios.get(`/api/users/${friendId}`)
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
    const friendId = conversation.members.find(
      (member) => member !== currentUser._id
    )

    getFriendDetails(friendId)
  }, [conversation, currentUser])

  return !friend ? (
    <LoaderThin />
  ) : (
    <Table hover responsive className='m-0'>
      <tbody>
        <tr>
          <td>
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
        </tr>
      </tbody>
    </Table>
  )
}

export default Conversation
