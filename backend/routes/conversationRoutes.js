import express from 'express'
import {
  deleteConversation,
  getConversations,
  newConversation,
} from '../controllers/conversationControllers.js'
import { protect } from '../middlewares/authMiddleware.js'

const router = express.Router()

router.route('/').post(protect, newConversation)
router.route('/:userId').get(protect, getConversations)
router.route('/:conversationId').delete(protect, deleteConversation)

export default router
