import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import {
  listFriendRequests,
  listSentRequests,
  listSuggestions,
} from '../../../redux/actions/friendActions'
import FriendCard from '../../components/friendCard'
import { LoaderThin } from '../../components/loader'
import SuggestionsBoxHeader from '../../components/suggestionboxheader'
import Warning from '../../components/warning'

const SuggestionsBox = () => {
  const friendRequestsList = useSelector((state) => state.friendRequestsList)
  const {
    loading: loadingFR,
    error: errorFR,
    friendRequests,
  } = friendRequestsList

  const sentRequestsList = useSelector((state) => state.sentRequestsList)
  const { loading: loadingSR, error: errorSR, sentRequests } = sentRequestsList

  const suggestionsList = useSelector((state) => state.suggestionsList)
  const { loading: loadingSG, error: errorSG, suggestions } = suggestionsList

  const friendRequestSend = useSelector((state) => state.friendRequestSend)
  const { success: successSFR } = friendRequestSend

  const friendRequestAccept = useSelector((state) => state.friendRequestAccept)
  const { success: successAFR } = friendRequestAccept

  const friendRequestDelete = useSelector((state) => state.friendRequestDelete)
  const { success: successDFR } = friendRequestDelete

  const sentRequestDelete = useSelector((state) => state.sentRequestDelete)
  const { success: successDSR } = sentRequestDelete

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const [fRScreen, setFRscreen] = useState(false)
  const [sGScreen, setSGscreen] = useState(true)
  const [sRScreen, setSRscreen] = useState(false)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(listFriendRequests())
    dispatch(listSentRequests())
    dispatch(listSuggestions())
  }, [dispatch, userInfo, successSFR, successAFR, successDFR, successDSR])
  return (
    <Col>
      <Row>
        <SuggestionsBoxHeader
          fRScreen={fRScreen}
          sGScreen={sGScreen}
          sRScreen={sRScreen}
          setFRscreen={setFRscreen}
          setSGscreen={setSGscreen}
          setSRscreen={setSRscreen}
          FRsCount={friendRequests?.length}
        />
      </Row>
      <Row>
        <div className='suggestionbox'>
          <Col className='text-center m-4 p-4'>
            {fRScreen &&
              (loadingFR ? (
                <LoaderThin />
              ) : errorFR ? (
                <Warning>{errorFR}</Warning>
              ) : (
                <Row>
                  <h4>Friend Requests</h4>
                  <Row className='d-flex justify-content-around'>
                    {friendRequests.map((fRequest) => (
                      <Col key={fRequest} xs='10' sm='8' md='5' lg='4' xl='3'>
                        <FriendCard friendId={fRequest} fRequest={true} />
                      </Col>
                    ))}
                  </Row>
                </Row>
              ))}

            {sGScreen &&
              (loadingSG ? (
                <LoaderThin />
              ) : errorSG ? (
                <Warning>{errorSG}</Warning>
              ) : (
                <Row>
                  <h4>Find Friends</h4>
                  <Row className='d-flex justify-content-around'>
                    {suggestions.map((suggestion) => (
                      <Col key={suggestion} xs='10' sm='8' md='5' lg='4' xl='3'>
                        <FriendCard friendId={suggestion} suggestion={true} />
                      </Col>
                    ))}
                  </Row>
                </Row>
              ))}

            {sRScreen &&
              (loadingSR ? (
                <LoaderThin />
              ) : errorSR ? (
                <Warning>{errorSR}</Warning>
              ) : (
                <Row>
                  <h4>Sent Requests</h4>
                  <Row className='d-flex justify-content-around'>
                    {sentRequests.map((sRequest) => (
                      <Col key={sRequest} xs='10' sm='8' md='5' lg='4' xl='3'>
                        <FriendCard friendId={sRequest} sRequest={true} />
                      </Col>
                    ))}
                  </Row>
                </Row>
              ))}
          </Col>
        </div>
      </Row>
    </Col>
  )
}

export default SuggestionsBox
