"use client";

import React, { useContext, useEffect, useState } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { onAuthStateChanged } from "firebase/auth";
import { AuthContext } from "./_context/AuthContext";
import { auth } from "@/configs/firebaseConfig";

const ClientSideProvider = ({ children }) => {
  const [user, setUser] = useState();

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (user) => {
      // console.log(user);
      setUser(user);
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
