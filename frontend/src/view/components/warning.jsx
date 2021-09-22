import React from 'react'
import { Alert } from 'react-bootstrap'

const Warning = ({ variant, children }) => {
  return (
    <Alert
      variant={variant}
      className='py-3 my-3 d-flex justify-content-center'
    >
      {children}
    </Alert>
  )
}
Warning.defaultProps = {
  variant: 'danger',
}

export default Warning
