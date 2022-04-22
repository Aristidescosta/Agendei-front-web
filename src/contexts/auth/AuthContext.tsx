import { createContext } from "react";
import { User } from "../../types/User";

export type AuthContextType = {
  user: User | null;
  signin: (email: string, password: string) => Promise<boolean>;
  signup: (
    username: string,
    email: string,
    password: string
  ) => Promise<JSX.Element | boolean>;
  signout: () => void;
  getEstablishment: (id: number) => Promise<boolean>;
  getCategory: () => void;
  setEstablishment: (
    name: string,
    nif: string,
    categoryId: string,
    userId: string,
    address: object,
    phone_number: number,
    open_to: object
  ) => Promise<boolean>;
};

export const AuthContext = createContext<AuthContextType>(null!);
