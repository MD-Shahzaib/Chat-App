import React, { useState } from 'react';
import io from 'socket.io-client';
import Chat from './Chat';

const socket = io.connect("http://localhost:4000")

const App = () => {

  const [showChat, setShowChat] = useState(false);
  const [name, setName] = useState('')
  const [room, setRoom] = useState('')

  const handleJoin = () => {
    if (!name || !room) {
      return alert('please fill all fields.');
    }
    console.log(name, room);
    socket.emit("join_room", room)
    setShowChat(true);
  };

  return (
    <>
      {!showChat ? (
        <div className="flex items-center justify-center flex-col gap-4 bg-slate-200 text-gray-800 min-h-screen">
          <h2 className='text-2xl'>Join A Chat</h2>
          <input type="text" value={name} onChange={(e) => { setName(e.target.value) }} placeholder='Name' className='bg-black text-white p-4 rounded' />
          <input type="text" value={room} onChange={(e) => { setRoom(e.target.value) }} placeholder='Room' className='bg-black text-white p-4 rounded' />
          <button type="button" onClick={handleJoin} className='bg-slate-800 text-white p-4 rounded'>JOIN</button>
        </div>
      ) : (
        <Chat socket={socket} userName={name} room={room} />
      )}
    </>
  );
};

export default App;