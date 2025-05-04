"use client";

import React, { useContext, useEffect, useState } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { onAuthStateChanged } from "firebase/auth";
import { AuthContext } from "./_context/AuthContext";
import { auth } from "@/configs/firebaseConfig";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

const ClientSideProvider = ({ children }) => {
  const [user, setUser] = useState();
  const CreateUser = useMutation(api.users.CreateNewUser);

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, async(user) => {
      // console.log(user);
      setUser(user);

      const result = await CreateUser({
        name:user?.displayName,
        email:user?.email,
        pictureURL:user?.photoURL
      })
      console.log(result);
    });
    return () => unSubscribe();
  }, []);

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
