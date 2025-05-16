"use client";

import { auth } from "@/configs/firebaseConfig";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import React from "react";
import { toast } from "sonner";


const Authentication = ({ children }) => {
  const provider = new GoogleAuthProvider();

  const onSignInClick = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...
        // console.log(user);

        toast.success("Signed in successfully!");
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        toast.error("Network error. Please try again.");
        // ...
      });
  };
  return <div onClick={onSignInClick}>{children}</div>;
};

export default Authentication;
