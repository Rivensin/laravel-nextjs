'use client'
import { createContext, useState, useContext } from "react";
import Loader from "../components/Loader";
import axios from "axios";
import toast from "react-hot-toast";

interface AppProviderType { 
  login:(email:string,password:string) => Promise<void>,
  register:(name:string,email:string,password:string,password_confirmation:string) => Promise<void>,
  isLoading:boolean
}

const appContext = createContext<AppProviderType | undefined>(undefined);

const API_URL = process.env.NEXT_PUBLIC_API_URL

export const AppProvider = ({children} : { children: React.ReactNode}) => {
    const [isLoading,setIsLoading] = useState(false);

    const login = async (email:string,password:string) => {
      setIsLoading(true);
      try{
        const response = await axios.post(`${API_URL}/login`,{
          email,
          password,
        });

        console.log(response);
      }catch(error){
      
      }finally{
        setIsLoading(false);
      }
    }

    const register = async (name:string,email:string,password:string,password_confirmation:string) => {
      setIsLoading(true);
      try{
        const response = await axios.post(`${API_URL}/register`,{
          name,
          email,
          password,
          password_confirmation
        });

        console.log(response);
      }catch(error){
      
      }finally{
        setIsLoading(false);
      }
    }

    return (
      <appContext.Provider value={{login,register,isLoading}}>
        {isLoading ? <Loader /> : children}
      </appContext.Provider>
    );
}

export const myAppHook = () => {
  const context = useContext(appContext);

  if(!context){
    throw new Error("Context will be wrapped inside AppProvider");
  }

  return context;
}