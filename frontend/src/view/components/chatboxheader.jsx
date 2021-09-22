import { Image } from 'cloudinary-react'
import React from 'react'
import { Table, OverlayTrigger, Dropdown, Tooltip } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { deleteConversation } from '../../redux/actions/conversationActions'
import { clearMessages } from '../../redux/actions/messageActions'

const ChatBoxHeader = ({ setMessageQueue, onlineUsers }) => {
  const currentChatChange = useSelector((state) => state.currentChatChange)
  const { convo } = currentChatChange

  const dispatch = useDispatch()

  const clearChatHandler = () => {
    setMessageQueue([])
    dispatch(clearMessages(convo.conversation._id))
  }

  const deleteConversationHandler = () => {
    dispatch(deleteConversation(convo.conversation._id))
  }

  return (
    convo && (
      <Table className='m-0 p-0'>
        <tbody>
          <tr>
            <td className='d-flex flex-row'>
              {' '}
              <Image
                cloudName='chegu-builds'
                public_id={convo.friend.profilePicture}
                height='48'
                width='45'
                crop='scale'
                radius='max'
                className='mx-4'
              />{' '}
              <div className='d-flex flex-column my-1'>
                <h5 className='m-0 p-0' style={{ fontSize: '1.2rem' }}>
                  {convo.friend.name}
                </h5>
                <p className='m-0 p-0' style={{ fontSize: '0.7rem' }}>
                  {onlineUsers.includes(convo.friend._id) ? (
                    <>
                      Online{' '}
                      <i
                        className='fas fa-circle'
                        style={{ fontSize: '0.5rem', color: 'green' }}
                      ></i>
                    </>
                  ) : (
                    <>
                      Offline{' '}
                      <i
                        className='fas fa-circle'
                        style={{ fontSize: '0.5rem', color: 'red' }}
                      ></i>
                    </>
                  )}
                </p>
              </div>
            </td>

            <td>
              <OverlayTrigger
                key='left'
                placement='left'
                overlay={<Tooltip id={`tooltip-left`}>Options</Tooltip>}
              >
                <Dropdown style={{ position: 'absolute' }}>
                  <Dropdown.Toggle
                    variant='link'
                    style={{ color: '#000', border: 'none' }}
                    bsPrefix='p-0'
                  >
                    <i className='fas fa-ellipsis-v my-3 '></i>
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <>
                      <Dropdown.Item as='button' onClick={clearChatHandler}>
                        Clear Chat
                      </Dropdown.Item>

                      <Dropdown.Item
                        as='button'
                        onClick={deleteConversationHandler}
                      >
                        Delete Conversation
                      </Dropdown.Item>
                    </>
                  </Dropdown.Menu>
                </Dropdown>
              </OverlayTrigger>
            </td>
          </tr>
        </tbody>
      </Table>
    )
  )
}

export default ChatBoxHeader
