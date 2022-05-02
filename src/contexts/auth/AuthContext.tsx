import React, { createContext } from "react";
import { User} from "../../types/User";
import { Email } from "../../types/Email"
import { AxiosResponse } from "axios";

export type AuthContextType = {
  user: User | null;
  email: Email | string | undefined;
  setEmail: React.Dispatch<React.SetStateAction<Email | string | undefined>>;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  signin: (email: string, password: string) => Promise<boolean>;
  signup: (
    username: string,
    email: string,
    password: string
  ) => Promise<void | boolean>;
  signout: () => void;
  getEstablishment: (id: number) => Promise<boolean>;
  getCategory: () => void;
  confirmCode: (email: string, code: number) => Promise<AxiosResponse | undefined>;
  setEstablishment: (formData: FormData) => Promise<boolean>;
};

export const AuthContext = createContext<AuthContextType>(null!);
