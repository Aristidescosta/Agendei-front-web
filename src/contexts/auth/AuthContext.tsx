import React, { createContext } from "react";
import { User } from "../../types/User";

export type AuthContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  signin: (email: string, password: string) => Promise<boolean>;
  signup: (
    username: string,
    email: string,
    password: string
  ) => Promise<JSX.Element | boolean>;
  signout: () => void;
  getEstablishment: (id: number) => Promise<boolean>;
  getCategory: () => void;
  setEstablishment: (formData: FormData) => Promise<boolean>;
};

export const AuthContext = createContext<AuthContextType>(null!);
