
import React, { useState } from "react";
import { auth, db } from "../firebase/firebase.jsx";
import { addDoc, collection, serverTimestamp} from "firebase/firestore";
import { storage } from '../firebaseConfig'; 
import Picker from 'emoji-picker-react';

const SendMessage = ({ scroll }) => {
  const [message, setMessage] = useState("");
  const [image, setImage] = useState(null); 
  const [chosenEmoji, setChosenEmoji] = useState(null); 
  const [showEmojiPicker, setShowEmojiPicker] = useState(false); 
 

  


  const handleEmojiClick = (emoji) => {
    setMessage(prevMessage => prevMessage + emoji.emoji);

  };

  const toggleEmojiPicker = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const sendMessage = async (event) => {
    event.preventDefault();
    // Check if the message is empty or contains only whitespace
    if (!message.trim() && !chosenEmoji && !image) {
      alert("Enter valid message");
      return;
    }

    const badWords = ["fuck", "shit","damn","ass","bitch","asshole","خرا"];
    // Check if the message contains any prohibited words
    if (badWords.some(word => message.toLowerCase().includes(word))) {
      alert("You used inappropriate language and have been banned for life.");
      return;
    }
////new////
    const currentUser = auth.currentUser;
    if (!currentUser) {
      alert("User not logged in");
      return;
    }

    const { uid, displayName, photoURL } = auth.currentUser;

    let imageUrl = null;
    if (image) {
      const storageRef = storage.ref();
      const imageRef = storageRef.child(image.name);
      await imageRef.put(image);
      imageUrl = await imageRef.getDownloadURL();
    }

    let combinedMessage = message;
    if (chosenEmoji) {
      combinedMessage += chosenEmoji;
    }

    await addDoc(collection(db, "messages"), {
      text: combinedMessage,
      name: displayName,
      avatar: photoURL,
      image: imageUrl,
      createdAt: serverTimestamp(),
      uid,
    });
    setMessage("");
    setImage(null);
    setChosenEmoji(null);

    scroll.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>

    <div className="body-send ">
      
      <form onSubmit={(event) => sendMessage(event)} className="send-message">
        
        <label htmlFor="messageInput" hidden>Enter Message</label>
          <input
            id="messageInput"
            name="messageInput"
            type="text"
            className="form-input__input send"
            placeholder="Type message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          
          <button type="button" className="face " onClick={toggleEmojiPicker}>
            <i className="far fa-grin"></i> 
          </button>
     

            {showEmojiPicker && (
            <div className="emoji-picker-container">
              <Picker onEmojiClick={handleEmojiClick} />
            </div>
          )}


        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          className="file-input "
          style={{ width: "20%" }}

        />

        <button type="submit">Send</button>
        
      </form>

    </div>
    </>
  );
};

export default SendMessage;

