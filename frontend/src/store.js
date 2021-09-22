import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import {
  friendDetailsReducer,
  userDetailsReducer,
  userLoginReducer,
  userRegisterReducer,
  userUpdateProfileReducer,
} from './redux/reducers/userReducers'
import {
  conversationCreateReducer,
  conversationDeleteReducer,
  conversationsListReducer,
  currentChatChangeReducer,
} from './redux/reducers/conversationReducers'
import {
  messageCreateReducer,
  messagesListClearReducer,
  messagesListReducer,
  receiveMessageChangeReducer,
  sendMessageChangeReducer,
} from './redux/reducers/messageReducers'
import {
  acceptFriendRequestReducer,
  deleteFriendRequestReducer,
  deleteSentRequestReducer,
  friendRequestsListReducer,
  friendsListReducer,
  sendFriendRequestReducer,
  sentRequestsListReducer,
  suggestionsListReducer,
  unfriendReducer,
} from './redux/reducers/friendReducers'

const reducer = combineReducers({
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  friendDetails: friendDetailsReducer,
  userLogin: userLoginReducer,
  userUpdateProfile: userUpdateProfileReducer,
  conversationsList: conversationsListReducer,
  messagesList: messagesListReducer,
  messagesListClear: messagesListClearReducer,
  conversationCreate: conversationCreateReducer,
  conversationDelete: conversationDeleteReducer,
  messageCreate: messageCreateReducer,
  currentChatChange: currentChatChangeReducer,
  sendMessage: sendMessageChangeReducer,
  receiveMessage: receiveMessageChangeReducer,
  friendsList: friendsListReducer,
  friendRequestsList: friendRequestsListReducer,
  sentRequestsList: sentRequestsListReducer,
  suggestionsList: suggestionsListReducer,
  friendRequestSend: sendFriendRequestReducer,
  friendRequestAccept: acceptFriendRequestReducer,
  friendRequestDelete: deleteFriendRequestReducer,
  sentRequestDelete: deleteSentRequestReducer,
  unfriendFriend: unfriendReducer,
})

const userInfofromLocalStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

const initalState = {
  userLogin: { userInfo: userInfofromLocalStorage },
}

const middleware = [thunk]

const store = createStore(reducer, initalState)

export default store
