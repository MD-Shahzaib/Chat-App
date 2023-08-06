// MY-CODE
import React, { useState } from 'react';
import io from 'socket.io-client';
import Chat from './Chat';
const socket = io.connect("http://localhost:4000")

const App = () => {

  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [showChat, setShowChat] = useState(false);

  const handleJoin = () => {
    if (!name || !room) {
      return alert('please fill all fields.');
    };
    socket.emit("join_room", room);
    setShowChat(true);
  };

  return (
    <>
      {!showChat ? (
        <div className="flex items-center justify-center flex-col gap-4 bg-slate-200 text-gray-800 min-h-screen">
          <h2 className='text-2xl'>Join A Chat</h2>
          <input
            type="text"
            placeholder='Name'
            value={name}
            onChange={(e) => { setName(e.target.value) }}
            className='bg-black text-white p-4 rounded'
          />
          <input
            type="text"
            placeholder='Room'
            value={room}
            onChange={(e) => { setRoom(e.target.value) }}
            className='bg-black text-white p-4 rounded'
          />
          <button onClick={handleJoin} className='bg-slate-800 text-white p-4 rounded'>JOIN</button>
        </div>
      ) : (
        <Chat
          socket={socket}
          userName={name}
          room={room}
        />
      )}
    </>
  );
};

export default App;









/*
- Create components login, chat room, and user profile.
- Implement user authentication and authorization.
- manage chat room functionality.



- Set up a React project and install socket.io library for real-time communication.
- Create components for the chat application, such as login, chat room, and user profile.
- Implement user authentication and authorization using a library like Firebase or custom backend.
- Set up a socket server using socket.io on the server-side or utilize a cloud-based socket service.
- Create React components to handle user input, display chat messages, and manage chat room functionality.
- Establish socket connections for real-time messaging between users.
- Style the chat application using CSS or UI libraries like Material-UI or Ant Design.
*/