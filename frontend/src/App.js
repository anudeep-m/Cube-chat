import { BrowserRouter as Router, Route } from 'react-router-dom'
import HomeScreen from './view/screens/homescreen'
import LoginScreen from './view/screens/loginscreen'
import RegisterScreen from './view/screens/registerscreen'
import AccountScreen from './view/screens/accountscreen'
import { useSelector } from 'react-redux'
import FriendsScreen from './view/screens/friendsscreen'

function App() {
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  return (
    <Router>
      <main>
        <>
          <Route
            path='/account'
            component={userInfo ? AccountScreen : LoginScreen}
          />
          <Route
            path='/'
            component={HomeScreen}
            // component={userInfo ? HomeScreen : LoginScreen}
            exact
          />
          <Route
            path='/friends'
            component={userInfo ? FriendsScreen : LoginScreen}
          />

          <Route path='/login' component={LoginScreen} />
          <Route path='/register' component={RegisterScreen} />
        </>
      </main>
    </Router>
  )
}

export default App
