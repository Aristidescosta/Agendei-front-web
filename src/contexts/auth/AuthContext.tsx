import React, { createContext } from "react";
import { User} from "../../types/User";

export type AuthContextType = {
  user: User | null;
  email: string | undefined;
  setEmail: React.Dispatch<React.SetStateAction<string | undefined>>;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;  
  signUp: (username: string, email: string, password: string)=> Promise<void>
  confirmCode: (email: string, confirmationCode: string) => Promise<boolean> 
  reConfirmCode: (email: string) => Promise<void>
  login: (email: string, password: string) => Promise<void>
  getEstablishment: () => Promise<Array<object> | void>
};

export const AuthContext = createContext<AuthContextType>(null!);
