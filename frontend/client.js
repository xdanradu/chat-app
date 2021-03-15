function connectThroughWebSocket(token) {
  let socket = io.connect(`localhost:8002?token=${token}`);

  try {
    socket.on('connect', () => {
      document.getElementById('client-id').innerHTML = 'Websocket id: ' + socket.id;
    });

    socket.on('message-from-server', (data) => {
      let messages = document.getElementsByClassName('messages')[0];
      let p = document.createElement('p');
      p.innerHTML = '<b>'+data.email + '</b> ' + data.message;
      messages.appendChild(p);
    });
  } catch (err) {
    alert('ERROR: socket.io encountered a problem:\n\n' + err);
  }

  document.getElementById('send').addEventListener('click', sendMessage);
  function sendMessage() {
    let message = document.getElementById('message').value;
    socket.emit('chat', message);
  }
};

document.getElementById('login').addEventListener('click', login);
async function login() {
  let email = document.getElementById('email').value;
  let password = document.getElementById('password').value;

  let token = null;
  await axios.post('http://localhost:8080/auth/login', {username: email, password: password}).then(response => {
    if (response.data.token !== undefined) {
      token = response.data.token;
      connectThroughWebSocket(response.data.token);
    }
  });

  axios.get('http://localhost:8080/auth/me', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }).then(response => {
    console.log(response.data);
    document.getElementById('user-name').innerHTML = `Connected as: ${response.data.firstName}  ${response.data.lastName}`;
  });

}
