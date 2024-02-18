import React, { useState } from "react";
import { Navigate, Link } from "react-router-dom";
import {
  auth,
  googleProvider,
  facebookProvider,
  db,
  storage,
} from "../firebaseConfig";
import im3 from "../../img/google.png";
import im4 from "../../img/facebook.png";
import im2 from "../../img/chat-app-logo-design-template-can-be-used-icon-chat-application-logo_605910-1724.avif";
import Joi from "joi";
import { Helmet } from "react-helmet";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registered, setRegistered] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [photo, setPhoto] = useState(null); // State to store the selected photo

  const handlePhotoChange = (e) => {
    if (e.target.files[0]) {
      setPhoto(e.target.files[0]);
    }
  };

  //////////////////// validation/////////////////

  const schema = Joi.object({
    email: Joi.string()
      .email({ tlds: { allow: ["com", "net"] } })
      .required(),
    password: Joi.string().pattern(/^[A-Z][a-z]{3,6}/),
    phone: Joi.string()
      .regex(/^\d{11}$/)
      .required(), // Regex for exactly 11 digits
  });

  // Validation function
  const validate = () => {
    const { error } = schema.validate(
      { email, password, phone },
      { abortEarly: false }
    );
    if (error) {
      error.details.forEach((err) => {
        if (err.path[0] === "email") {
          setEmailError(err.message);
        }
        if (err.path[0] === "password") {
          setPasswordError(
            "Password must start with an uppercase letter and be 4-7 characters long, containing only lowercase letters"
          );
        }
        if (err.path[0] === "phone") {
          setPhoneError("Phone must be exactly 11 digits long");
        }
      });
      return false;
    }
    setEmailError("");
    setPasswordError("");
    setPhoneError("");
    return true;
  };

  //////////////////// Signed up with Email/////////////////

  const handleEmailSignUp = () => {
    if (!validate()) return;

    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("User signed up:", user);

        // Update user profile with name and photo URL if available
        user
          .updateProfile({
            displayName: name,
            photoURL: "",
          })
          .then(() => {
            console.log(
              "User display name and avatar URL updated:",
              user.displayName,
              user.photoURL
            );
            setRegistered(true);

            // Upload photo to Firebase Storage if selected
            if (photo) {
              const uploadTask = storage
                .ref(`profilePhotos/${user.uid}`)
                .put(photo);
              uploadTask.on(
                "state_changed",
                (snapshot) => {},
                (error) => {
                  console.error("Error uploading profile photo:", error);
                },
                () => {
                  storage
                    .ref("profilePhotos")
                    .child(user.uid)
                    .getDownloadURL()
                    .then((url) => {
                      // Update user profile with photo URL
                      user
                        .updateProfile({
                          photoURL: url,
                        })
                        .then(() => {
                          console.log(
                            "User avatar URL updated:",
                            user.photoURL
                          );

                          // Store the photo URL in Firestore
                          db.collection("users")
                            .doc(user.uid)
                            .update({
                              photoURL: url,
                            })
                            .then(() => {
                              console.log(
                                "Profile photo URL stored in Firestore"
                              );
                            })
                            .catch((error) => {
                              console.error(
                                "Error storing profile photo URL in Firestore:",
                                error
                              );
                            });

                          setRegistered(true);
                        })
                        .catch((error) => {
                          console.error(
                            "Error updating user avatar URL:",
                            error
                          );
                        });
                    });
                }
              );
            }
          })
          .catch((error) => {
            console.error("Error updating user display name:", error);
          });

        // Save additional user data to Firestore
        const userData = {
          name: name,
          email: email,
          phone: phone,
        };

        db.collection("users").doc(user.uid).set(userData);
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          setEmailError("Email is already in use");
        } else {
          console.error("Error signing up with email/password:", error);
        }
      });
  };

  /////////////////// Signed up with google/////////////////

  const handleGoogleSignUp = () => {
    auth
      .signInWithPopup(googleProvider)
      .then((result) => {
        // Signed up
        const user = result.user;
        console.log("Google sign up:", user);

        // Store user data in Firestore
        const userData = {
          name: user.displayName,
          email: user.email,
          phone: "",
          photoURL: user.photoURL,
        };

        db.collection("users")
          .doc(user.uid)
          .set(userData)
          .then(() => {
            console.log("User data stored in Firestore");
            setRegistered(true);
          })
          .catch((error) => {
            console.error("Error storing user data in Firestore:", error);
          });
      })
      .catch((error) => {
        console.error("Error signing up with Google:", error);
      });
  };

  /////////// Signed up with Facebook/////////////////

  const handleFacebookSignUp = () => {
    auth
      .signInWithPopup(facebookProvider)
      .then((result) => {
        // Signed up
        const user = result.user;
        console.log("Facebook sign up:", user);

        // Store user data in Firestore
        const userData = {
          name: user.displayName,
          email: user.email,
          phone: "",
          photoURL: user.photoURL,
        };

        db.collection("users")
          .doc(user.uid)
          .set(userData)
          .then(() => {
            console.log("User data stored in Firestore");
            setRegistered(true);
          })
          .catch((error) => {
            console.error("Error storing user data in Firestore:", error);
          });
      })
      .catch((error) => {
        console.error("Error signing up with Facebook:", error);
      });
  };

  if (registered) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Register Page</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <div className="container-fluid pt-5  ">
        <div className="row pt-5">
          <div className="col-md-6 box-1 ">
            <img src={im2} alt="chat logo" className="w-100 rounded-4" />
          </div>

          <div className="col-md-6  box-1 pb-5 contact-title2">
            <div className=" p-4 text-center">
              <h1>Create My Account!</h1>
            </div>

            <div className="form-group row d-flex">
              <div className="col-sm-12 mb-3 mb-sm-0 ">
                <input
                  type="text"
                  value={name}
                  className="form-control my-3"
                  onChange={(e) => setName(e.target.value)}
                  placeholder=" Name"
                />
                <input
                  type="tel"
                  value={phone}
                  className="form-control my-3"
                  onChange={(e) =>
                    setPhone(e.target.value.replace(/\D/, "").slice(0, 11))
                  }
                  placeholder="Phone"
                />

                {phoneError && (
                  <div className="error-message alert alert-danger">
                    {phoneError}
                  </div>
                )}

                <input
                  type="email"
                  value={email}
                  className="form-control my-3"
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                />
                {emailError && (
                  <div className="error-message alert alert-danger">
                    {emailError}
                  </div>
                )}
              </div>
            </div>
            <input
              type="password"
              value={password}
              className="form-control my-3"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />

            {passwordError && (
              <div className="error-message alert alert-danger">
                {passwordError}
              </div>
            )}
            <div className="form-group row d-flex align-items-center">
              <label htmlFor="" className="col-sm-3 col-form-label ">
                Upload your photo:
              </label>
              <div className="col-sm-5">
                <input
                  type="file"
                  onChange={handlePhotoChange}
                  className="form-control my-3"
                />
              </div>
            </div>

            <button className="btn btn-info w-100" onClick={handleEmailSignUp}>
              Sign Up with Email
            </button>

            <div className="orwith mt-3">
              <span>or Sign Up with:</span>
            </div>

            <button className="sign-in border-0 bg-white ">
              <img
                onClick={handleGoogleSignUp}
                src={im3}
                alt="sign Up with google"
                type="button"
              />
            </button>
            <span className="or p-2">Or</span>
            <button className="sign-in border-0  bg-white">
              <img
                onClick={handleFacebookSignUp}
                src={im4}
                alt="sign Up with facebook"
                type="button"
              />
            </button>
            <hr className="mt-4" />
            <div className="member  mt-2 ">
              <p className="text-center member">
                Already a member?
                <Link href="#" className="log member" to="/login">
                  Log In
                  <i className=" p-0 m-0 fa-solid fa-angle-right"></i>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
