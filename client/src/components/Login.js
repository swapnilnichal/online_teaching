import React from "react"
import { useState } from "react";
import { NavLink,useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

const Login = () => {
    const[email,setEmail] = useState('');
    const[password,setPassword] = useState('');
    const[isChecked,setIsChecked] = useState(false);
    const[validEmail,setValidEmail] = useState(true);
    const [validPass, setValidPass] = useState(true);
    const [validCheck, setValidCheck] = useState(true);
    const navigate = useNavigate();

    const validateForm = ()=>{
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setValidEmail(emailRegex.test(email));
        if (validEmail === false || isChecked === false ) {
            setValidCheck(false);
            return false; 
        };
        if (password.length < 8 || (!password.includes("@") && !password.includes("#"))) {
          setValidPass(false);
          return false;
        }
        setValidPass(true);   
        setValidCheck(true);
        return true;
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        let validate = validateForm();
        if (validate) {
            try {
                const response = await fetch('/api/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email:email,
                        password:password,
                    }),
                });
                if (!response.ok) {
                    throw new Error(`Server response not OK: ${response.status} ${response.statusText}`);
                }
                const data = await response.json();
                Cookies.set('token', data.token, { expires: 1 });
                console.log(data);
                navigate('/')
            } catch (error) {
                console.error('Error:', error);
            }
        } else {
            return false;
        }
    };


    return (
        <div>
            <div className="form-wrapper">
                <div className="login-img-div d-flex align-items-center justify-content-center">
                    <img src="https://s3-alpha-sig.figma.com/img/afce/ad95/100667c8fc357baf7df3f9c5d980e367?Expires=1704672000&Signature=E7oomvaaWgpyzVzg6kEAUFrye9UFcOEpEzPMgV5ybKY7Dvj0Dhv7gvy1vHjzc-kuJhPLilqnqtIlYS-4ZoOk24OJHw3A7u~6axDGx4pjCPWpEvcnFLTNdEYjL6KEPAxfhBGxQEIt7T8WwAQpR2SEgfL-os3SAoO0bB34ETqvl6IiyZiYS2NtMbYgLv5DnmXrT~w2IYH1csTrC~iKGrLQa23R4-1Z0OzvihhJ8Sq-00ysbfRx~zrEKoLjXg3qdq-k7jsFySqrFy66Ol6lAh7O-QqBGNhSXN1oWCIZAvQHZHM2eFLqfa17wJxc5ylhzKNyaaiPsFtDIRERC-A~73X98g__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4" 
                    alt="login-page-sunimg" className="LoginImg"/>
                </div>
                <div className="signup-form-div">
                    <div className="container">
                        <form id="signup-form" onSubmit={handleLogin}>
                            <h4 className="login-header">Login to your account</h4>
                            <div className="mb-3" style={{ marginTop: "35px" }}>
                                <label htmlFor="exampleInput" className="form-label">Email address or username</label>
                                <input type="email" className="form-control exampleInput" id="exampleInput" aria-describedby="emailHelp" required
                                   onChange={(e)=>setEmail(e.target.value)} placeholder="Enter Email address"/>
                                   {validEmail ? null : <p style={{ color: 'red' }}>Invalid email address</p>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                                <input type="password" className="form-control" id="exampleInputPassword1" required
                                   onChange={(e)=>setPassword(e.target.value)} placeholder="Enter Password"/>
                                {validPass ? null : <p style={{ color: 'red' }}>length of password should be greater than 8 and include special characters like "@","#"</p>}                                
                                <div id="emailHelp" className="form-text"><NavLink to='/forgotpassword' className="forgot-pass-link">Forget Password?</NavLink></div>
                            </div>
                            <div className="mb-3 form-check">
                              <input type="checkbox" required checked={isChecked} onChange={()=>setIsChecked(!isChecked)} className="form-check-input" id="exampleCheck1"/>
                              <label className="form-check-label" htmlFor="exampleCheck1">Remember me.</label>
                              {validCheck ? null : <p style={{ color: 'red' }}>checkbox is required</p> }
                            </div>
                            <div className="d-flex justify-content-center">
                                <button type="submit" className="btn btn-primary signupBtn">
                                    Log In
                                </button>                             
                            </div>
                            <div className="frame4">
                              <div className="frame-item" />
                              <div className="or">OR</div>
                              <div className="frame-item" />
                            </div>
                            <div className="d-flex justify-content-center">
                            <button className="btn btn-primary phone-btn">
                                    Continue With Phone Number
                            </button>
                            </div>
                            <div className="d-flex justify-content-center" style={{marginTop:"10px"}}>
                               <div id="emailHelp" className="form-text" style={{fontWeight:"700"}}>
                                   Don't have an account?<span><NavLink to='/signup' className="signup-text">Sign Up</NavLink></span>
                               </div>               
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    )
};

export default Login;
