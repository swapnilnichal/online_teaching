import React, { useState } from "react"
import { NavLink } from "react-router-dom";
import OtpInput from 'react-otp-input';

const ForgotPass = () => {
    const [email,setEmail] = useState();
    const[valid,setValid] = useState(true);
    const[otpValid,setOtpValid] = useState(false);
    
    const handleOtp = ()=>{
       const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
       if(!emailRegex.test(email)){
         setValid(false);
         setOtpValid(false);
         return null;
       }
       setValid(true);
       setOtpValid(true);
    }

  return (
    <div>
      <div className="forgotPage-main-div">
        <div className="forgotPage-left-div">
            <img alt="small-girl" className="forgot-img" src="https://s3-alpha-sig.figma.com/img/18af/3f71/5c74bd0fef8db41064db1d863cff8acb?Expires=1704672000&Signature=LBfq-6YL8Y9Dvq8qbMCRz~HarFe6MQyMErTfMLsGYBRJVjo2biOmou5kcQoYlByiXIACZic8Z~GV9yIGFoPlaw1HuYteWTkHpfrO6evKxES61RGNF1tCJeS9doEVR3dD4QUuHajXfFvvOlCiqw1WRMRqCv3ncFaThsJksUe6vc9ib31E2Kc4zOgYMHhAodfLWpwP~e3ZVZ7cu7rwcTIC-QO5azKbfxt4tR6IAz8ySEFQ7zZytEWWjmFq4GZlRIqW8crLk3zf2m1KzqVYjbNiTfhjAYCwb2iGlBwybdDTdt6qFOdsPZhztiMT~0sZb1FobJYC2d~ILJgoWnPc0BTOGA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"/>
        </div>
        <div className="forgotPage-right-div">
          <div className="container inner-forgot-right-div">
          <h4 className="login-header">Forgot Password</h4>
          <div className="mb-3">
            <label htmlFor="inputState" className="form-label">Enter your email address<span className="astrick">*</span></label>
            <input type="email" className="form-control exampleInput" id="inputState" aria-describedby="emailHelp" required
                  onChange={(e)=>setEmail(e.target.value)}  name="state" placeholder="Enter Email address"/>
                  {valid ? null : <p style={{ color: 'red' }}>Invalid email address</p>}
          </div>
          <div className="mb-3">
          {otpValid ? <OtpComponent /> : null}
          </div>
          <div className="d-flex justify-content-center" style={{marginTop:"20px"}}>
            <button type="submit" onClick={handleOtp} className="btn btn-primary signupBtn">Get OTP</button>                             
          </div>
          <div className="d-flex justify-content-center" style={{marginTop:"10px"}}>
            <div id="emailHelp" className="form-text" style={{fontWeight:"700"}}>
                Already have an account?<span><NavLink to='/login' className="signup-text">Login</NavLink></span>
            </div>               
          </div>
          </div>
        </div>
      </div>
    </div>
  )
};

const OtpComponent = ()=> {
  const [otp, setOtp] = useState('');
  console.log(otp);
  return (
    <div className="otp-comp">
        <OtpInput
      value={otp}
      onChange={setOtp}
      numInputs={4}
      renderSeparator={<span className="otp-space"></span>}
      renderInput={(props) => <input id="otp-box" {...props} />}
    />
    </div>
  );
}


export default ForgotPass;

