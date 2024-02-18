import React, { useState, useEffect } from "react";
import { Link,useNavigate } from 'react-router-dom';
import {Helmet} from "react-helmet";
import { SyncLoader } from "react-spinners"; 

const Dashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true); 
  useEffect(() => {

    const timeout = setTimeout(() => {
      setLoading(false); 
    }, 1000); 
    return () => clearTimeout(timeout);
  }, []); 
  
  // Function to handle logout
  const handleLogout = () => {
    navigate('/login');
  };

  // Function to create a new chat room
  const handleCreateChatRoom = () => {
    navigate('/createroom');

  };

  // Function to join an existing chat room
  const handleJoinChatRoom = () => {
    navigate('/join');

  };
// load//
if (loading) {
  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <SyncLoader color={"#36D7B7"} loading={loading} size={15} /> 
    </div>
  );
}
  return (
    <>

<Helmet>
<meta charSet="utf-8" />
<title>Dashboard Page</title>
<link rel="canonical" href="http://mysite.com/example" />
</Helmet>  
<div className="bg-register-image"style={{ minHeight: '100vh' }}>

    <div className="container pt-5  ">
      <div className="row mt-5 pt-5 justify-content-center">
        <div className="col-md-6 text-center mt-5">
        <div className="dash mt-5 border border-2 p-4 rounded contain-dash contact-title3  ">
    <h1>Welcome to your Dashboard</h1>
      <div>
      </div>

      <div>
      </div>
      <div>
        {/* Button to create a new chat room */}
        <button className="btn btn-info mb-3 mt-3" onClick={handleCreateChatRoom}>
        <i className="fa-solid fa-plus px-1"></i>
          
          Create Chat Room</button>
      </div>
      <div>
        {/* Button to join an existing chat room */}
        <button className="btn btn-info" onClick={handleJoinChatRoom}>
        <i className="fa-solid fa-arrow-right-to-bracket px-2"></i>
          
          Join Chat Room</button>
      </div>
    </div>
        </div>
      </div>
    </div>
    </div>

    
    </>
  );
};

export default Dashboard;
