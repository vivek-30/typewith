import io from 'socket.io-client';
const URL = 'https://type-with.onrender.com';
export const socket = io(URL);
