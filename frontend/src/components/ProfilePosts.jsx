import React from 'react'

const ProfilePosts = () => {
  return (
    <div className='w-full flex mt-8 space-x-4'>
      
      <div className='w-[35%] h-[200px] flex justify-center items-center'>
        <img src="https://images.ctfassets.net/hrltx12pl8hq/28ECAQiPJZ78hxatLTa7Ts/2f695d869736ae3b0de3e56ceaca3958/free-nature-images.jpg?fit=fill&w=1200&h=630" alt="" className='h-full w-full object-cover' />
      </div>      


      <div className='flex flex-col w-[65%] '>

        <h1 className='text-xl font-bold mb-1 md:mb-2 md:text-2xl'>
          This is Title
        </h1>

        <div className='flex mb-2 text-sm font-semibold text-grey-500 items-center justify-between md:mb-4'>
          <p>User: Ashish</p>

          <div className='flex space-x-2'>
              <p>01/01/1001</p>
              <p>16:40</p>
          </div>

        </div>

        <p className='text-sm md:text-lg'> Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempore beatae quo aliquam explicabo eligendi voluptatem exercitationem sunt, officiis hic dolores voluptate, laborum recusandae natus.</p>

      </div>

    </div>
  )
}

export default ProfilePosts
