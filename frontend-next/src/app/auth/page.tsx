'use client'
import React, { useEffect, useState } from 'react'
import { myAppHook } from '../../../context/AppProvider';

interface formData{
  email: string;
  password: string;
  name?: string;
  password_confirmation?: string;
}

const Auth : React.FC = () => {
  const {login, register} = myAppHook();
  const [isLogin, setIsLogin] = useState(true)
  const [formData,setFormData] = useState<formData>({
    email: '',
    password: '',
    name: '',
    password_confirmation: ''
  })

  const handleOnChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({...formData,[event.target.name] : event.target.value})
  } 

  const handleFormSubmit = async(event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    if(isLogin){
      try{
        await login(formData.email,formData.password);
      } catch(error){
        console.log("Authentication Error :", error);
      }
    }else{
      try{
        await register(formData.name!,formData.email,formData.password,formData.password_confirmation!);
      } catch(error){
        console.log("Registration Error :", error);
      }
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-[400px] bg-white shadow-md rounded-lg p-6">
        
        {/* Login Form */}
        <h3 className="text-center text-xl font-semibold mb-4">{isLogin ? 'Login' : 'Register'}</h3>
        <form className="flex flex-col gap-2" onSubmit={handleFormSubmit}>
          {!isLogin && 
            <input 
              className="border rounded-md px-3 py-2" 
              value={formData.name}
              onChange={handleOnChangeInput} 
              name="name" 
              type="text" 
              placeholder="Name" 
              required
            />
          }

          <input 
            className="border rounded-md px-3 py-2" 
            value={formData.email}
            onChange={handleOnChangeInput} 
            name="email" 
            type="email" 
            placeholder="Email" 
            required 
          />
          
          <input 
            className="border rounded-md px-3 py-2" 
            value={formData.password}
            onChange={handleOnChangeInput} 
            name="password" 
            type="password" 
            placeholder="Password" 
            required 
          />      
          
          {!isLogin && 
            <input 
              className="border rounded-md px-3 py-2" 
              value={formData.password_confirmation}
              onChange={handleOnChangeInput} 
              name="password_confirmation" 
              type="password" 
              placeholder="Confirm Password" 
              required 
            />
          }
          
          <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md w-full" type="submit">
            {isLogin ? 'Login' : 'Register'}
          </button>

        </form>

        <p className="mt-6 text-center text-sm">
          {isLogin 
          ? 
            <>Don't have an account? <span className="text-blue-600 cursor-pointer" onClick={() => setIsLogin(!isLogin)}>Register</span> </> 
          : 
            <>Already have an account? <span className="text-blue-600 cursor-pointer" onClick={() => setIsLogin(!isLogin)}>Login</span> </>
          }
        </p>
      </div>
    </div>
  )
}



export default Auth