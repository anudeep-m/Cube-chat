import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Col, Row } from 'react-bootstrap'
import ChatList from './screencomponents/chatlistscreen'
import ChatBox from './screencomponents/chatboxscreen'
import { io } from 'socket.io-client'
import { CLEAR_SENT_MESSAGE } from '../../redux/constants'
import { messageReceive } from '../../redux/actions/messageActions'

const HomeScreen = ({ history }) => {
  const [onlineUsers, setOnlineUsers] = useState([])

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const sendMessage = useSelector((state) => state.sendMessage)
  const { message, success } = sendMessage

  const dispatch = useDispatch()

  const socket = useRef()

  useEffect(() => {
    socket.current = io('ws://localhost:7000')
  }, [])

  useEffect(() => {
    socket.current.emit('addUser', userInfo._id)
    socket.current.on('getUsers', (users) => {
      setOnlineUsers(users)
    })
  }, [userInfo])

  useEffect(() => {
    if (success) {
      socket.current.emit('sendMessage', message)
      dispatch({ type: CLEAR_SENT_MESSAGE })
    }
  }, [message, success, dispatch])

  useEffect(() => {
    socket.current.on('getMessage', (data) => {
      const message = {
        senderId: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      }

      dispatch(messageReceive(message))
    })
  }, [dispatch])

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    }
  })

  return (
    <>
      <Row className='p-0 m-0'>
        <Col md='3' className='p-0 m-0'>
          <ChatList />
        </Col>
        <Col md='9' className='p-0 m-0'>
          <ChatBox onlineUsers={onlineUsers} />
        </Col>
      </Row>
    </>
  )
}

export default HomeScreen
