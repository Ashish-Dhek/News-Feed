import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import axios from 'axios'
import BACKEND_URL from '../url'
import { useNavigate, useParams } from 'react-router-dom'
import { userContext } from '../context/userContext'

const EditPost = () => {

  const [title,setTitle]=useState("")
  const [desc,setDesc]= useState("")
  const [file,setFile]=useState("")
  
  const postId= useParams().id
  const {user}= useContext(userContext)
  const navigate= useNavigate()

  console.log(postId)



  // fetching the current post
  const fetchPost=async()=>{

    try {
        const res= await axios.get(BACKEND_URL+"/posts/get/"+postId,{withCredentials:true})
        setTitle(res.data.title)
        setDesc(res.data.desc)
        setFile(res.data.photo)




    } catch (error) {
      console.log(error)
    }
  }


  // updating the post
  const UpdatePost= async(e)=>{
    e.preventDefault()

    const post= {
      title,
      desc,
      username:user.username,
      userId: user._id,
      
    }

    if(file)
    {
      const data=new FormData()
      const filename= Date.now()+file.name
      data.append("img",filename)
      data.append("file",file)
      post.photo= filename


      try {
      // console.log(post)

        const imgUplaod= await axios.post(BACKEND_URL+"/upload",data)

        console.log(imgUplaod.data)

      } catch (error) {
        console.log(error)
      }

    }



    // post upload

    try {
      
      const res= await axios.put(BACKEND_URL+"/posts/"+postId,post,{withCredentials:true})

      console.log(res.data)
      navigate("/posts/post/"+ res.data._id)

    } catch (error) {
      console.log(error)
    }

  }





  useEffect(()=>{
    fetchPost()
  },[postId])





  return (
    
    <div>
      <Navbar/>
        
        <div className='px-6 md:px-[200px] mt-8 '>
            <h1 className='font-bold md:text-2xl text-xl mt-8'>Edit a Post</h1>

            <form className='w-full flex flex-col space-y-4 md:space-y-8 mt-4 ' action="">

                <input className='px-4 py-2 outline-none ' type="text" placeholder='Enter post title..' value={title} onChange={(e)=>{setTitle(e.target.value)}}  />
                <input className='px-4 py-2 outline-none ' type="file" onChange={(e)=>{setFile(e.target.files[0])}}   />

                <textarea className='px-4 py-2 outline-none border border-gray-300' placeholder='Enter desctiption.....' rows="7" cols="50" value={desc} onChange={(e)=>{setDesc(e.target.value)}} />

                <button className='bg-black w-full md:w-[20%] mx-auto text-white font-semibold px-4 py-2 md:text-xl text-lg'  onClick={UpdatePost}>Update</button>
            </form>

        </div>

      <Footer/>
    </div>
  )
}

export default EditPost
