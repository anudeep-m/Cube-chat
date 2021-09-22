import React from 'react'
import { Dropdown, OverlayTrigger, Table, Tooltip } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../../redux/actions/userActions'
import { LinkContainer } from 'react-router-bootstrap'
import { Link } from 'react-router-dom'
import { Image } from 'cloudinary-react'

const ProfileHead = ({ friendsList = false }) => {
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const dispatch = useDispatch()

  const logoutHandler = () => {
    dispatch(logoutUser())
  }
  return (
    <div className='border border-bottom-0 border-top-0 '>
      <Table responsive className='m-0'>
        <tbody>
          <tr>
            <td>
              <Image
                cloudName='chegu-builds'
                public_id={userInfo.profilePicture}
                height='48'
                width='45'
                crop='scale'
                radius='max'
                className='mx-2'
              />
            </td>
            <td>
              <OverlayTrigger
                key='left'
                placement='left'
                overlay={
                  <Tooltip id={`tooltip-left`}>
                    {friendsList ? 'Home' : 'Friends'}
                  </Tooltip>
                }
              >
                {friendsList ? (
                  <Link to='/'>
                    <i className='fas fa-home my-3' type='button'></i>
                  </Link>
                ) : (
                  <Link to='/friends'>
                    <i className='fas fa-user-friends my-3' type='button'></i>
                  </Link>
                )}
              </OverlayTrigger>
            </td>
            <td>
              <OverlayTrigger
                key='left'
                placement='left'
                overlay={<Tooltip id={`tooltip-left`}>Menu</Tooltip>}
              >
                <Dropdown style={{ position: 'absolute' }}>
                  <Dropdown.Toggle
                    variant='link'
                    style={{ color: '#000' }}
                    bsPrefix='p-0'
                  >
                    <i className='fas fa-ellipsis-v my-3'></i>
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <>
                      <LinkContainer to='/account'>
                        <Dropdown.Item as='button'>Account</Dropdown.Item>
                      </LinkContainer>

                      <Dropdown.Item as='button' onClick={logoutHandler}>
                        Sign-out
                      </Dropdown.Item>
                    </>
                  </Dropdown.Menu>
                </Dropdown>
              </OverlayTrigger>
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  )
}

export default ProfileHead
