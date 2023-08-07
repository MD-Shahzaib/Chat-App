// // MY-CODE
// import React, { useState } from 'react';
// import io from 'socket.io-client';
// import Chat from './Chat';
// const socket = io.connect("http://localhost:4000")

// const App = () => {

//   const [name, setName] = useState('');
//   const [room, setRoom] = useState('');
//   const [showChat, setShowChat] = useState(false);

//   const handleJoin = () => {
//     if (!name || !room) {
//       return alert('please fill all fields.');
//     };
//     socket.emit("join_room", room);
//     setShowChat(true);
//   };

//   return (
//     <>
//       {!showChat ? (
//         <div className="flex items-center justify-center flex-col gap-4 bg-slate-200 text-gray-800 min-h-screen">
//           <h2 className='text-2xl'>Join A Chat</h2>
//           <input
//             type="text"
//             placeholder='Name'
//             value={name}
//             onChange={(e) => { setName(e.target.value) }}
//             className='bg-black text-white p-4 rounded'
//           />
//           <input
//             type="text"
//             placeholder='Room'
//             value={room}
//             onChange={(e) => { setRoom(e.target.value) }}
//             className='bg-black text-white p-4 rounded'
//           />
//           <button onClick={handleJoin} className='bg-slate-800 text-white p-4 rounded'>JOIN</button>
//         </div>
//       ) : (
//         <Chat
//           socket={socket}
//           userName={name}
//           room={room}
//         />
//       )}
//     </>
//   );
// };

// export default App;





import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import ChatRoom from './components/ChatRoom';
import UserProfile from './components/UserProfile';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ChatRoom />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<UserProfile />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;



/*
- Create components login, chat room, and user profile.
- Implement user authentication and authorization using custom backend.
- Create React components to handle user input, display chat messages, and manage chat room functionality.
- Style the chat application using tailwind CSS.
*/