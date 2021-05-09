import io from 'socket.io-client';
const URL = 'https://type-with.herokuapp.com';
export const socket = io(URL);
