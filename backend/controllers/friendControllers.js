import User from '../models/userModel.js'
import asyncHandler from 'express-async-handler'

// Get Logged In User Friends
// route - GET /api/friends
const getUserFriends = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id)

  try {
    res.status(200).json(user.friends)
  } catch (error) {
    res.status(404)
    throw new Error('Friends not found')
  }
})

// Get Logged In User Friend Requests
// route - GET /api/friends/requests
const getUserFriendRequests = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id)

  try {
    res.status(200).json(user.friendRequests)
  } catch (error) {
    res.status(404)
    throw new Error('Friend Requests not found')
  }
})

// Get Logged In User Sent Requests
// route - GET /api/friends/sentrequests
const getUserSentRequests = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id)

  try {
    res.status(200).json(user.sentRequests)
  } catch (error) {
    res.status(404)
    throw new Error('Sent Requests not found')
  }
})

// Get Friend Suggestions
// route - GET /api/friends/suggestions
const getUserFriendSuggestions = asyncHandler(async (req, res) => {
  const loggedInUser = await User.findById(req.user.id)
  let users = await User.find()
  let friendSuggestions = []

  try {
    users = users.filter(
      (user) => JSON.stringify(user._id) !== JSON.stringify(req.user.id)
    )
    users.filter((user) => {
      !loggedInUser.friends.includes(user._id) &&
        !loggedInUser.friendRequests.includes(user._id) &&
        !loggedInUser.sentRequests.includes(user._id) &&
        friendSuggestions.push(user._id)
    })
  } catch (error) {
    res.status(404)
    throw new Error('Friends not found')
  }
  res.status(200).json(friendSuggestions)
})

// Send Friend Request
// route - POSTT /api/friends/sendFriendRequest
const sendFriendRequest = asyncHandler(async (req, res) => {
  const loggedInUser = await User.findById(req.user.id)
  const requestedUser = await User.findById(req.body.requestedFriendId)

  try {
    if (requestedUser) {
      !requestedUser.friends.includes(req.user.id) &&
        !requestedUser.friendRequests.includes(req.user.id) &&
        !requestedUser.sentRequests.includes(req.user.id) &&
        requestedUser.friendRequests.push(req.user.id)

      !loggedInUser.friends.includes(req.body.requestedFriendId) &&
        !loggedInUser.friendRequests.includes(req.body.requestedFriendId) &&
        !loggedInUser.sentRequests.includes(req.body.requestedFriendId) &&
        loggedInUser.sentRequests.push(req.body.requestedFriendId)
    } else {
      res.status(404).json({ msg: 'User not found' })
    }
    requestedUser.save()
    loggedInUser.save()
    res.status(200).json({
      message: `Friend Request Sent to ${requestedUser.name}`,
    })
  } catch (error) {
    res.status(404)
    throw new Error({ error })
  }
})

// Accept Friend Request
// route - POST /api/friends
const acceptFriendRequest = asyncHandler(async (req, res) => {
  const loggedInUser = await User.findById(req.user.id)
  const requestedUser = await User.findById(req.body.requestedFriendId)

  try {
    if (requestedUser) {
      if (
        !requestedUser.friends.includes(req.user.id) &&
        !loggedInUser.friends.includes(req.body.requestedFriendId)
      ) {
        requestedUser.friends.push(req.user.id)
        loggedInUser.friends.push(req.body.requestedFriendId)

        requestedUser.sentRequests = requestedUser.sentRequests.filter(
          (sR) => sR !== req.user.id
        )
        loggedInUser.friendRequests = loggedInUser.friendRequests.filter(
          (fR) => fR !== req.body.requestedFriendId
        )
      }
    } else {
      res.status(404).json({ msg: 'User not found' })
    }
    loggedInUser.save()
    requestedUser.save()
    res.status(200).json({
      message: `${requestedUser.name}'s friend request accepted and added to friends `,
    })
  } catch (error) {
    res.status(404)
    throw new Error(error)
  }
})

// Delete Friend Request
// route - POST /api/friends/deleteFriendRequest
const deleteFriendRequest = asyncHandler(async (req, res) => {
  const loggedInUser = await User.findById(req.user.id)
  const requestedUser = await User.findById(req.body.requestedFriendId)

  try {
    if (requestedUser) {
      if (
        requestedUser.sentRequests.includes(req.user.id) &&
        loggedInUser.friendRequests.includes(req.body.requestedFriendId)
      ) {
        requestedUser.sentRequests = requestedUser.sentRequests.filter(
          (sR) => sR !== req.user.id
        )
        loggedInUser.friendRequests = loggedInUser.friendRequests.filter(
          (fR) => fR !== req.body.requestedFriendId
        )
      }
    } else {
      res.status(404).json({ msg: 'User not found' })
    }
    loggedInUser.save()
    requestedUser.save()
    res.status(200).json({
      message: `${requestedUser.name}'s friend request has been deleted `,
    })
  } catch (error) {
    res.status(404)
    throw new Error(error)
  }
})

// Delete Sent Request
// route - POST /api/friends/deleteSentRequest
const deleteSentRequest = asyncHandler(async (req, res) => {
  const loggedInUser = await User.findById(req.user.id)
  const requestedUser = await User.findById(req.body.requestedFriendId)

  try {
    if (requestedUser) {
      if (
        requestedUser.friendRequests.includes(req.user.id) &&
        loggedInUser.sentRequests.includes(req.body.requestedFriendId)
      ) {
        requestedUser.friendRequests = requestedUser.friendRequests.filter(
          (sR) => sR !== req.user.id
        )
        loggedInUser.sentRequests = loggedInUser.sentRequests.filter(
          (fR) => fR !== req.body.requestedFriendId
        )
      }
    } else {
      res.status(404).json({ msg: 'User not found' })
    }
    loggedInUser.save()
    requestedUser.save()
    res.status(200).json({
      message: `${requestedUser.name}'s sent request has been deleted `,
    })
  } catch (error) {
    res.status(404)
    throw new Error(error)
  }
})

// Unfriend
// route - POST /api/friends/unfriend
const unfriend = asyncHandler(async (req, res) => {
  const loggedInUser = await User.findById(req.user.id)
  const requestedUser = await User.findById(req.body.requestedFriendId)

  try {
    if (requestedUser) {
      if (
        requestedUser.friends.includes(req.user.id) &&
        loggedInUser.friends.includes(req.body.requestedFriendId)
      ) {
        requestedUser.friends = requestedUser.friends.filter(
          (sR) => sR !== req.user.id
        )
        loggedInUser.friends = loggedInUser.friends.filter(
          (fR) => fR !== req.body.requestedFriendId
        )
      }
    } else {
      res.status(404).json({ msg: 'User not found' })
    }
    loggedInUser.save()
    requestedUser.save()
    res.status(200).json({
      message: `Unfriended ${requestedUser.name} `,
    })
  } catch (error) {
    res.status(404)
    throw new Error(error)
  }
})

export {
  getUserFriends,
  getUserFriendRequests,
  getUserSentRequests,
  getUserFriendSuggestions,
  sendFriendRequest,
  acceptFriendRequest,
  deleteFriendRequest,
  deleteSentRequest,
  unfriend,
}
