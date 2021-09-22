import React from 'react'
import { Spinner } from 'react-bootstrap'

const Loader = () => {
  return (
    <Spinner
      animation='grow'
      role='status'
      style={{
        width: '25px',
        height: '25px',
        margin: '50px auto',
        display: 'block',
        color: 'blue',
      }}
    >
      <span className='sr-only'></span>
    </Spinner>
  )
}
const LoaderThin = () => {
  return (
    <Spinner
      animation='grow'
      role='status'
      style={{
        width: '10px',
        height: '10px',
        margin: '50px auto',
        display: 'block',
        color: 'rgba(175, 170, 170, 0.4)',
      }}
    >
      <span className='sr-only'></span>
    </Spinner>
  )
}

export { Loader, LoaderThin }
