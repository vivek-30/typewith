const app = require('express')();
const server = require('http').createServer(app);
const socket = require('socket.io');
const cors = require('cors');

const PORT = process.env.PORT || 5000;

app.use(cors(
    {
        origin: 'http://127.0.0.1:3000'
    }
));

const io = socket(server, {
    cors: {
        origin: 'http://127.0.0.1:3000',
        methods: [ 'GET', 'POST' ]
    }
});


server.listen(PORT, () => {
    console.log(`Listening at port ${PORT}`);
});
