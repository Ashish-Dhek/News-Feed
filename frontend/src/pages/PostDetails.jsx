import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import  {BiEdit } from 'react-icons/bi'
import {MdDelete} from "react-icons/md"
import { FcLike } from "react-icons/fc";
import { FaRegHeart } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";
import Comment from '../components/Comment'
import axios from 'axios'
import BACKEND_URL ,{IMAGE_FOLDER}from '../url'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import noImage from "../assets/no-image-2.jpg"
import { userContext } from '../context/userContext'



const PostDetails = () => {

    

    const heart=true;
    const postId=useParams().id
    const [post,setPost]=useState({})
    const [comments,setComments]=useState([])
    const [commentText,setCommentText]=useState("")
    const [isLiked, setIsLiked]= useState(true)

    const navigate= useNavigate()
    const {user}= useContext(userContext)


    // Fetch post Details
    const fetchPostDetail= async()=>{
       

        try {
            const res= await axios.get(BACKEND_URL+`/posts/get/${postId}`,{withCredentials:true})
            // console.log(res.data);
            setPost(res.data)

            // if user have already liked the post
            setIsLiked(res.data.likes.includes(user?._id));
            console.log(res.data.likes?.includes(user?._id))

        } catch (error) {
            console.log(error)
        }
    }



    // Delete Post
    const handleDeletePost= async()=>{

        try {
        
         const res=  await axios.delete(BACKEND_URL+"/posts/"+postId,{withCredentials:true})
         console.log(res.data)
         navigate("/")

        } catch (error) {
                console.log(error)
        }
    }


    // edit post
    const handleEditPost= async()=>{
        navigate("/edit/"+postId)
    }


    // fetch comments
    const fetchComments= async()=>{
        try {
            
            const res= await axios.get(BACKEND_URL+"/comments/post/"+postId,{withCredentials:true})

            setComments(res.data)
       

        } catch (error) {
            console.log(error)
        }
    }


    // creating a comment
    const postComment=async(e)=>{

        e.preventDefault()
    
        console.log(user)
        try {

            
            const res= await axios.post(BACKEND_URL+"/comments/create",
                {comment:commentText,author:user.username,postId:postId,userId:user._id},
                {withCredentials:true})
            
           
            fetchComments()
            setCommentText("")
           
            

        } catch (error) {
            console.log(error)
        }

    }


    // like post
    const handleLike = async () => {
        try {
            
            const res= await axios.put(BACKEND_URL+"/posts/like/"+postId,user,{withCredentials:true})
            setIsLiked(!isLiked); // Toggle liked state
            fetchPostDetail(); // Re-fetch post details to update the like count
        } catch (error) {
            console.log(error);
        }
    };


    // handle view
    const handleView = async () => {
        try {
            // Send PUT request to increase the view count
            await axios.put(BACKEND_URL + `/posts/view/${postId}`,user, { withCredentials: true });
            fetchPostDetail(); // Fetch post details again to reflect the updated view count
        } catch (error) {
            console.error(error);
        }
    };


 
    
    useEffect(()=>{

        
        fetchPostDetail()
        fetchComments()
        handleView()
    },[postId])



  return (
    <>
    <Navbar/>

        <div className='px-8 md:px-[200px] mt-8'>

            <div className='flex justify-between items-center '>
                <h1 className='text-2xl font-bold text-black md:text-3xl '>
                    {post.title}
                </h1>
            {
                post.userId== user?._id &&
                <div className='flex items-center justify-center space-x-2 '>
                    <p className='cursor-pointer' onClick={handleEditPost}><BiEdit/></p>
                    <p className='cursor-pointer' onClick={handleDeletePost}><MdDelete/></p>
                </div>
            }
            </div>

            <div className='flex items-center justify-between mt-2 mdmt-2'>
                <p>User:{post.username}</p>

                <div className='flex space-x-2'>
                <p>{ new Date( post.updatedAt).toString().slice(4,15)}</p>
                <p>{ new Date( post.updatedAt).toString().slice(16,21)}</p>
                </div>
            </div>


            <img src={IMAGE_FOLDER+post.photo || noImage}  className="w-full mx-auto mt-1" alt="" />
            <p className='mx-auto mt-1  '>{post.desc}</p>


            <div className='flex items-center mt-8 space-x-4 font-semibold'>
              <p className='flex gap-1 items-center'>
               { 
                isLiked ? 
                <FaRegHeart onClick={handleLike} className='text-red-500 cursor-pointer '/>
                : 
                <FaRegHeart onClick={handleLike} className='text-red-500 cursor-pointer'/>
               }
               {post?.likes?.length}
               </p>

               <p className='flex gap-1 items-center'>
               <IoEyeOutline />
                {post?.views?.length}
               </p>
            </div>

            <div className='flex flex-col mt-4'>
               <h3 className='mt-6 mb-4 font-semibold ' >Comments:</h3>
                
                 {/* comments */}

                 {
                    comments?.map((comment)=>(
                        <Comment key={comment._id} comment={comment}/>
                    ))
                 }
            
            </div>

               {/* Post comment */}

            <div className='w-full flex flex-col mt-4 md:flex-row  '>
                <input type="text" className='md:w-[80%] outline-none py-2 px-4 mt-4 md:mt-0 ' placeholder='Write a comment' value={commentText}  onChange={(e)=>{setCommentText(e.target.value)}}/>
                <button className='bg-black text-sm text-white px-4 py-2 md:w-[20%] mt-4 md:mt-0' onClick={postComment}>Add Comment</button>
            </div>

        </div>



    <Footer/>

    </>
    
  )
}

export default PostDetails
