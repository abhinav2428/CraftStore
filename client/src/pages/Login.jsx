import './Login.css';
import { useState,useRef } from 'react';
import {RxAvatar} from 'react-icons/rx'
import axios from "axios"
import {server} from "../server.js"
import { toast } from "react-toastify";
import './Login.css';
import { useNavigate } from 'react-router-dom';
// import { a } from "react-router-dom";

const Login = () => {
    const navigate= useNavigate()
    const[avatar,setAvatar]=useState(null)
    const usernameRefR = useRef();
    const emailRefR = useRef();
    const passwordRefR = useRef();
    const usernameRefL = useRef();
    const passwordRefL = useRef();
    const handleAvatar=(e)=>{
        const file=e.target.files[0]
        setAvatar(file)
    }
    const handleLogin=async(e)=>{
        e.preventDefault();
        const email1=usernameRefL.current.value;
        const password1=passwordRefL.current.value;
        await axios.post(`${server}/user/login-user`,{
            email:email1,password:password1,
        },{withCredentials:true}).then((res)=>{
            toast.success("Login Success")
            console.log("success")
            navigate("/")
        }).catch((err)=>{
            toast.error(err.response.data.message);
        })
    }
    const handleRegister=(e)=>{
        e.preventDefault();
        const config={headers:{"content-type":"multipart/form-data"}}
        const newUser = {
            name: usernameRefR.current.value,
            email: emailRefR.current.value,
            password: passwordRefR.current.value,
            file:avatar
        }
        console.log(newUser)
        axios.post(`${server}/user/create-user`,newUser,config).then((res)=>{
            toast.success(res.data.message)
        }).catch((err)=>{
            toast.error(err.response.data.message);
        })
    }
    const toggleForm = (e) => {
        const container = document.querySelector('.container');
        const section = document.querySelector('section');
        container.classList.toggle('active');
        section.classList.toggle('active');
    }
    const img1="https://images.unsplash.com/photo-1590422749897-47036da0b0ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fHBvdHRlcnl8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"
    const img2="https://images.unsplash.com/photo-1622691078858-58f9eb8825e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fHBvdHRlcnl8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"
    return (
        <section>
            <div className="mx-8 container">
                <div className="user signinBx">
                    <div className="imgBx"><img src={img1} alt=" "/></div>
                    <div className="formBx">
                        <form onSubmit={handleLogin}>
                            <h2>Sign In</h2>
                            <input type="text" placeholder="Email" ref={usernameRefL} />
                            <input type="password" placeholder="Password" ref={passwordRefL}/>
                            <a to="/">
                                <input type="submit" value="Login" />
                            </a>
                            <p className="signup">don't have an account? <a href="#" onClick={(event) => { toggleForm(event) }}>Sign up.</a></p>
                        </form>
                    </div>
                </div>

                <div className="user signupBx">
                    <div className="formBx">
                        <form onSubmit={handleRegister}>
                            <h2>Create an account</h2>
                            <input type="text" placeholder="Username" ref={usernameRefR}/>
                            <input type="text" placeholder="Email Address" ref={emailRefR}/>
                            <input type="password" placeholder="Create Password" ref={passwordRefR}/>
                            <div className='flex'>
                            <input type="file" name="Avatar" accept=".jpg,.jpeg,.png" onChange={handleAvatar}/>
                             <div>{avatar ? (<img className="rounded-full mt-2 ml-2 w-12 h-12" src={URL.createObjectURL(avatar)} alt="avatar"/>):(<RxAvatar className="mt-2 ml-2 w-12 h-12"/>) }</div>
                            </div> 
                            <a to="/">
                                <input type="submit" value="Sign Up" />
                            </a>
                            <p className="signup">Already have an account? <a href="#" onClick={(event) => { toggleForm(event) }}>Sign in.</a></p>
                        </form>
                    </div>
                    <div className="imgBx"><img src={img2} alt=" "/></div>
                </div>
            </div>
        </section>
    )
}

export default Login;