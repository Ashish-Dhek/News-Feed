import React, { useContext, useEffect, useState } from 'react'
import HomePost from '../components/HomePost'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import axios from 'axios'
import BACKEND_URL from '../url'
import { Link, useLocation } from 'react-router-dom'
import { userContext } from '../context/userContext'

const MyPosts = () => {

  const [posts,setPosts]= useState([])
  const[noResults,setNoResult]= useState(false)
  


  const {user} = useContext(userContext);

 

  const fetchPost=async()=>{

    try {
      
      const res= await axios.get(BACKEND_URL+"/posts/user/"+user?._id)

    //   console.log(res.data)
      setPosts(res.data)
      if(res.data.length===0)
        setNoResult(true)
      else
        setNoResult(false)


    } catch (error) {
      console.log(error)
    }
  } 


  useEffect(()=>{
    fetchPost()
  },[posts])

  return (
    <>
    <Navbar/>
    <div className='px-8 md:px-[200px] min-h-screen '>
       {
        noResults ?
        <h3 className='text-center font-bold mt-16 '>No Post Available</h3>
        :
        posts.map((post)=>(

          <>
          <Link  to={user ? `/posts/post/${post._id}` : "/login"} className=' '>
          <HomePost key={post._id} post={post}  />
          </Link>
          </>
        ))
       }
    </div>

    <Footer/>
    </>
  )
}

export default MyPosts
