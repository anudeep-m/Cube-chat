import asyncHandler from 'express-async-handler'
import Message from '../models/messageModel.js'

// Create a new Message
// route - POST /api/messages
const newMessage = asyncHandler(async (req, res) => {
  const newMessage = new Message(req.body)

  try {
    const savedMessage = await newMessage.save()
    res.status(201).json(savedMessage)
  } catch (error) {
    res.status(400).json(error)
  }
})

// Get All Messages in the conversation
// route - GET /api/messages/:convoId
const getMessages = asyncHandler(async (req, res) => {
  const messages = await Message.find({
    conversationId: req.params.convoId,
  })

  try {
    if (messages) {
      res.status(201).json(messages)
    } else {
      res.status(400).json({ message: 'Messages not found' })
    }
  } catch (error) {
    res.status(400).json(error)
  }
})

// Delete All Messages in the conversation
// route - DELETE /api/messages/:convoId
const deleteMessages = asyncHandler(async (req, res) => {
  let messages = await Message.find({ conversationId: req.params.convoId })

  const removeMsg = async (message) => {
    await message.remove()
  }

  try {
    if (messages) {
      messages.map((message) => removeMsg(message))

      res.status(201).json({ message: 'Chat Cleared' })
    } else {
      res.status(400).json({ message: 'Messages not found' })
    }
  } catch (error) {
    console.log(error)
    res.status(400).json({ message: 'error' })
  }
})

export { newMessage, getMessages, deleteMessages }
