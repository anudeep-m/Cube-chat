import express from 'express'
import {
  authUser,
  getAllUsers,
  getFriendProfile,
  getUserProfile,
  registerUser,
  updateUserProfile,
} from '../controllers/userControllers.js'
import { protect } from '../middlewares/authMiddleware.js'

const router = express.Router()

router.route('/').post(registerUser).get(protect, getAllUsers)

router.route('/login').post(authUser)

router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile)

router.route('/:friendId').get(getFriendProfile)

export default router
