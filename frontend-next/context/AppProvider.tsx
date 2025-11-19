'use client'
import { createContext, useState, useContext, useEffect, useRef } from "react";
import Loader from "../components/Loader";
import axios from "axios";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";

interface AppProviderType { 
  login:(email:string,password:string) => Promise<void>,
  register:(name:string,email:string,password:string,password_confirmation:string) => Promise<void>,
  logout:() => void,
  isLoading:boolean,
  authToken:string | null,
}

const appContext = createContext<AppProviderType | undefined>(undefined);

const API_URL = process.env.NEXT_PUBLIC_API_URL

export const AppProvider = ({children} : { children: React.ReactNode}) => {
    const [isLoading,setIsLoading] = useState(true);
    const [authToken,setAuthToken] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
      const token = Cookies.get('authToken');
      
      if(token){
        setAuthToken(token);
      } else {
        router.push('/auth');
      }
      setIsLoading(false);
    },[]);

    const login = async (email:string,password:string) => {
      setIsLoading(true);
      try{
        const response = await axios.post(`${API_URL}/login`,{
          email,
          password,
        });

        if(response.data.status){
          Cookies.set('authToken',response.data.token, { expires: 7 });
          toast.success("Login Successful");
          setAuthToken(response.data.token);
          router.push('/dashboard');
        }else{
          toast.error("Invalid Login");
        }
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
      }catch(error){
        console.log("Registration Error :", error);
      }finally{
        setIsLoading(false);
      }
    }

    const logout = () => {
      Cookies.remove('authToken');
      setAuthToken(null);
      toast.success("Logged out successfully");
      router.push('/auth');
      window.location.reload();
    }

    return (
      <appContext.Provider value={{login,register,logout,isLoading,authToken}}>
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