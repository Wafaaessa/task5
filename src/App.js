

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { auth } from "./Component/firebase/firebase.jsx";
import { useAuthState } from "react-firebase-hooks/auth";

import "./App.css";
import NavBar from './Component/NavBar/NavBar';
import Chatbox from "./Component/Chatbox/Chatbox";
import Register from "./Component/Register/Register"; 
import Login from "./Component/Login/Login";
import Dashboard from "./Component/Dashboard/Dashboard";
import Profile from "./Component/Profile/Profile";
import CreateChatRoomForm from "./Component/CreateChatRoomForm/CreateChatRoomForm";
import JoinChatRoomForm from "./Component/JoinChatRoomForm/JoinChatRoomForm";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
import '@fortawesome/fontawesome-free/css/all.min.css';

export default function App() {
  const [user] = useAuthState(auth);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // If the user is authenticated, store their information in local storage
        localStorage.setItem("user", JSON.stringify(user));
      } else {
        // If the user is not authenticated, remove their information from local storage
        localStorage.removeItem("user");
      }
    });

    return () => unsubscribe(); // Cleanup function
  }, []);

  return (
    <>
      <Router>
        <div className="App">
          <NavBar />
          <Routes>
            {/* Public Routes */}
            {/* <Route path="/" element={<Welcome />} /> */}
            <Route path="/" element={<Register />} />
            <Route path="/login" element={<Login />} />

            {/* Protected Routes */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/createroom" element={<CreateChatRoomForm />} />
            <Route path="/join" element={<JoinChatRoomForm />} />
            <Route path="/chatbox" element={<Chatbox />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}



