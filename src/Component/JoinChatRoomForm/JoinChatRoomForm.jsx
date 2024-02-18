import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { db } from "../firebaseConfig";
import { SyncLoader } from "react-spinners";

export default function JoinChatRoomForm() {
  const [roomName, setRoomName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [wrongPasswordAttempts, setWrongPasswordAttempts] = useState(0);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const handleRoomNameChange = (event) => {
    setRoomName(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validation
    if (!roomName.trim()) {
      setError("Room name cannot be empty");
      return;
    }

    // Check if room exists
    const roomRef = db.collection("rooms").doc(roomName);
    const doc = await roomRef.get();
    if (!doc.exists) {
      setError("Room does not exist");
      return;
    }

    // Check if password is correct
    const roomData = doc.data();
    if (roomData.password !== password) {
      setWrongPasswordAttempts(wrongPasswordAttempts + 1);
      if (wrongPasswordAttempts >= 4) {
        setError("You have been banned for life");
        return;
      }
      setError("Incorrect password");
      return;
    }

    // Proceed to chatbox page
    navigate("/chatbox");
  };
  //load
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);
  //load
  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "100vh" }}
      >
        <SyncLoader color={"#36D7B7"} loading={loading} size={15} />
      </div>
    );
  }
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>JoinChatRoom Page</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>

      <div className="bg-register-image" style={{ minHeight: "100vh" }}>
        <div className="container pt-5 ">
          <div className="row justify-content-center mt-5 pt-5">
            <div className="col-md-6  mt-5 p-4   border  rounded-3 contain-join">
              <h2 className="text-center title">Join Chat Room</h2>
              {error && (
                <p className="error text-center text-danger ">{error}</p>
              )}
              <form onSubmit={handleSubmit} className="form-group">
                <div className="row mb-3">
                  <div className="col-md-3 my-3">
                    <label htmlFor="roomName" className="fw-bolder ">
                      Room Name:
                    </label>
                  </div>
                  <div className="col-md-9">
                    <input
                      type="text"
                      id="roomName"
                      value={roomName}
                      onChange={handleRoomNameChange}
                      className="form-control my-3"
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-3 my-3">
                    <label htmlFor="password" className="fw-bolder  ">
                      Password:
                    </label>
                  </div>
                  <div className="col-md-9">
                    <input
                      type="password"
                      id="password"
                      value={password}
                      onChange={handlePasswordChange}
                      className="form-control my-3"
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-3 offset-md-5">
                    <button type="submit" className="btn btn-info">
                      Join Room
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
