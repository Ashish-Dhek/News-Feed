import React from 'react'
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import {Route, Routes} from "react-router-dom"
import Home from "./pages/Home"
import Login from './pages/Login'
import Register from './pages/Register'
import PostDetails from './pages/PostDetails'
import CreatePost from './pages/CreatePost'
import EditPost from './pages/EditPost'
import Profile from './pages/Profile'
import { UserContextProvider } from './context/userContext'
import MyPosts from './pages/MyPosts'

const App = () => {
  return (

    <UserContextProvider>
     

      <Routes>

          <Route exact path='/' element={<Home/>}/>
          <Route exact path='/login' element={<Login/>}/>
          <Route exact path='/register' element={<Register/>}/>
          <Route exact path='/posts/post/:id' element={<PostDetails/>}/>
          <Route exact path='/create' element={<CreatePost/>}/>
          <Route exact path='/edit/:id' element={<EditPost/>}/>
          <Route exact path='/myposts/:id' element={<MyPosts/>}/>

          
      </Routes>


      
      </UserContextProvider>
  )
}

export default App
