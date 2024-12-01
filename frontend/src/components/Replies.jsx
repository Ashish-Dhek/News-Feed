import React from 'react'

const Replies = ({reply}) => {
  return (
    <div className="bg-gray-100 shadow-md w-[90%] p-4 my-2 rounded-lg flex flex-col gap-1">
    <div className="flex items-center">
      <h1 className="font-semibold text-red-500 mr-2">{reply.replyAuthor}</h1>
      {/* <span className="text-xs text-gray-500">says:</span> */}
    </div>
    <h2 className="text-green-800 text-sm leading-relaxed border-l-4 border-red-500 pl-3">
      {reply.replyText}
    </h2>
  </div>
  )
}

export default Replies;
