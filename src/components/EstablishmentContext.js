import React, { createContext, useState } from "react";
import { establishmentRows } from "../data";

export const EstablishmentContext = createContext();

export default function EstablishmentProvider({children}){
  const [data, setData] = useState(0);

  return(
    <EstablishmentContext.Provider value={{data, setData}}>
      {children}
    </EstablishmentContext.Provider>
  )
}

export const useEstablishment = () =>{
  const context = useEstablishment();
  const { data, setData } = context;
  return { data, setData }
}