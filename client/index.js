const socket = io('', {
    transports: ['websocket'],
  });
  
  // Listen for reconnect event
  socket.io.on('reconnect', () => {
    console.log('Reconnected to the server');
    // Implement any necessary logic for reconnection, such as updating user data
    socket.emit('updateUserData', { user, room }, (error) => {
      if (error) {
        console.error('Error updating user data:', error);
      }
    });
  });
  
  // Emit "sendMessage" event with message
  socket.emit('sendMessage', msg, error => {
    if (error) {
      console.error(error);
    } else {
      // Clear message
      $('#msg').val('');
    }
  });
  
  // Listen for new messages
  socket.on('message', msg => {
    log(msg.user, msg.text);
  });
  
  // Listen for notifications
  socket.on('notification', msg => {
    log(msg.title, msg.description);
  });
  
  // Listen connect event
  socket.on('connect', () => {
    console.log('Connected to the server');
  });
  
  function sendMessage() {
      const messageInput = document.getElementById('message-input');
      const message = messageInput.value.trim();
      if (message !== '') {
          console.log('Sending message to server:', message);
          socket.emit('sendMessage', message);
          messageInput.value = '';
      }
  }
  
  function log(user, text) {
      // Display messages in the chat box
      const chatBox = document.getElementById('chat-box');
      const message = document.createElement('div');
      message.textContent = `${user}: ${text}`;
      chatBox.appendChild(message);
      chatBox.scrollTop = chatBox.scrollHeight;
  }
  