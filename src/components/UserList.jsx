import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import usersData from '../data/users.json';
import { formatTime } from '../utils/dateFormat';
import './UserList.css';

export default function UserList() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setUsers(usersData);
  }, []);

  // Get last message for user from localStorage
  const getLastMessageTime = (userId) => {
    const messages = JSON.parse(localStorage.getItem(`messages_${userId}`)) || [];
    if (messages.length === 0) return null;
    const last = messages[messages.length - 1];
    return formatTime(last.time);
  };

  return (
    <div className="user-list">
      <h1 className="app-title">WhatsApp – Disney World</h1>
      <h6 className="app-title-made">Made by Shahar.B.E</h6>
      <ul>
        {users.map(user => (
          <li key={user.id} onClick={() => navigate(`/chat/${user.id}`)}>
            <img src={user.avatar} alt={user.name} />
            <div className="user-info">
              <div className="name">{user.name}</div>
              <div className="last-message-time">
                {getLastMessageTime(user.id) || 'No messages'}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
