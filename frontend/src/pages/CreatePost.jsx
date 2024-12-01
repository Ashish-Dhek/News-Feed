import React, { useContext, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { userContext } from '../context/userContext'
import axios from 'axios'
import BACKEND_URL from '../url'
import { useNavigate } from 'react-router-dom'

const CreatePost = () => {

  const [title,setTitle]=useState("")
  const [desc,setDesc]= useState("")
  const [file,setFile]=useState(null)


  const {user}= useContext(userContext)
  const navigate= useNavigate()




  // creating new post
  const handleCreatePost= async(e)=>{
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
      
      const res= await axios.post(BACKEND_URL+"/posts/create",post,{withCredentials:true})

      console.log(res.data)
      navigate("/posts/post/"+ res.data._id)

    } catch (error) {
      console.log(error)
    }

  }




  return (
    <div>
      <Navbar/>
        
        <div className='px-6 md:px-[200px] mt-8 '>
            <h1 className='font-bold md:text-2xl text-xl mt-8'>Create a Post</h1>

            <form className='w-full flex flex-col space-y-4 md:space-y-8 mt-4 ' action="">

                <input className='px-4 py-2 outline-none ' type="text" placeholder='Enter post title..'  onChange={(e)=>{setTitle(e.target.value)}} />
                <input className='px-4 py-2 outline-none ' type="file" placeholder='Upload image....' onChange={(e)=>{setFile(e.target.files[0])}} />

                <textarea className='px-4 py-2 outline-none border border-gray-300' placeholder='Enter desctiption.....' rows="7" cols="50" onChange={(e)=>{setDesc(e.target.value)}} />

                <button className='bg-black w-full md:w-[20%] mx-auto text-white font-semibold px-4 py-2 md:text-xl text-lg'  onClick={handleCreatePost}>Post</button>
            </form>

        </div>

      <Footer/>
    </div>
  )
}

export default CreatePost
