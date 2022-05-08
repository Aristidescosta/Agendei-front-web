import { useContext } from "react";
import { Login } from "../../pages/login/Login";
import { AuthContext } from "./AuthContext";

export const RequireAuth = ({children}: {children: JSX.Element}) => {
  const auth = useContext(AuthContext);
  console.log("Auth:" +  auth.user)
  if(!auth.user)
  return <Login/> 

  return children;
}