import { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import users from '../data/users.json';
import { formatTime } from '../utils/dateFormat';
import './ChatScreen.css';


const fakeReplies = [
  "Did you hear Pinocchio lied again? His nose crashed into the castle! 😱",
  "Mufasa is alive and living in Florida... Simba is shook 🦁🌴",
  "Apparently, Elsa got sunburned. ❄️🔥",
  "Moana can't swim. Like, seriously. Someone call Maui! 🌊🚫",
  "Ariel traded her voice for unlimited Wi-Fi. 🧜‍♀️📶",
  "Belle joined a book club... and kicked out the Beast. 📚💔",
  "Goofy tried to drive again. Main Street is closed till further notice. 🚧🤦‍♂️",
  "Did you see what Cinderella wore to brunch? Glass sneakers, again?! 👠🥂",
  "Genie accidentally turned himself into a waffle. 🧞‍♂️🧇",
  "Donald lost his temper... again. Duck rage is real. 🦆😤",
  "Snow White blocked Grumpy on WhatsApp. ❄️🚫",
  "Buzz Lightyear got stuck in airplane mode. 🚀📴",
  "Tinker Bell sneezed glitter on everyone in Fantasyland ✨🤧",
  "Stitch hacked into Mickey's Instagram. It’s chaos. 🐾📱",
  "Peter Pan applied for a job… turns out you need ID to work. 😂"
];


export default function ChatScreen() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const bottomRef = useRef();

  useEffect(() => {
    const selected = users.find(u => u.id === parseInt(userId));
    setUser(selected);

    const saved = JSON.parse(localStorage.getItem(`messages_${userId}`)) || [];
    setMessages(saved);
  }, [userId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (input.trim() === '') return;

    const newMessages = [...messages, { from: 'me', text: input, time: new Date().toISOString() }];
    setMessages(newMessages);
    localStorage.setItem(`messages_${userId}`, JSON.stringify(newMessages));
    setInput('');

    setTimeout(() => {
      const reply = fakeReplies[Math.floor(Math.random() * fakeReplies.length)];
      const updated = [...newMessages, { from: 'them', text: reply, time: new Date().toISOString() }];
      setMessages(updated);
      localStorage.setItem(`messages_${userId}`, JSON.stringify(updated));
    }, 1000);
  };

  const handleKeyUp = (e) => {
    if (e.key === 'Enter') handleSend();
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div className="chat-screen">
      <div className="chat-header">
        <button className="back-button" onClick={() => navigate('/')}>← Back</button>
        <img src={user.avatar} alt={user.name} />
        <span className="user-name">{user.name}</span>
      </div>

      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.from === 'me' ? 'me' : 'them'}`}>
            <div className="text">{msg.text}</div>
            <div className="time">{formatTime(msg.time)}</div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <div className="chat-input">
        <input
          type="text"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyUp={handleKeyUp}
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}