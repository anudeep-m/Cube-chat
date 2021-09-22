import express from 'express'
import {
  acceptFriendRequest,
  deleteFriendRequest,
  deleteSentRequest,
  getUserFriendRequests,
  getUserFriends,
  getUserFriendSuggestions,
  getUserSentRequests,
  sendFriendRequest,
  unfriend,
} from '../controllers/friendControllers.js'
import { protect } from '../Middlewares/authMiddleware.js'

const router = express.Router()

router.route('/').get(protect, getUserFriends)

router.route('/requests').get(protect, getUserFriendRequests)

router.route('/sentRequests').get(protect, getUserSentRequests)
router.route('/suggestions').get(protect, getUserFriendSuggestions)
router.route('/sendFriendRequest').post(protect, sendFriendRequest)
router.route('/acceptFriendRequest').post(protect, acceptFriendRequest)
router.route('/deleteFriendRequest').post(protect, deleteFriendRequest)
router.route('/deleteSentRequest').post(protect, deleteSentRequest)
router.route('/unfriend').post(protect, unfriend)

export default router
