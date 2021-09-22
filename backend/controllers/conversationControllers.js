import asyncHandler from 'express-async-handler'
import Conversation from '../models/conversationModel.js'
import User from '../models/userModel.js'

// Create a new Conversation
// route - POST /api/conversations
// access - Private
const newConversation = asyncHandler(async (req, res) => {
  const senderId = req.user.id
  const { receiverId } = req.body
  const loggedInUser = await User.findById(senderId)
  const friend = await User.findById(receiverId)

  const newConversation = await Conversation.create({
    members: [senderId, receiverId],
  })

  try {
    const savedConversation = await newConversation.save()

    const conversationUser = {
      conversationId: String(savedConversation._id),
      friendId: receiverId,
    }

    const conversationFriend = {
      conversationId: String(savedConversation._id),
      friendId: senderId,
    }

    loggedInUser.conversations.push(conversationUser)
    friend.conversations.push(conversationFriend)

    await loggedInUser.save()
    await friend.save()

    res.status(201).json(savedConversation)
  } catch (error) {
    res.status(400).json(error)
  }
})

// Get All Conversation
// route - GET /api/conversations/:id
// access - Private
const getConversations = asyncHandler(async (req, res) => {
  const conversations = await Conversation.find({
    members: { $in: [req.params.userId] },
  })

  try {
    if (conversations) {
      res.status(201).json(conversations)
    } else {
      res.status(400).json({ message: 'Conversation not found' })
    }
  } catch (error) {
    res.status(400).json(error)
  }
})

// Delete Conversation
// route - DELETE /api/conversations/:conversationId
// access - Private
const deleteConversation = asyncHandler(async (req, res) => {
  try {
    const conversation = await Conversation.findById(req.params.conversationId)
    const loggedInUser = await User.findById(conversation.members[0])
    const requestedUser = await User.findById(conversation.members[1])

    const conversationId = req.params.conversationId

    loggedInUser.conversations = loggedInUser.conversations.filter(
      (convo) => convo.conversationId !== conversationId
    )
    requestedUser.conversations = requestedUser.conversations.filter(
      (convo) => convo.conversationId !== conversationId
    )

    await conversation.remove()
    loggedInUser.save()
    requestedUser.save()
    res.status(201).json({ msg: 'Conversation Deleted' })
  } catch (error) {
    res.status(400)
    throw new Error(error)
  }
})
export { newConversation, getConversations, deleteConversation }
