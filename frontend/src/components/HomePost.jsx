import React from 'react'
import noImage from "../assets/no-image-2.jpg"
import { IMAGE_FOLDER } from '../url'
import { FcLike } from "react-icons/fc";
import { FaRegHeart } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";




const HomePost = ({post}) => {
  return (

    <div className='w-full flex md:flex-row  flex-col mt-8 space-x-4 border-b border-gray-500 hover:bg-gray-100 p-1'>
      
      <div className='md:w-[35%] h-[200px] flex justify-center items-center'>
        <img src={ IMAGE_FOLDER+post.photo || noImage} alt="" className='h-full w-full object-cover' />
      </div>      


      <div className='flex flex-col w-[65%] '>

        <h1 className='text-xl font-bold mb-1 md:mb-2 md:text-2xl'>
          {post.title}
        </h1>

        <div className='flex mb-2 text-sm font-semibold text-grey-500 items-center justify-between md:mb-4'>
          <p className='text-red-500'>Author: {post.username}</p>

          <div className='flex space-x-2'>
              <p>{ new Date( post.createdAt).toString().slice(4,15)}</p>
              <p>{ new Date( post.createdAt).toString().slice(16,21)}</p>
          </div>

        </div>

        <p className='text-sm md:text-lg'> {post.desc.slice(0,200) + "   ...Read more "}</p>
        
        
      </div>

      <div className='flex gap-5 items-center mt-1'>
        <p className='flex items-center text-sm md:text-l  p-1 bg-gray-200 rounded'>
          <FcLike className='mr-1' /> {post.likes?.length}
        </p>
        <p className='flex items-center text-sm md:text-l  p-1 bg-gray-200 rounded'>
          <IoEyeOutline className='mr-1' /> {post?.views?.length}
        </p>
      </div>
    </div>
  )
}

export default HomePost
