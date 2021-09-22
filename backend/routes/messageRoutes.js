import express from 'express'
import {
  deleteMessages,
  getMessages,
  newMessage,
} from '../controllers/messageControllers.js'

const router = express.Router()

router.route('/').post(newMessage)
router.route('/:convoId').get(getMessages).delete(deleteMessages)

export default router
