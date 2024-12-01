import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import BACKEND_URL from '../url'

const Register = () => {


  const [username, setUsername]= useState("")
  const [email,setEmail]= useState("")
  const [password, setPassword]= useState("")
  const [error,setError]=useState(false)

  const navigate= useNavigate()


  // registering user
  const handleRegister= async()=>{
    try {

     const res= await axios.post(BACKEND_URL+"/auth/register", {username,email,password})  
     setError(false)

     navigate("/login")
     



    } catch (error) {
      setError(true)
      console.log(error)
    }
  }





  return (
    
    <div className='w-full flex justify-center items-center h-[70vh] '>
    <div className='flex flex-col justify-center items-center space-y-4 w-[80%] md:w-[25%]'>

        <h1 className='text-xl font-bold text-left'>Register New Account</h1>

        <input type="text" className='w-full px-4 py-2 border-black border-2 outline-0' placeholder='Username'  onChange={(e)=>setUsername(e.target.value)} />
        <input type="text" className='w-full px-4 py-2 border-black border-2 outline-0' placeholder='Email' onChange={(e)=>setEmail(e.target.value)} />
        <input type="password" className='w-full px-4 py-2 border-black border-2 outline-0' placeholder='Password'  onChange={(e)=>setPassword(e.target.value)} />

        <button className='w-full px-4 py-4 text-lg font-bold text-white bg-black rounded-lg hover:bg-gray-500 hover:text-black '  onClick={handleRegister}>
          Register
        </button>

        {error && <h3 className='text-red-500 text-sm'>Something went wrong</h3>}

        <div className='flex justify-center items-center space-x-3 '>
          <p>Already have account?</p>
          <p className='text-gray-500 hover:text-black'><Link to="/login">Login</Link></p>
        </div>
    </div>

    
  </div>
  )
}

export default Register
