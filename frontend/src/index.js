import React from 'react'
import ReactDOM from 'react-dom'
import './bootstrap.min.css'
import './index.css'
import { Provider } from 'react-redux'
import App from './App'
import store from './store'
// import { Redirect } from 'react-router'
// import { Router } from 'express'

// const LoginCheck = () => {
//   const isLogged = !!localStorage.getItem('userInfo')

//   if (!isLogged) {
//     return (
//       <Router>
//         <Redirect to='/login' />
//       </Router>
//     )
//   } else {
//     return (
//       <>
//         <Provider store={store}>
//           <App />
//         </Provider>
//       </>
//     )
//   }
// }

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
