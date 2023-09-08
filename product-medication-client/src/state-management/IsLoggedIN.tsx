import { createContext } from "react";

type IsLoggedInContextType = { 
    isLoggedIn: Boolean ;
    loggedInDispatch : any
 }

export const IsLoggedIN = createContext<IsLoggedInContextType>({
     isLoggedIn: false ,
     loggedInDispatch : () =>{}
 })