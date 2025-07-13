'use client'; 

import { createContext, useContext, useState, ReactNode } from 'react';

import {  User as UserFirebase } from "firebase/auth";

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

    if ((language === 'pt' || language === 'ko') && user) {
      setUser({ ...user, userLang: language });

    }


  };

  return (
    <UserContext.Provider value={{ user, setUser, updateLanguageUser  }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser deve ser usado dentro de um UserProvider');
  return context;
};
