import React from 'react'
import { Card } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { format } from 'timeago.js'

const Message = ({ own, message }) => {
  const currentChatChange = useSelector((state) => state.currentChatChange)
  const { convo } = currentChatChange

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  return (
    <>
      <div
        className={
          own
            ? 'd-flex flex-column justify-content-start align-items-end'
            : 'd-flex flex-column justify-content-start align-items-start'
        }
      >
        {convo.friend && (
          <>
            <Card
              className='mt-2 mx-0 rounded'
              bg={own ? 'primary' : 'light'}
              text={own ? 'white' : 'dark'}
              style={{ width: '20rem', height: 'fit-content' }}
            >
              <Link
                to='/'
                className='namelink mx-3 mt-2'
                style={own ? { color: '#f5fc8e' } : { color: '#fb5000' }}
              >
                {own ? userInfo.name : convo.friend.name}
              </Link>
              <Card.Body className='messagecardbody pt-1'>
                {message.text}
              </Card.Body>
            </Card>
            <div
              className='d-flex justify-content-end my-0 mx-3'
              style={{
                width: '20rem',
                fontSize: '0.8rem',
                fontFamily: 'serif',
              }}
            >
              <div className=' mx-3  my-0 p-0'>{format(message.createdAt)}</div>
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default Message
