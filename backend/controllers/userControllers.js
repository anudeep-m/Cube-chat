import User from '../models/userModel.js'
import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'

// Register a new User
// route - POST /api/users
// access - Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, profilePicture, password } = req.body

  const userExists = await User.findOne({ email })

  if (userExists) {
    res.status(404)
    throw new Error('User Already Exists')
  }

  const user = await User.create({
    name,
    email,
    profilePicture,
    password,
  })

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      profilePicture: user.profilePicture,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid User Data')
  }
})

// Auth User and Get Token
// route - POST /api/users/login
// access - Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      profilePicture: user.profilePicture,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    })
  } else {
    res.status(401)
    throw new Error('Invalid credentials')
  }
})

// Get User profile
// route - POST /api/users/profile
// access - Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id)

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      profilePicture: user.profilePicture,
      conversations: user.conversations,
      isAdmin: user.isAdmin,
    })
  } else {
    res.status(404)
    throw new Error('user not found')
  }
})

// Get All Users Barring Present User
// route - GET /api/users
const getAllUsers = asyncHandler(async (req, res) => {
  let users = await User.find()

  users = users.filter(
    (user) => JSON.stringify(user._id) !== JSON.stringify(req.user.id)
  )

  if (users.length > 0) {
    res.status(200).json(users)
  } else {
    res.status(404)
    throw new Error('Users not found')
  }
})

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    user.profilePicture = req.body.profilePicture || user.profilePicture
    if (req.body.password) {
      user.password = req.body.password
    }
    const updatedUser = await user.save()
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      profilePicture: updatedUser.profilePicture,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

const getFriendProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.friendId)

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      profilePicture: user.profilePicture,
      conversations: user.conversations,
      isAdmin: user.isAdmin,
    })
  } else {
    res.status(404)
    throw new Error('user not found')
  }
})

export {
  registerUser,
  authUser,
  getAllUsers,
  getUserProfile,
  updateUserProfile,
  getFriendProfile,
}
