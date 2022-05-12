import React, { createContext } from "react";
import { User} from "../../types/User";
import { AxiosResponse } from "axios";
import { Establishment } from "../../types/Establishment";


export type AuthContextType = {
  user: User | null;
  email: string | undefined;
  establishment: Establishment | undefined;
  setEst: React.Dispatch<React.SetStateAction<Establishment | undefined>>;
  setEmail: React.Dispatch<React.SetStateAction<string | undefined>>;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;  
  signUp: (username: string, email: string, password: string)=> Promise<void>
  confirmCode: (email: string, confirmationCode: string) => Promise<boolean> 
  reConfirmCode: (email: string) => Promise<void>
  login: (email: string, password: string) => Promise<void>
  getEstablishment: (userId: string) => Promise<Array<object> | void>
  getCategory: () => Promise<Array<object> | any>
  setEstablishment: (formData: FormData) => Promise<AxiosResponse<any, any>>
  getOneEstablishment: (id: string) => Promise<void>
}; 

export const AuthContext = createContext<AuthContextType>(null!);
