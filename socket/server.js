require('dotenv').config()

const PORT = process.env.PORT || 7000
const ORIGIN_PORT = process.env.ORIGIN_PORT || 'http://localhost:3000'

const io = require('socket.io')(PORT, {
  cors: {
    origin: ORIGIN_PORT,
  },
})

let users = []

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId })
}

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId)
}

const getUser = (userId) => {
  return users.find((user) => user.userId === userId)
}

io.on('connection', (socket) => {
  //User Connection
  socket.on('addUser', (userId) => {
    console.log(`${userId} A User Connected`)
    addUser(userId, socket.id)
    io.emit(
      'getUsers',
      users.map((user) => user.userId)
    )
  })

  //User Disconnection
  socket.on('disconnect', () => {
    console.log('A User Disconnected')
    removeUser(socket.id)
    io.emit(
      'getUsers',
      users.map((user) => user.userId)
    )
  })

  //Send and Get Message
  socket.on('sendMessage', ({ senderId, receiverId, text }) => {
    const receiver = getUser(receiverId)
    io.to(receiver?.socketId).emit('getMessage', {
      senderId,
      text,
    })
  })
})
