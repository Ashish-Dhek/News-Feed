import React, { useContext } from 'react'
import { userContext } from '../context/userContext'
import axios from 'axios'
import BACKEND_URL from '../url'
import { Link, useNavigate } from 'react-router-dom'

const Menu = () => {

    const {user,setUser}= useContext(userContext)
    const navigate=useNavigate()



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
    <div className='bg-black w-[200px] flex flex-col items-start absolute top-12 right-6 rounded-md p-4 space-y-4 ' >
      { !user &&  <h3 className='text-white text-md hover:text-gray-500 cursor-pointer '><Link to="/login">Login</Link></h3> }
      { !user && <h3 className='text-white text-md hover:text-gray-500 cursor-pointer'><Link to="/register">Register</Link></h3> }


      { user && <h3 className='text-white text-md hover:text-gray-500 cursor-pointer'><Link to="/create">Create Post</Link></h3> }
      { user &&  <h3 className='text-white text-md hover:text-gray-500 cursor-pointer '><Link to={"/myposts/"+user._id}>My Posts</Link></h3> }
      { user && <h3 className='text-white text-md hover:text-gray-500 cursor-pointer' onClick={handleLogOut}>LogOut</h3> }
    </div>
  )
}

export default Menu
