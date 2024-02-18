import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import im1 from "../../img/google-signin-button.png";
import { auth } from "../firebase/firebase.jsx";
import { useAuthState } from "react-firebase-hooks/auth";
import { GoogleAuthProvider, signInWithRedirect } from "firebase/auth";
// import style from './NavBarModule.css'

export default function NavBar() {
  const [user] = useAuthState(auth);
  let navigate = useNavigate();

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithRedirect(auth, provider);
    navigate("/dashboard");
  };
  const signOut = () => {
    auth.signOut();
    navigate("/login");
  };

  return (
    <>

 
      <nav className="navbar navbar-expand-lg  bg-body-secondary  p-3 position-fixed w-100 ">
        
        <div className="container">
          <Link className="navbar-brand fw-bold" to="/">
            Chat Application
          </Link>
          <button
            className="navbar-toggler "
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 px-5">
              {/*  profile link */}
              {user && (
                <li className="nav-item px-2">
                  <Link className="nav-link fw-bold" to="/profile">
                    Profile
                  </Link>
                </li>
              )}

              {/* dashboard link */}
              {user && (
                <li className="nav-item px-2">
                  <Link className="nav-link fw-bold" to="/dashboard">
                    Dashboard
                  </Link>
                </li>
              )}

               {/* user's name */}
               {user && (
                <li className="nav-item px-2">
                  <span className="nav-link fw-bold display">{user.displayName}</span>
                </li>
              )}
            </ul>
            {user ? (
              <button
                onClick={signOut}
                className="btn btn-danger text-center "
                type="button"
              >
                <span style={{ whiteSpace: "nowrap" }}>Sign Out</span>
              </button>
            ) : (
              ""
            )}
            
              
          </div>
          
        </div>
        
      </nav>
    </>
  );
}
