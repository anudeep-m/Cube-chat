// import React from 'react'
// import { LinkContainer } from 'react-router-bootstrap'
// import {
//   Row,
//   Col,
//   Table,
//   OverlayTrigger,
//   Tooltip,
//   Dropdown,
//   Navbar,
// } from 'react-bootstrap'
// import UserDp from '../../pictures/laugh.png'
// import Menuv from '../../pictures/menu-v.png'

// import { useDispatch, useSelector } from 'react-redux'
// import { logoutUser } from '../../redux/actions/userActions'
// import { Link } from 'react-router-dom'
// import ChatBoxHeader from './chatboxheader'

// const Header = () => {
//   const userLogin = useSelector((state) => state.userLogin)
//   const currentChatChange = useSelector((state) => state.currentChatChange)
//   const { convo } = currentChatChange
//   const { userInfo } = userLogin

//   const dispatch = useDispatch()

//   const logoutHandler = () => {
//     dispatch(logoutUser())
//   }

//   return (
//     <header>
//       <Navbar fixed='top'>
//         <Row>
//           <Col md='3'>
//             <Table responsive className='m-0'>
//               <tbody>
//                 <tr>
//                   <td>
//                     <img
//                       src={UserDp}
//                       alt='userdp'
//                       style={{ borderRadius: '50%' }}
//                       height='50'
//                       width='50'
//                       className='mx-3'
//                     />
//                   </td>
//                   <td>
//                     <OverlayTrigger
//                       key='left'
//                       placement='left'
//                       overlay={<Tooltip id={`tooltip-left`}>Menu</Tooltip>}
//                     >
//                       <Dropdown style={{ position: 'absolute' }}>
//                         <Dropdown.Toggle
//                           variant='link'
//                           style={{ color: '#000' }}
//                           bsPrefix='p-0'
//                         >
//                           <img src={Menuv} alt='Icon' className='my-3' />
//                         </Dropdown.Toggle>
//                         <Dropdown.Menu>
//                           {userInfo ? (
//                             <>
//                               <LinkContainer to='/account'>
//                                 <Dropdown.Item as='button'>
//                                   Account
//                                 </Dropdown.Item>
//                               </LinkContainer>

//                               <Dropdown.Item
//                                 as='button'
//                                 onClick={logoutHandler}
//                               >
//                                 Sign-out
//                               </Dropdown.Item>
//                             </>
//                           ) : (
//                             <Dropdown.Item as='button' onClick={logoutHandler}>
//                               <Link to='/login'>Sign-in</Link>
//                             </Dropdown.Item>
//                           )}
//                         </Dropdown.Menu>
//                       </Dropdown>
//                     </OverlayTrigger>
//                   </td>
//                 </tr>
//               </tbody>
//             </Table>
//           </Col>
//           <Col md='9'>
//             <Row className='chatboxNav'>{convo && <ChatBoxHeader />}</Row>
//           </Col>
//         </Row>
//       </Navbar>
//     </header>
//   )
// }

// export default Header

// //  <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
// //       <Container>
// //         <LinkContainer to='/'>
// //           <Navbar.Brand className='logo'>
// //             {' '}
// //             <img
// //               alt='Icon'
// //               style={{ height: 40, width: 40 }}
// //               src={Icon}
// //             />{' '}
// //             Cube Chat
// //           </Navbar.Brand>
// //         </LinkContainer>

// //         <Navbar.Toggle aria-controls='basic-navbar-nav' />
// //         <Navbar.Collapse id='basic-navbar-nav'>
// //           <Nav className='ms-auto text-justify'>
// //             {userInfo ? (
// //               <NavDropdown title={userInfo.name} id='username'>
// //                 <LinkContainer to='/account'>
// //                   <NavDropdown.Item>Account</NavDropdown.Item>
// //                 </LinkContainer>

// //                 <NavDropdown.Item onClick={logoutHandler}>
// //                   Sign-out
// //                 </NavDropdown.Item>
// //               </NavDropdown>
// //             ) : (
// //               <LinkContainer to='/login'>
// //                 <Nav.Link>Sign-in</Nav.Link>
// //               </LinkContainer>
// //             )}

// //             {userInfo && userInfo.isAdmin && (
// //               <NavDropdown title='Admin' id='adminmenu'>
// //                 <LinkContainer to='/admin/userslist'>
// //                   <NavDropdown.Item>Users</NavDropdown.Item>
// //                 </LinkContainer>
// //               </NavDropdown>
// //             )}
// //           </Nav>
// //         </Navbar.Collapse>
// //       </Container>
// //     </Navbar>
