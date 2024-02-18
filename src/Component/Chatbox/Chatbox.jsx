import { useEffect, useRef, useState } from "react";
import {
  query,
  collection,
  orderBy,
  onSnapshot,
  limit,
} from "firebase/firestore";
import { db } from "../firebase/firebase.jsx";
import Message from "../Message/Message";
import SendMessage from "../SendMessage/SendMessage";
// import style from './ChatboxModule.css'
import {Helmet} from "react-helmet";

export default function Chatbox() {

  const [messages, setMessages] = useState([]);
  const scroll = useRef();
  
  useEffect(() => {
    const q = query( 
      collection(db, "messages"),
      orderBy("createdAt", "desc"),
      limit(50)
    );

    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      const fetchedMessages = [];
      QuerySnapshot.forEach((doc) => {
        fetchedMessages.push({ ...doc.data(), id: doc.id });
      });
      const sortedMessages = fetchedMessages.sort(
        (a, b) => a.createdAt - b.createdAt
      );
      setMessages(sortedMessages);
    });
    return () => unsubscribe;
  }, []);

  return (
    <>

<Helmet>
<meta charSet="utf-8" />
<title>Chatbox Page</title>
<link rel="canonical" href="http://mysite.com/example" />
</Helmet>  
     <main className="chat-box ">
      
      <div className="messages-wrapper ">
        {messages?.map((message) => (
          <Message key={message.id} message={message} />
        ))}
      </div>
      
      <span ref={scroll}></span>
      <SendMessage scroll={scroll} />
    </main>
    
    
    </>
  )
}
