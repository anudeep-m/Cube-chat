import React, { useState, useEffect } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Warning from '../components/warning'
import { Loader } from '../components/loader'

import FormContainer from '../components/formcontainer'
import {
  getUserDetails,
  updateUserProfile,
} from '../../redux/actions/userActions'
import { USER_UPDATE_PROFILE_RESET } from '../../redux/constants'
import Footer from '../components/footer'
import { Link } from 'react-router-dom'
import { Image } from 'cloudinary-react'
import axios from 'axios'

const AccountScreen = ({ history }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)
  const [fileInputState, setFileInputState] = useState('')
  const [previewSource, setPreviewSource] = useState()
  const [imageId, setImageId] = useState('')

  const dispatch = useDispatch()

  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails

  const userLogin = useSelector((state) => state.userLogin)
  let { userInfo } = userLogin

  const [profilePicture, setProfilePicture] = useState(
    'cube_chat/hvfotfwc9fra5jcdq7ps'
  )

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
  const { success: successUpdate } = userUpdateProfile

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    } else {
      if (!user || !user.name || successUpdate) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET })
        dispatch(getUserDetails('profile'))
      } else {
        setName(user.name)
        setEmail(user.email)
      }
    }
  }, [dispatch, history, userInfo, user, successUpdate])

  const handleFileInputChange = (e) => {
    const file = e.target.files[0]
    previewFile(file)
    setFileInputState(e.target.value)
  }
  const previewFile = (file) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      setPreviewSource(reader.result)
    }
  }

  const imageUploadHandler = (event) => {
    event.preventDefault()
    if (!previewSource) return
    replaceImage(previewSource)
  }

  const replaceImage = async (base64EncodedImage) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }
      const { data } = await axios.post(
        `/api/upload`,
        JSON.stringify({ data: base64EncodedImage }),
        config
      )
      setImageId(data.imageId)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    setProfilePicture(imageId)
    dispatch(
      updateUserProfile({
        profilePicture: imageId,
      })
    )
  }, [imageId, dispatch])

  const submitHandler = (event) => {
    event.preventDefault()
    if (password !== confirmPassword) {
      setMessage('Passwords do not match')
    } else {
      event.preventDefault()
      dispatch(
        updateUserProfile({
          id: user._id,
          name,
          email,
          profilePicture,
          password,
        })
      )
    }
  }

  return (
    <>
      <Link to='/'>
        <Button varaint='primary' className='my-4 mx-5 rounded'>
          <i className='fas fa-home' type='button'></i>
        </Button>
      </Link>
      <h4 className='text-center '>Hello {name}</h4>

      <Row>
        <Col
          md='4'
          className='d-flex justify-content-center align-items-center py-3 my-3'
        >
          <Col className='px-5 mx-2 text-center'>
            <Row>
              <Image
                cloudName='chegu-builds'
                public_id={userInfo.profilePicture}
                height='320'
                width='300'
                crop='scale'
                radius='max'
              />
            </Row>
            <Row>
              <Form>
                <Form.Group controlId='proilePicture' className='my-1'>
                  <Row>
                    <Col md='8'>
                      <Form.Control
                        type='file'
                        name='image'
                        value={fileInputState}
                        onChange={handleFileInputChange}
                        required
                      ></Form.Control>
                    </Col>
                    <Col md='4'>
                      <Button
                        onClick={imageUploadHandler}
                        className='btn-sm btn-warning rounded'
                      >
                        {imageId ? 'Saved' : 'Save'}
                      </Button>
                    </Col>
                  </Row>
                </Form.Group>
              </Form>
            </Row>
          </Col>
        </Col>

        <Col md='8' className=' py-3 my-3'>
          <FormContainer style={{ color: 'white' }}>
            {loading && <Loader />}
            {error && <Warning>{error}</Warning>}
            {message && <Warning>{message}</Warning>}
            {successUpdate && (
              <Warning variant='success'>Profile Updated</Warning>
            )}

            <Form onSubmit={submitHandler} className='d-flex flex-column'>
              <Form.Group controlId='name' className='my-1'>
                <Form.Label className='mx-2'>Name</Form.Label>
                <Form.Control
                  type='name'
                  placeholder='Enter name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId='email' className='my-1'>
                <Form.Label className='mx-2'>Email Address</Form.Label>
                <Form.Control
                  type='email'
                  placeholder='Enter email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId='password' className='my-1'>
                <Form.Label className='mx-2'>Password</Form.Label>
                <Form.Control
                  type='password'
                  placeholder='Enter password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId='confirmPassword' className='my-1'>
                <Form.Label className='mx-2'>Confirm Password</Form.Label>
                <Form.Control
                  type='password'
                  placeholder='Confirm password'
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Button type='submit' varaint='primary' className='my-2'>
                Update
              </Button>
            </Form>
          </FormContainer>
        </Col>
      </Row>

      <Footer />
    </>
  )
}

export default AccountScreen
