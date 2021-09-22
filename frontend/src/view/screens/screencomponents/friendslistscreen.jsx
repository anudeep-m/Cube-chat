import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ProfileHead from '../../components/profilehead'
import { Loader } from '../../components/loader'
import Warning from '../../components/warning'
import { listFriends } from '../../../redux/actions/friendActions'
import FriendTab from '../../components/friendTab'
import { Table } from 'react-bootstrap'
import { getUserDetails } from '../../../redux/actions/userActions'

const FriendList = () => {
  const friendsList = useSelector((state) => state.friendsList)
  const { loading, error, friends } = friendsList

  const friendRequestAccept = useSelector((state) => state.friendRequestAccept)
  const { success: successAFR } = friendRequestAccept

  const unfriendFriend = useSelector((state) => state.unfriendFriend)
  const { success: successUnF } = unfriendFriend

  const userDetails = useSelector((state) => state.userDetails)
  const { user } = userDetails

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUserDetails('profile'))
  }, [dispatch])

  useEffect(() => {
    dispatch(listFriends())
  }, [dispatch, user, successAFR, successUnF])

  return (
    <>
      <ProfileHead friendsList={true} />
      <Table responsive className='m-0'>
        <tbody>
          <tr>
            <td
              style={{
                backgroundColor: 'rgba(175, 170, 170, 0.4)',
              }}
            >
              <h5 className='text-center my-auto'>Friends</h5>
            </td>
          </tr>
        </tbody>
      </Table>
      <div className='friendlist border'>
        {loading ? (
          <Loader />
        ) : error ? (
          <Warning>{error}</Warning>
        ) : (
          <Table hover className='m-0'>
            <tbody>
              {friends.map((friend) => (
                <tr key={friend}>
                  <FriendTab friendId={friend} currentUser={user} />
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </div>
    </>
  )
}

export default FriendList
