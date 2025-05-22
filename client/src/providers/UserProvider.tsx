"use client";
import { User } from "lucide-react";
import { createContext, PropsWithChildren, useContext, useState } from "react";

type User = {
  email: string;
  password: string;
};

type UserContextType = {
  user: User;
};

export const UserContext = createContext<UserContextType>(
  {} as UserContextType
);

const UserContextProvider = ({ children }: PropsWithChildren) => {
  const { user, setUser } = useState<User>({ email: "", password: "" });

  return (
    <UserContext.Provider
      value={{
        user,
      }}></UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
