import React from 'react'
import { Table, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const SuggestionsBoxHeader = ({
  setFRscreen,
  setSGscreen,
  setSRscreen,
  fRScreen,
  sGScreen,
  sRScreen,
  FRsCount,
}) => {
  const activateFRscreen = () => {
    setFRscreen(true)
    setSGscreen(false)
    setSRscreen(false)
  }
  const activateSGscreen = () => {
    setFRscreen(false)
    setSGscreen(true)
    setSRscreen(false)
  }
  const activateSRscreen = () => {
    setFRscreen(false)
    setSGscreen(false)
    setSRscreen(true)
  }
  return (
    <Table responsive className='m-0 justify-content-end'>
      <tbody>
        <tr>
          <td className='mx-5 px-5'> </td>
          <td className='mx-5 px-5'> </td>
          <td className='mx-5 px-5'> </td>
          <td className='mx-5 px-5'> </td>
          <td className='px-3'>
            <OverlayTrigger
              key='left'
              placement='left'
              overlay={<Tooltip id={`tooltip-left`}>Home</Tooltip>}
            >
              <Link to='/'>
                <i className='fas fa-home my-3' type='button'></i>
              </Link>
            </OverlayTrigger>
          </td>

          <td>
            <OverlayTrigger
              key='left'
              placement='left'
              overlay={<Tooltip id={`tooltip-left`}>Find Friends</Tooltip>}
            >
              <i
                className='fas fa-user-plus my-3 '
                type='button'
                style={{ color: sGScreen ? 'teal' : 'blue' }}
                onClick={activateSGscreen}
              ></i>
            </OverlayTrigger>
          </td>

          <td>
            <OverlayTrigger
              key='left'
              placement='left'
              overlay={<Tooltip id={`tooltip-left`}>Friend Requests</Tooltip>}
            >
              <i
                className='fas fa-users my-3 '
                type='button'
                onClick={activateFRscreen}
                style={{ color: fRScreen ? 'teal' : 'blue' }}
              ></i>
            </OverlayTrigger>
            <span className='badge rounded-pill bg-danger m-0 px-1 mb-2'>
              {FRsCount ? FRsCount : 0}
            </span>
          </td>

          <td>
            <OverlayTrigger
              key='left'
              placement='left'
              overlay={<Tooltip id={`tooltip-left`}>Pending Requests</Tooltip>}
            >
              <i
                className='fas fa-hourglass-half my-3'
                type='button'
                style={{ color: sRScreen ? 'teal' : 'blue' }}
                onClick={activateSRscreen}
              ></i>
            </OverlayTrigger>
          </td>
        </tr>
      </tbody>
    </Table>
  )
}

export default SuggestionsBoxHeader
