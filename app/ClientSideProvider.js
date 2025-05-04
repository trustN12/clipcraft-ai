"use client";

import React, { useContext, useEffect, useState } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { onAuthStateChanged } from "firebase/auth";
import { AuthContext } from "./_context/AuthContext";
import { auth } from "@/configs/firebaseConfig";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

const ClientSideProvider = ({ children }) => {
  const [user, setUser] = useState(null); // default value is null, since the user could be undefined at first
  const [loading, setLoading] = useState(true); // to manage loading state while waiting for auth state
  const CreateUser = useMutation(api.users.CreateNewUser);

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, async (user) => {
      setLoading(false); // Once the auth state is known, we stop loading

      if (user && user.displayName && user.email && user.photoURL) {
        try {
          const result = await CreateUser({
            name: user.displayName,
            email: user.email,
            pictureURL: user.photoURL
          });
          console.log(result);
        } catch (error) {
          console.error("Error creating user:", error);
        }
      } else if (user === null) {
        console.log("User is logged out or not authenticated.");
      } else {
        console.error("User data is incomplete:", user);
      }
      
      setUser(user); // Update the user state after checking
    });

    return () => unSubscribe(); // Clean up the subscription when the component unmounts
  }, [CreateUser]);

  if (loading) {
    return <div>Loading...</div>; // Show loading state while waiting for Firebase Auth
  }

  return (
    <div>
      <AuthContext.Provider value={{ user }}>
        <NextThemesProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </NextThemesProvider>
      </AuthContext.Provider>
    </div>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  return context;
};

export default ClientSideProvider;

