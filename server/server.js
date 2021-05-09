const app = require('express')();
const server = require('http').createServer(app);
const socket = require('socket.io');
const cors = require('cors');

const PORT = process.env.PORT || 5000;
var users = [];
var filteredList = [];

app.use(cors(
  {
    origin: 'https://typewith.netlify.app'
  }
));

const io = socket(server, {
  cors: {
    origin: 'https://typewith.netlify.app',
    methods: ['GET', 'POST']
  }
});

app.get('/', (req, res) => {
  res.send('Server Is Successfully Running');
});

io.on('connection', (socket) => {

  const { id: ID } = socket;

  socket.on('join-me', (name) => {
    let newUser = { id: ID, name };
    users.push(newUser);
    socket.broadcast.emit('new-user', newUser);
  });

  socket.on('writing', (content) => {
    socket.broadcast.emit('writing', content);
  });

  socket.on('get-users-list', () => {
    filteredList = users.filter(({ id }) => id !== ID);
    io.to(ID).emit('update-users-list', filteredList);
  });

  socket.on('disconnect', () => {
    let index = users.findIndex(({ id }) => id === ID);
    let person = users.splice(index, 1);
    socket.broadcast.emit('remove-user', ...person);
  });

});

server.listen(PORT, () => {
  console.log(`Listening at port ${PORT}`);
});
