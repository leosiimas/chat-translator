'use client'; 

import { createContext, useContext, useState, ReactNode } from 'react';

import {  User as UserFirebase } from "firebase/auth";
import { db } from "@/lib/firebase";
import { ref, update } from "firebase/database";

type User = {
  user: UserFirebase | null;
  userName?: string;
  userLang?: "pt" | "ko";
};

type UserContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
  updateLanguageUser: (language: string) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const updateLanguageUser = async (language: string) => {
    console.log("here");
    if ((language === "pt" || language === "ko") && user && user.user) {
      setUser({ ...user, userLang: language });

      const userRef = ref(db, `configUser/${user.user?.uid}`);
      await update(userRef, {
        lang: "pt",
      });
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser, updateLanguageUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser deve ser usado dentro de um UserProvider');
  return context;
};
