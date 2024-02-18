import React, { useState } from "react";
import { Navigate, Link } from "react-router-dom";
import { auth, googleProvider, facebookProvider } from "../firebaseConfig";
import im3 from "../../img/google.png";
import im4 from "../../img/facebook.png";
import im2 from "../../img/chat-app-logo-design-template-can-be-used-icon-chat-application-logo_605910-1724.avif";
import Joi from "joi";
import { Helmet } from "react-helmet";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  ///////////////////validation//////////////////////////

  const schema = Joi.object({
    email: Joi.string()
      .email({ tlds: { allow: ["com", "net"] } })
      .required(),
    password: Joi.string().pattern(/^[A-Z][a-z]{3,6}/),
  });

  const validate = () => {
    const { error } = schema.validate(
      { email, password },
      { abortEarly: false }
    );
    if (error) {
      error.details.forEach((err) => {
        if (err.path[0] === "email") {
          setEmailError(err.message);
        }
        if (err.path[0] === "password") {
          setPasswordError(err.message);
        }
      });
      return false;
    }
    setEmailError("");
    setPasswordError("");
    return true;
  };

  ///////////////////Signed in with email//////////////////////////

  const handleEmailLogin = () => {
    if (!validate()) return;

    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("User logged in:", user);
        setLoggedIn(true);
      })
      .catch((error) => {
        if (error.code === "auth/user-not-found") {
          setEmailError("Email does not exist");
        } else {
          console.error("Error logging in with email/password:", error);
          alert("Email does not exist");
        }
      });
  };
  ///////////////////Signed in with google//////////////////////////
  const handleGoogleLogin = () => {
    // if (!validate()) return;

    auth
      .signInWithPopup(googleProvider)
      .then((result) => {
        const user = result.user;
        console.log("Google sign in:", user);
        setLoggedIn(true);
      })
      .catch((error) => {
        console.error("Error signing in with Google:", error);
      });
  };
  /////////////////// Signed in with facebook//////////////////////////

  const handleFacebookLogin = () => {
    // if (!validate()) return;

    auth
      .signInWithPopup(facebookProvider)
      .then((result) => {
        const user = result.user;
        console.log("Facebook sign in:", user);
        setLoggedIn(true);
      })

      .catch((error) => {
        console.error("Error signing in with Facebook:", error);
      });
  };

  if (loggedIn) {
    return <Navigate to="/dashboard" />;
  }
  ///////////////////////forgot pass///////////////
  function forgot() {
    alert("please register again");
  }
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Login Page</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <div className="container-fluid pt-5  ">
        <div className="row pt-5">
          <div className="col-md-6 box-1 p-0 bg-register-image2 "></div>
          <div className="col-md-6 box-1 pb-5 contact-title2">
            <div className=" p-4 text-center">
              <h1>Log in to Chat App</h1>
            </div>
            <input
              type="email"
              value={email}
              className="form-control my-3 my-input"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
            {emailError && (
              <div className="error-message alert alert-danger">
                {emailError}
              </div>
            )}

            <input
              type="password"
              value={password}
              className="form-control my-3 my-input"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
            {passwordError && (
              <div className="error-message alert alert-danger">
                {passwordError}
              </div>
            )}

            <button className="btn btn-info w-100" onClick={handleEmailLogin}>
              Login with Email
            </button>

            <div className="orwith mt-3 ">
              <span>or login with:</span>
            </div>
            <button className="sign-in border-0 ">
              <img
                onClick={handleGoogleLogin}
                src={im3}
                alt="sign in with google"
                type="button"
              />
            </button>
            <span className="p-2 or">Or</span>

            <button className="sign-in border-0 ">
              <img
                onClick={handleFacebookLogin}
                src={im4}
                alt="sign in with facebook"
                type="button"
              />
            </button>
            <hr className="mt-4" />

            <div className="member mt-4 pt-2 text-center">
              <h5 className="text-center member" onClick={forgot}>
                Forgot Password?
              </h5>
              <p>
                Not a member yet?
                <Link className="log member" to="/">
                  Create Account
                  <i className=" p-0 m-0 fa-solid fa-angle-right "></i>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
