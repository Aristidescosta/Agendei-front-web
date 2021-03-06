import React, { createContext } from "react";
import { User} from "../../types/User";
import { AxiosResponse } from "axios";
import { Establishment } from "../../types/Establishment";
import { Service } from "../../types/Service";
import { Appointment } from "../../types/Appointment";

export type AuthContextType = {
  text: boolean | undefined;
  showAlert: boolean;
  user: User | null;
  establishment: Establishment | undefined;
  appointment: Appointment | undefined;
  service: Service | undefined;
  setText: React.Dispatch<React.SetStateAction<boolean | undefined>>;
  setShowAlert: React.Dispatch<React.SetStateAction<boolean>>;
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
  getOneEstablishment: (id: string) => Promise<Array<object> | any>
  deleteEstablishment: (id: string) => Promise<boolean>
  openOrCloseEstablishment: (id: string, open: boolean) => Promise<void>
  getServices: (id: string) => Promise<Array<object> | void>
  getService: (id: string) => Promise<object>
  setServices: (name: string, preco: string, hours: Array<string>, est: object) => Promise<boolean>
  deletedService: (id: string) => Promise<boolean>
  getAppointments: (id: string) => Promise<Array<object> | void>
}; 

export const AuthContext = createContext<AuthContextType>(null!);
