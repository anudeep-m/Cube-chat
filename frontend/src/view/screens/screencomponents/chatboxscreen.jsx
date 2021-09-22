import React, { useEffect, useRef, useState } from 'react'
import { Col, Row, Button, Form } from 'react-bootstrap'
import Message from '../../components/message'
import ChatBoxHeader from '../../components/chatboxheader'
import { useDispatch, useSelector } from 'react-redux'
import { messageSend } from '../../../redux/actions/messageActions'
import axios from 'axios'
import { CLEAR_RECEIVED_MESSAGE } from '../../../redux/constants'
import { changeCurrentChat } from '../../../redux/actions/conversationActions'

const ChatBox = ({ onlineUsers }) => {
  const [currentChat, setCurrentChat] = useState(null)
  const [newMessage, setNewMessage] = useState('')
  const [messageQueue, setMessageQueue] = useState([])

  const conversationCreate = useSelector((state) => state.conversationCreate)
  const { success, conversation } = conversationCreate

  const messagesListClear = useSelector((state) => state.messagesListClear)
  const { success: successClear } = messagesListClear

  const scrollRef = useRef()

  const currentChatChange = useSelector((state) => state.currentChatChange)
  const { convo } = currentChatChange

  const receiveMessage = useSelector((state) => state.receiveMessage)
  const { message: messageReceived } = receiveMessage

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const dispatch = useDispatch()

  const listMessages = async (convo) => {
    try {
      const { data } = await axios.get(
        `/api/messages/${convo?.conversation._id}`
      )
      setMessageQueue(data)
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      console.log(message)
    }
  }

  useEffect(() => {
    listMessages(convo)
  }, [convo, successClear])

  useEffect(() => {
    if (convo) {
      setCurrentChat(convo.conversation)
    }
  }, [dispatch, convo])

  useEffect(() => {
    if (success) {
      dispatch(changeCurrentChat(conversation, userInfo))
    }
  }, [success, conversation, dispatch, userInfo])

  useEffect(() => {
    if (
      messageReceived &&
      currentChat?.members.includes(messageReceived.senderId)
    ) {
      setMessageQueue((prev) => [...prev, messageReceived])
      dispatch({ type: CLEAR_RECEIVED_MESSAGE })
    }
  }, [dispatch, messageReceived, currentChat])

  const sendMessageHandler = async (e) => {
    e.preventDefault()
    const message = {
      conversationId: convo.conversation._id,
      senderId: userInfo._id,
      text: newMessage,
    }

    const receiverId = currentChat.members.find(
      (member) => member !== userInfo._id
    )

    dispatch(
      messageSend({
        senderId: userInfo._id,
        receiverId: receiverId,
        text: newMessage,
      })
    )

    try {
      const { data } = await axios.post(`/api/messages`, message)

      setMessageQueue([...messageQueue, data])
      setNewMessage('')
    } catch (error) {
      console.log(error)
    }
  }

  const keyPressHandler = (event) => {
    if (event.code === 'Enter') {
      sendMessageHandler(event)
    }
  }

  useEffect(() => {
    scrollRef.current?.scrollIntoView({
      block: 'end',
      inline: 'nearest',
    })
  }, [messageQueue])

  return (
    <Col className='d-flex flex-column'>
      <div className='chatbox'>
        {convo ? (
          <>
            <Row className='chatboxNav px-0 mx-0'>
              <ChatBoxHeader
                setMessageQueue={setMessageQueue}
                onlineUsers={onlineUsers}
              />
            </Row>
            <Row className='chatboxTop'>
              {currentChat &&
                messageQueue?.map((message, idx) => (
                  <div ref={scrollRef} key={idx}>
                    <Message
                      own={message.senderId === userInfo._id ? true : false}
                      message={message}
                    />
                  </div>
                ))}
            </Row>

            <Row
              className='m-0 p-0 chatboxBottom'
              style={{ backgroundColor: 'rgba(175, 170, 170, 0.4)' }}
            >
              <Form controlid='chatMessageInput'>
                <Row>
                  <Col md='10' className=' px-4 py-3 mx-4'>
                    <Form.Control
                      as='textarea'
                      style={{
                        resize: 'none',
                        outline: 'none',
                      }}
                      className='textmessaearea py-2 px-4'
                      placeholder='Type a message'
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={keyPressHandler}
                    />
                  </Col>
                  <Col
                    md='1'
                    className='p-0 m-0 mx-2 d-flex align-items-center'
                  >
                    <Button
                      type='submit'
                      className='send m-0 rounded'
                      style={{ backgroundColor: 'teal', border: 'none' }}
                      onClick={sendMessageHandler}
                    >
                      Send
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Row>
          </>
        ) : (
          <div
            className='d-flex align-items-center justify-content-center'
            style={{ height: '100%' }}
          >
            <h2>Cube Chat</h2>
          </div>
        )}
      </div>
    </Col>
  )
}

export default ChatBox
