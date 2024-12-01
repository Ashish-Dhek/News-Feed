import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {BsSearch} from "react-icons/bs"
import { FaBars } from "react-icons/fa6";
import Menu from './Menu';
import { userContext } from '../context/userContext';
import { IoIosLogOut } from "react-icons/io";
import axios from 'axios';
import BACKEND_URL from '../url';
import { CgProfile } from "react-icons/cg";
import { IoCreateOutline } from "react-icons/io5";

const Navbar = () => {



  const {user,setUser}=useContext(userContext)

  const [menu,setMenu]= useState(false)
  const [prompt,setPrompt]=useState("")

  const navigate= useNavigate()


  const showMenu=()=>{
    setMenu(!menu)
  }





  const handleLogOut=async()=>{
    try {
      const res= await axios.get(BACKEND_URL+"/auth/logout",{withCredentials:true})

      setUser(null)
      navigate("/")
      


    } catch (error) {
      console.log(error)
    }
  }




  return (
    <div className="flex items-center justify-between px-6 md:px-[200px] py-4 border-b bg-gray-100 " >
      
      <h1 className='tx-lg  md:text-xl font-extrabold '>
        <Link to="/">News Feed</Link>
      </h1>

      <div className='flex justify-center item-center space-x-0 bg-white p-1'>
          <p className=' cursor-pointer my-2'  onClick={()=>{navigate( prompt ? "?search="+prompt  : navigate("/"))}} ><BsSearch/></p>
          <input type="text" className='outline-none px-3 py-1' placeholder='Search' onChange={(e)=>{setPrompt(e.target.value)}} />
      </div>

      <div className=" hidden md:flex items-center justify-center  space-x-2 md:space-x-4 ">
        
        {user ?
          <h3 className='text-2xl'>
            <Link to="/create"><IoCreateOutline /></Link>
          </h3>
          :
          <h3><Link to="/login">Login</Link></h3>
        }
        
        {
          user ?
          <h3 className='text-2xl cursor-pointer'><Link to={"/myposts/"+user._id}><CgProfile /></Link> </h3>
          :
          <h3><Link to="/register">Register</Link></h3>
        }
        {
          user ? <p className='text-2xl cursor-pointer' onClick={handleLogOut}><IoIosLogOut /> </p>:<></>
        }
      </div>

      <div className='md:hidden text-lg cursor-pointer'  onClick={showMenu} >
        <FaBars />

        {
          menu ? <Menu/>:<></>
        }
      </div>
      
    </div>
  )
}

export default Navbar
