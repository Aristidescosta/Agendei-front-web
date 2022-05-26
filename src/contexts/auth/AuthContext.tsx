import React, { createContext } from "react";
import { User} from "../../types/User";
import { AxiosResponse } from "axios";
import { Establishment } from "../../types/Establishment";


export type AuthContextType = {
  text: boolean | undefined;
  user: User | null;
  establishment: Establishment | undefined;
  setText: React.Dispatch<React.SetStateAction<boolean | undefined>>;
  setEst: React.Dispatch<React.SetStateAction<Establishment | undefined>>;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;  
  signUp: (username: string, email: string, password: string)=> Promise<void>
  confirmCode: (email: string, confirmationCode: string) => Promise<void> 
  reConfirmCode: (email: string, confirmationCodeReset: string) => Promise<void>
  confirmCodeReset: (email: string) => Promise<void> 
  resetPassword: (email: string, newPassword: string) => Promise<void>
  login: (email: string, password: string) => Promise<void>
  verifyEmail: (email: string) => Promise<void>
  getEstablishment: (userId: string) => Promise<Array<object> | void>
  getCategory: () => Promise<Array<object> | any>
  setEstablishment: (formData: FormData) => Promise<AxiosResponse<any, any>>
  getOneEstablishment: (id: string) => Promise<void>
  deleteEstablishment: (id: string) => Promise<boolean>
  setImages: (images: Array<object>, id: string) => Promise<void>
  openOrCloseEstablishment: (id: string, open: boolean) => Promise<void>
  getServices: (id: string) => Promise<Array<object> | void>
}; 

export const AuthContext = createContext<AuthContextType>(null!);
