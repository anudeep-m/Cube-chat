import React, { useState, useEffect } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Warning from '../components/warning'
import { Loader } from '../components/loader'

import { registerUser } from '../../redux/actions/userActions'
import FormContainer from '../components/formcontainer'
import Footer from '../components/footer'
import axios from 'axios'
import { Image } from 'cloudinary-react'

const RegisterScreen = ({ location, history }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [profilePicture, setProfilePicture] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)
  const [fileInputState, setFileInputState] = useState('')
  const [previewSource, setPreviewSource] = useState()
  const [imageId, setImageId] = useState('')

  const dispatch = useDispatch()

  const userRegister = useSelector((state) => state.userRegister)
  const { loading, error, userInfo } = userRegister

  const redirect = location.search ? location.search.split('=')[1] : '/'

  useEffect(() => {
    if (userInfo) {
      history.push(redirect)
    }
  }, [history, redirect, userInfo])

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
    uploadImage(previewSource)
  }

  const uploadImage = async (base64EncodedImage) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }
      const { data } = await axios.post(
        '/api/upload',
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
  }, [imageId])

  const submitHandler = (event) => {
    event.preventDefault()
    if (password !== confirmPassword) {
      setMessage('Passwords do not match')
    } else {
      dispatch(registerUser(name, email, profilePicture, password))
    }
  }

  return (
    <>
      <Row>
        <Col
          md='3'
          className='d-flex justify-content-center align-items-center'
        >
          <Image
            cloudName='chegu-builds'
            public_id={imageId ? imageId : 'cube_chat/ar4bvmcdapmi0swjz5hv'}
            height='320'
            width='300'
            crop='scale'
            radius='max'
          />
        </Col>

        <Col md='9' className=' py-3 my-3'>
          <FormContainer style={{ color: 'white' }}>
            <h2 className='text-center py-3'>Sign Up</h2>
            {loading && <Loader />}
            {error && <Warning>{error}</Warning>}
            {message && <Warning>{message}</Warning>}

            <Form onSubmit={submitHandler} className='d-flex flex-column'>
              <Form.Group controlId='name' className='my-1'>
                <Form.Label className='mx-2'>Name</Form.Label>
                <Form.Control
                  type='name'
                  placeholder='Enter name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId='email' className='my-1'>
                <Form.Label className='mx-2'>Email Address</Form.Label>
                <Form.Control
                  type='email'
                  placeholder='Enter email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId='proilePicture' className='my-1'>
                <Form.Label className='mx-2'>Profile Picture</Form.Label>
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
                      required
                    >
                      {imageId ? 'Saved' : 'Save'}
                    </Button>
                  </Col>
                </Row>
              </Form.Group>

              <Form.Group controlId='password' className='my-1'>
                <Form.Label className='mx-2'>Password</Form.Label>
                <Form.Control
                  type='password'
                  placeholder='Enter password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId='confirmPassword' className='my-1'>
                <Form.Label className='mx-2'>Confirm Password</Form.Label>
                <Form.Control
                  type='password'
                  placeholder='Confirm password'
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                ></Form.Control>
              </Form.Group>

              <Button type='submit' varaint='primary' className='my-2 rounded'>
                Sign Up
              </Button>
            </Form>

            <Row className='text-center my-2'>
              <Col>
                Have an account? ~{' '}
                <Link to={redirect ? `login?redirect=${redirect}` : `/login`}>
                  Login
                </Link>
              </Col>
            </Row>
          </FormContainer>
        </Col>
      </Row>

      <Footer />
    </>
  )
}

export default RegisterScreen
