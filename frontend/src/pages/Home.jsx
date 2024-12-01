import React, { useContext, useEffect, useState } from 'react'
import HomePost from '../components/HomePost'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import axios from 'axios'
import BACKEND_URL from '../url'
import { Link, useLocation } from 'react-router-dom'
import { userContext } from '../context/userContext'

const Home = () => {

  const [posts,setPosts]= useState([])
  const[noResults,setNoResult]= useState(false)
  const [originalPost,setOriginalPost]=useState([])

  


  const {search}=useLocation();   // fetching search value from path for search fucntionality
  const {user} = useContext(userContext);

 

  const fetchPost=async()=>{

    try {
      
      const res= await axios.get(BACKEND_URL+"/posts/"+search)

      // console.log(res.data)
      setPosts(res.data)
      setOriginalPost(res.data)
      if(res.data.length===0)
        setNoResult(true)
      else
        setNoResult(false)


    } catch (error) {
      console.log(error)
    }
  } 


  // dorting the post array by date
  const sortPostsByDate = () => {
    const sortedPosts = [...posts].sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return dateB - dateA;  // Sort descending by date (latest first)
    });
    setPosts(sortedPosts);
  };


  // sorting the post array by likes
  const sortPostsByLikes = () => {
    const sortedPosts = [...posts].sort((a, b) => {
      return b.likes?.length - a.likes?.length;  // Sort descending by the number of likes
    });
    setPosts(sortedPosts);
  };


  // sort the post by views
  const sortPostsByViews = () => {
    const sortedPosts = [...posts].sort((a, b) => {
      return b.views?.length - a.views?.length;  // Sort descending by the number of views
    });
    setPosts(sortedPosts);
  };

  const sortPostsByNone = () => {
    // console.log(originalPost)
    setPosts(originalPost);
  };


  useEffect(()=>{
    fetchPost()
  },[search])

  return (
    <>
    <Navbar/>
    <div className='px-8 md:px-[200px] min-h-screen '>

      <div className='flex gap-1'>

      <h1 className='bg-black px-3 text-white  hover:cursor-pointer  '  onClick={sortPostsByDate}>Date</h1>
      <h1 className='bg-black px-3 text-white  hover:cursor-pointer ' onClick={sortPostsByLikes}>Likes</h1>
      <h1 className='bg-black px-3 text-white  hover:cursor-pointer  '  onClick={sortPostsByViews}>Views</h1>
      <h1 className='bg-black px-3 text-white  hover:cursor-pointer  '  onClick={sortPostsByNone}>None</h1>
 

      </div>
      
       {
        noResults ?
        <h3 className='text-center font-bold mt-16 '>No Post Available</h3>
        :

        
        posts.map((post)=>(

          <>
          <Link  to={user ? `posts/post/${post._id}` : "/login"}>
          <HomePost key={post._id} post={post} />
          </Link>
          </>
        ))

       }
    

    </div>

    <Footer/>
    </>
  )
}

export default Home
