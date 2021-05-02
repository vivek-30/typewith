const app = require('express')();
const server = require('http').createServer(app);
const socket = require('socket.io');
const cors = require('cors');

const PORT = process.env.PORT || 5000;

app.use(cors(
  {
    origin: 'http://localhost:3000'
  }
));

const io = socket(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
});

io.on('connection', (socket) => {

  socket.on('writing', (content) => {
    socket.broadcast.emit('writing', content);
  });

});

server.listen(PORT, () => {
  console.log(`Listening at port ${PORT}`);
});
