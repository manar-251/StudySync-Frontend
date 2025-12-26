import { useState, useEffect } from 'react';
import { Routes, Route, Navigate  } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import Landing from './components/Landing/Landing';
import Dashboard from './components/Dashboard/Dashboard';
import SignupForm from './components/SignupForm/SignupForm';
import SigninForm from './components/SigninForm/SigninForm';
import Tasks from './components/Tasks/Tasks';
import * as authService from '../src/services/authService';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Profile from './components/Profile/Profile';
import StudySessions from "./components/StudySessions/StudySessions";

const App = () => {
const [user, setUser] = useState({ username: "test", _id: "temp" });


  const handleSignout = () => {
    authService.signout();
    setUser(null);
  };



  return (
    <>
      <NavBar user={user} handleSignout={handleSignout} />
      <Routes>
        <Route path="/" element={user ? <Navigate to="/dashboard" replace /> : <Landing />} />
        <Route path="/signup" element={<SignupForm setUser={setUser} />} />
        <Route path="/signin" element={<SigninForm setUser={setUser} />} />
        
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute user={user}>
              <Dashboard user={user} />
            </ProtectedRoute>
          }
        />
          <Route
          path="/profile"
          element={
            <ProtectedRoute user={user}>
              <Profile />
            </ProtectedRoute>
          }
        />
          <Route
         path="/tasks"
         element={
          <ProtectedRoute user={user}>
           <Tasks />
          </ProtectedRoute>
           }        
        />
         <Route 
         path="/studySessions"
          element={<StudySessions />} 
        />

        <Route
          path="/wellness"
          element={
            <ProtectedRoute user={user}>
              <Wellness />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
};

export default App;