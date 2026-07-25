import React,{useEffect} from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import {Login,Home,ActivationPage} from "./Routes.js"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Store from './redux/store.js'
import {loadUser} from './redux/actions/user'
const App = () => {
  useEffect(()=>{
    Store.dispatch(loadUser())
  },[])
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/activation/:activation_token" element={<ActivationPage/>}/>
      <Route path='/login' element={<Login/>}/>
    </Routes>
    <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </BrowserRouter>
  )
}

export default App