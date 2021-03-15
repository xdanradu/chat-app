const io = require('socket.io');
const axios = require('axios');

const server = io.listen(8002);
console.log('Server socket is listening on port 8002');
let connectedClients = new Map();

function getToken(socket) {
  let url = new URL(socket.handshake.headers.host + socket.handshake.url);
  const token = url.searchParams.get("token");
  return token;
};

// event fired every time a new client connects
server.on('connection', (socket) => {
  console.info(`Client connected [id=${socket.id}]`);
  connectedClients.set(socket.id, socket);
  console.log(connectedClients.size + ' client/s connected');
  //console.log(getToken(socket));

  // when socket disconnects, remove it from the map
  socket.on('disconnect', () => {
    connectedClients.delete(socket.id);
    console.info(`Client [id=${socket.id}] disconnected`);
    console.log(connectedClients.size + ' client/s connected');
  });

  socket.on('chat', payload => {
    // console.log(payload);
    sendMessageToAllClients(socket, payload);
  });
});

async function sendMessageToAllClients(senderSocket, message) {
  let user = await getUser(getToken(senderSocket));
  console.log(`Sender socket id: ${senderSocket.id}`);
  console.log('Save to DB the message sent from ' + user.email);
  console.log(senderSocket.id);

  for (let [key, socket] of connectedClients) {

    socket.emit('message-from-server', { email: user.email, message: `Socket id: ${senderSocket.id} ${message}` });
  }
}

async function getUser(token) {
  let user = {};
  await axios.get('http://localhost:8080/auth/me', {
    headers: {
      'Authorization': `Bearer ${token}`
      }
    }).then(response => {
      user = response.data;
  });
  return user;

}
