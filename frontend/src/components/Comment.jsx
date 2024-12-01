import React, { useContext, useEffect, useState } from 'react';
import { MdDelete } from "react-icons/md";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import axios from 'axios';
import BACKEND_URL from '../url';
import { userContext } from '../context/userContext';
import Replies from './Replies';

const Comment = ({ comment }) => {
    const { user } = useContext(userContext);
    const [reply, setReply] = useState(false);
    const [replies, setReplies] = useState([]);
    const [replyText, setReplyText] = useState("");
    const [loadingReplies, setLoadingReplies] = useState(false);

    // Deleting a comment
    const deleteComment = async () => {
        try {
            await axios.delete(`${BACKEND_URL}/comments/${comment._id}`, { withCredentials: true });
            window.location.reload();
        } catch (error) {
            console.error("Error deleting comment:", error);
        }
    };

    // Toggle replies section
    const showReply = async () => {
        setReply(!reply);
        // fetchReplies(); // Fetch replies only when opening the section
    };

    useEffect(() => {
        fetchReplies();
    }, []);

    // Posting a new reply
    const handleReplySubmit = async () => {
        if (!replyText.trim()) return;
        try {
            const res = await axios.post(
                `${BACKEND_URL}/comments/reply/${comment._id}`,
                { replyText, replyAuthor: user.username },
                { withCredentials: true }
            );

            // console.log(res.data.comment.replies[0])
            setReplies(res.data.comment.replies || []);
            // console.log(replies)
            setReplyText('');
        } catch (err) {
            console.error("Error posting reply:", err);
        }
    };

    // Fetching replies
    const fetchReplies = async () => {
        setLoadingReplies(true); // Start loading
        try {
            const response = await axios.get(`${BACKEND_URL}/comments/reply/${comment._id}`, {
                withCredentials: true,
            });
            
            // console.log("res",response.data.replies);
            setReplies(response.data.replies || []); // Ensure replies is always an array
            console.log("hgjhagsdj", replies);
            setLoadingReplies(false);
        } catch (error) {
            console.error("Error fetching replies:", error);
        } 
        // finally {
        //     setLoadingReplies(false); // Stop loading
        // }
    };

    // Initial fetch of replies
    // useEffect(() => {
    //         console.log("hi")
    //         fetchReplies();
        
    // }, [comment, reply]);

    useEffect(() => {
        fetchReplies();
    },[]);

    return (
        <div className='px-2 py-2 bg-gray-200 rounded-lg my-2'>
            <div className='flex items-center justify-between '>
                <h3 className='font-bold text-gray-600'>{comment.author}</h3>
                <div className='flex justify-center items-center space-x-4'>
                    <p className='text-grey-500 text-sm'>{new Date(comment.updatedAt).toString().slice(4, 15)}</p>
                    <p className='text-grey-500 text-sm'>{new Date(comment.updatedAt).toString().slice(16, 21)}</p>
                    {user._id === comment.userId && (
                        <div className='flex items-center justify-center space-x-2 '>
                            <p className='cursor-pointer' onClick={deleteComment}><MdDelete /></p>
                        </div>
                    )}
                </div>
            </div>

            <p className='px-4 mt-2'>{comment.comment}</p>

            <div className='flex justify-end mt-2 px-4 text-xl ' onClick={showReply}>
                <div className='cursor-pointer'><IoChatboxEllipsesOutline /></div>
            </div>

            {reply && (
                <div className='ml-10 text-yellow-700 text-2sm'>
                    <div>
                        { loadingReplies ? (
                            <p>Loading replies...</p>
                        ) : (
                            replies.length ? (
                                replies.map((reply) => (
                                    <Replies key={reply._id} reply={reply} />
                                    // <p>{console.log(reply.replyText)}</p>
                                    // <h1>{reply.replyText}</h1>
                                ))
                            ) : (
                                <p>No replies yet.</p>
                            )
                            // <p>{replies.length}</p>
                        )
                        }
                    </div>
                    <div className='w-full flex gap-2 border rounded mt-1'>
                        <input
                            type="text"
                            className='w-[80%] px-2'
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                            placeholder='Write a reply...'
                        />
                        <button
                            className='text-black bg-red-400 p-1 px-2 rounded'
                            onClick={handleReplySubmit}
                        >
                            Reply
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Comment;
