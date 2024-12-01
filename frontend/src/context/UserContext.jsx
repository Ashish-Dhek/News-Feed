import { createContext, useEffect, useState } from "react";
import BACKEND_URL from "../url";
import axios from "axios";





const userContext=createContext({});



const  UserContextProvider=({children})=> {

    const [user,setUser]=useState(null)

    const getUser=async()=>{

        try {
                const res= await axios.get(BACKEND_URL+"/auth/refetch",{withCredentials:true})
                // console.log(res.data)
                setUser(res.data)
                
 
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        getUser()
    },[])


    return <userContext.Provider  value={{user,setUser}}>
        {children}
    </userContext.Provider>
}

export {userContext,UserContextProvider}