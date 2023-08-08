import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { UserContext } from './context/UserContext';
// Components.
import Login from './components/Login';
import Register from './components/Register';
import ChatRoom from './components/ChatRoom';
import UserProfile from './components/UserProfile';
import Page404 from './components/Page404';

// Protected-Route.
function ProtectedRoute({ user, route, navigateTo }) {
  return user ? route : <Navigate to={navigateTo} replace={true} />
};

function App() {
  const { user } = useContext(UserContext);
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <ProtectedRoute
            user={user}
            route={<ChatRoom />}
            navigateTo='/login'
          />}
        />
        <Route path="/profile" element={
          <ProtectedRoute
            user={user}
            route={<UserProfile />}
            navigateTo='/login'
          />}
        />
        <Route path="/register" element={
          <ProtectedRoute
            user={!user}
            route={<Register />}
            navigateTo='/'
          />}
        />
        <Route path="/login" element={
          <ProtectedRoute
            user={!user}
            route={<Login />}
            navigateTo='/'
          />}
        />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </Router>
  );
}

export default App;