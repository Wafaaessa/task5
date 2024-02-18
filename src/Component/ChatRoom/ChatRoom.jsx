// import React, { useState, useEffect } from 'react';
// import { db } from '../firebase/firebase'; 
// import { collection, addDoc } from 'firebase/firestore';

// function ChatRoom() {
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState('');

//   useEffect(() => {
//     const unsubscribe = db.collection('messages').onSnapshot(snapshot => {
//       const messagesData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//       setMessages(messagesData);
//     });

//     return () => unsubscribe();
//   }, []);

//   const handleSendMessage = async () => {
//     try {
//       const messageRef = collection(db, 'messages'); 
//       await addDoc(messageRef, { text: newMessage }); 
//       setNewMessage('');
//     } catch (error) {
//       console.error('Error sending message:', error);
//     }
//   };
  

//   return (
//     <>
//       <h1>Chat Room</h1>
//       <div className="messages">
//         {messages.map(message => (
//           <div key={message.id}>{message.text}</div>
//         ))}
//       </div>
//       <input
//         type="text"
//         value={newMessage}
//         onChange={e => setNewMessage(e.target.value)}
//       />
//       <button onClick={handleSendMessage}>Send</button>
//     </>
//   );
// }

// export default ChatRoom;
