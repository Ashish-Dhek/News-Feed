import React from 'react'

const Footer = () => {
  return (
    <>
    <div className='mt-8 w-full bg-black px-8 md:px-[500px] flex md:flex-row flex-col space-y-4 md:space-y-0 items-start justify-between text-sm md:text-md py-8'>

      <div className='flex flex-col text-white'>
        <p>First line</p>
        <p>Second line</p>
        <p>Third line</p>

      </div>

      <div className='flex flex-col text-white'>
        <p>First line</p>
        <p>Second line</p>
        <p>Third line</p>

      </div>

      <div className='flex flex-col text-white'>
        <p>First line</p>
        <p>Second line</p>
        <p>Third line</p>

      </div>
    </div>

    <p className='py-2 pb-2 text-center text-white bg-black'>All rights reserved @newsfeed 2023</p>

    </>
  )
}

export default Footer
