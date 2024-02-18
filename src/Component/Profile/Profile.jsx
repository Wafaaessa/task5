

import React, { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db,storage } from "../firebaseConfig";
import { Helmet } from "react-helmet";
import { SyncLoader } from "react-spinners"; 

export default function Profile() {
  const [user] = useAuthState(auth);
  const [userData, setUserData] = useState(null);
  const [photoURL, setPhotoURL] = useState(null); 
  const [loading, setLoading] = useState(true); 


  useEffect(() => {
    if (user) {
      const getUserData = async () => {
        try {
          const userRef = db.collection('users').doc(user.uid);
          const userData = await userRef.get();
          if (userData.exists) {
            setUserData(userData.data());
            console.log('User data:', userData.data()); 
            const photoURL = userData.data().photoURL;
            setPhotoURL(photoURL); 
            console.log('Photo URL:', photoURL); 
          } else {
            console.log('No such document!');
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
        finally {
          setLoading(false); 
        }
      };
      getUserData();
    }
  }, [user]);
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
        <title>Profile Page</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>

      <div className="bg-register-image"style={{ minHeight: '100vh' }}>

      <div className="container pt-5 ">
        <div className="row">
          <div className="col-md-12 mt-5 text-center  contact-title4 ">
            <h1 className=""> Profile</h1>
            <hr />
            <div className="details text-center">
              <div className="container">
                <div className="col-md-12">
                {console.log("Photo URL:", userData?.photoURL)}
          {photoURL && <img src={photoURL} alt="Profile" className=" rounded-circle images " />} {/* Display the profile photo */}

                  <p className="fs-1 fw-bolder name"> {userData?.name}</p>
                 
               
                </div>
              </div>

              <div className="col-md-12">
             <p className=" h5 ">  <span> <i className="fa-solid fa-envelope green px-2 "></i> </span>{userData?.email}</p>
               <p> <span> <i className="fa-solid fa-phone green px-2"></i> </span> {userData?.phone}</p>

              </div>
            </div>
          </div>
        </div>
      </div>
      </div>

    </>
  );
}

