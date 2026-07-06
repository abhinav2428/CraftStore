import './Login.css';
//import { useState,useRef } from 'react';
//import axios from 'axios'
import './Login.css';
// import { a } from "react-router-dom";

const Login = () => {
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
            <div className="container">
                <div className="user signinBx">
                    <div className="imgBx"><img src={img1} alt=" "/></div>
                    <div className="formBx">
                        <form>
                            <h2>Sign In</h2>
                            <input type="text" placeholder="Username" />
                            <input type="password" placeholder="Password" />
                            <a to="/">
                                <input type="submit" value="Login" />
                            </a>
                            <p className="signup">don't have an account? <a href="#" onClick={(event) => { toggleForm(event) }}>Sign up.</a></p>
                        </form>
                    </div>
                </div>

                <div className="user signupBx">
                    <div className="formBx">
                        <form>
                            <h2>Create an account</h2>
                            <input type="text" placeholder="Username" />
                            <input type="text" placeholder="Email Address" />
                            <input type="password" placeholder="Create Password" />
                            <input type="password" placeholder="Confirm Password" />
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