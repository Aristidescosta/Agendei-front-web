import { AuthContext } from "./AuthContext";
import { useState, useEffect} from "react";
import { User } from "../../types/User";
import { useApi } from "../../hooks/useApi";

export const AuthProvider = ({ children }: { children: JSX.Element }) => {
  const [user, setUser] = useState<User | null>(null);
  const api = useApi();

  useEffect(() => {
    const validateToken = async () =>{
      const storageDate = localStorage.getItem("authToken");
      if(storageDate){
        const data = await api.validateToken(storageDate);
        if(data.user){
          setUser(data.user);
        }
      }
    }
    validateToken();
  }, []);

  const signin = async (email: string, password: string) => {
    const data = await api.signin(email, password);
    if (data.data.data) {
      setUser(data.data.data);
      setToken(data.token);
      return true;
    }
    return false;
  };

  const setToken = (token: string) =>{
    localStorage.setItem("authToken", token);
  }

  const signout = async () => {
    await api.logout();
    setUser(null);
    localStorage.clear();
  };
 
  return (
    <AuthContext.Provider value={{ user, signin, signout }}>
      {children}
    </AuthContext.Provider>
  );
};
