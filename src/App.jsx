// src/App.jsx
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserList from './components/UserList';
import ChatScreen from './components/ChatScreen';
import { useEffect } from 'react';
import sampleMessages from './data/sample_messages.js';

export default function App() {
  useEffect(() => {
    Object.entries(sampleMessages).forEach(([userId, messages]) => {
      const key = `messages_${userId}`;
      const alreadyExists = localStorage.getItem(key);
      if (!alreadyExists) {
        localStorage.setItem(key, JSON.stringify(messages));
      }
    });
  }, []);

  return (
    <div className="container">
      <Router>
        <Routes>
          <Route path="/" element={<UserList />} />
          <Route path="/chat/:userId" element={<ChatScreen />} />
        </Routes>
      </Router>
    </div>
  );
}
