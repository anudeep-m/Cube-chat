import React from 'react'
import { Container, Row, Col, Image } from 'react-bootstrap'
const Footer = () => {
  return (
    <footer>
      <Container>
        <Row className='text-center d-flex justify-content-around py-3' xs='12'>
          <Col xs='12' md='4'>
            {' '}
          </Col>
          <Col xs='12' md='4'>
            Copyright &copy; Cube Chat
          </Col>
          <Col xs='12' md='4'>
            {' '}
            <Image
              src='/codedby.png'
              alt='owner'
              height='20'
              width='20'
              className='mx-1'
            />{' '}
            <a
              href='https://anudeep-m.netlify.app'
              target='_blank'
              rel='noopener noreferrer'
              style={{ textDecoration: 'none', color: '#000' }}
            >
              by Anudeep
            </a>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
