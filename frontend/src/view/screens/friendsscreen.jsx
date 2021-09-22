import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Col, Row } from 'react-bootstrap'
import FriendList from './screencomponents/friendslistscreen'
import SuggestionsBox from './screencomponents/suggestionsboxscreen'

const FriendsScreen = ({ history }) => {
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    }
  })

  return (
    <>
      <Row className='p-0 m-0'>
        <Col md='3' className='p-0 m-0'>
          <FriendList />
        </Col>
        <Col className='p-0 m-0'>
          <SuggestionsBox />
        </Col>
      </Row>
    </>
  )
}

export default FriendsScreen
