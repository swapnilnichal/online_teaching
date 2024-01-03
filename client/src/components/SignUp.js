import React, { useEffect } from "react"
import { useState } from "react";
import { NavLink,useNavigate } from "react-router-dom";

const SignUp = () => {

  const [details,setDetails] = useState({
    username: '',
    email:'',
    password: '',
    phone:'',
    gender:'',
    age:'',
    address:'',
    city:'',
    state:'',
    pincode:''
  })
  const [formError,setFormError] = useState({});
  const navigate = useNavigate();

  const apiKey = '1f6712ec49f240dfa0fe0cfc00dc349b';
  const fullAddress = `${details.address}, ${details.city}, ${details.city},${details.pincode}`;

  const handleChange = (e)=>{
    const {name,value} = e.target;
    setDetails((prev)=>{
      return {...prev, [name]:value }
    })
  }

  const validateForm = ()=>{
    let err = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(details.username.length <= 3){
      err.username = "name should have more than 3 characters";
    }
    if(!emailRegex.test(details.email)){
      err.email = "Invalid email address";
    }
    if (details.password.length < 8 || (!details.password.includes("@") && !details.password.includes("#"))) {
      err.password = "length of password should be greater than 8 and include special characters like @, # ";
    }
    if(details.phone.length < 10 || details.phone.length > 10){
      err.phone = "Enter valid phone number";
    }
    if(details.pincode.length < 6 || details.pincode.length > 6){
      err.pincode = "Enter valid Pin Code number";
    }
    setFormError({...err});
    const errKeys = Object.keys(err);
    if(errKeys.length===0){
      return true;
    }else{
      return false;
    }
  }

  function validateAddress(apiKey, fullAddress) {
    return new Promise((resolve, reject) => {
        const apiUrl = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(fullAddress)}&key=${apiKey}`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                console.log('Geocoding Response:', data);
                if (data.results && data.results.length > 0) {
                    const res = { message: 'Address is valid', status: 200, result: data.results };
                    resolve(res);
                } else {
                    console.log('Address is not valid.');
                    alert("invalid Address!, please provide a valid address");
                    reject('Address validation failed.');
                }
            })
            .catch(error => {
                console.error('Error validating address:', error);
                alert("invalid Address!, please provide a valid address");
                reject('Address validation failed.');
            });
    });
}



  const handleForm = async (e) => {
    e.preventDefault();
    // console.log(details);
    let validate = validateForm();
    if (validate) {
        try {
          const validLocation =await validateAddress(apiKey,fullAddress);
          if(validLocation && validLocation.status === 200){
              console.log("valid location", validLocation.result);
              const response = await fetch('/api/signup', {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(details),
               });
            if (!response.ok) {
                throw new Error(`Server response not OK: ${response.status} ${response.statusText}`);
            }
            const data = await response.json();
            console.log(data);
            navigate('/login')
          }
        } catch (error) {
            console.error('Error:', error);
        }
    } else {
        return false;
    }
};

  return (
    <div>
      <div className="sign-up-wrapper">
        <div className="signup-left-div">
          <img alt="signup-page-pic" className="signup-img" src="https://s3-alpha-sig.figma.com/img/6730/daf4/8c1900d4c82b3ff04e1683d0d57efd85?Expires=1704672000&Signature=MHN~SDGN7IurRKmxEqP~o9t-9vmOTtylyvmQvPU4qj~pcE3pqClzhL9z3395znl6xAvH4iQQtWNzQ0bFD33wye9xJwUJYgSA01iGpL~8s-De9KuY2TiFqhE1vrItIsg5Z97WLSZ6JS3ChacdfE1XYMTPJQ7-cMg5~K2-dSK0fBSnxvpccyB1ZDyA8MoCWY6Rk5fQ1b9j-bymljZYXHHe5-uYUL8nD2cWZ241eBNz8xJMDSDbOZUvUPzXocbSTs1HIY7mba6jHkhUWDF~QF1WADEQgJpqoKdtsfeeefCox8qUUXlat4N0uq-AbXNEosed0pVCZM~2~UHlkJBbccpmlA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4" />
        </div>
        <div className="signup-right-div">
        <div className="container">
          <form id="signup-form" onSubmit={handleForm}>
              <h4 className="login-header">Login to your account</h4>
              <div className="mb-3" style={{ marginTop: "35px" }}>
                  <label htmlFor="inputName" className="form-label">Name<span className="astrick">*</span></label>
                  <input type="text" className="form-control" id="inputName" aria-describedby="emailHelp" required
                    name="username" onChange={handleChange} placeholder="Enter Your Name"/>
                  {<p style={{ color: 'red' }}>{formError.username}</p> }
              </div>
              <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">Email address or username<span className="astrick">*</span></label>
                  <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" required
                    name="email" onChange={handleChange} placeholder="Enter Email address"/>
                  {<p style={{ color: 'red' }}>{formError.email}</p> }

              </div>
              <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">Enter Password<span className="astrick">*</span></label>
                  <input type="password" className="form-control" id="exampleInputPassword1" required
                    name="password" onChange={handleChange}  placeholder="Enter Password"/>
                    {<p style={{ color: 'red' }}>{formError.password}</p> }
              </div>
              <div className="mb-3">
                  <label htmlFor="inputNumber" className="form-label">Enter Phone Number<span className="astrick">*</span></label>
                  <input type="number" className="form-control exampleInput" id="inputNumber" aria-describedby="emailHelp" required
                    name="phone" onChange={handleChange}  placeholder="Enter Your Phone Number"/>
                  {<p style={{ color: 'red' }}>{formError.phone}</p> }
              </div>
              <div className="mb-3">
               <label htmlFor="inputNumber" className="form-label">Gender<span className="astrick">*</span></label><br></br>
                <input type="radio" id="male" onChange={handleChange} name="gender" value="male"/>
                <label htmlFor="male" className="gender-label">Male</label>
                <input type="radio" id="female" onChange={handleChange} name="gender" value="female"/>
                <label htmlFor="female" className="gender-label">Female</label>
                <input type="radio" id="na" onChange={handleChange} name="gender" value="na"/>
                <label htmlFor="na" className="gender-label">Don't wish to specify</label>
               </div>
               <div className="mb-3">
                  <label htmlFor="inputAge" className="form-label">Age<span className="astrick">*</span></label>
                  <input type="number" min="14" max="200" className="form-control exampleInput" id="inputAge" aria-describedby="emailHelp" required
                    name="age" onChange={handleChange} placeholder="Enter age"/>
              </div>
              <div className="mb-3">
                  <label htmlFor="inputAddress" className="form-label">Address<span className="astrick">*</span></label>
                  <input type="text" className="form-control exampleInput" id="inputAddress" aria-describedby="emailHelp" required
                    name="address" onChange={handleChange} placeholder="Enter address/use live location"/>
              </div>
              <div className="mb-3">
                  <label htmlFor="inputCity" className="form-label">City<span className="astrick">*</span></label>
                  <input type="text" className="form-control exampleInput" id="inputCity" aria-describedby="emailHelp" required
                    name="city" onChange={handleChange}  placeholder="Enter city"/>
              </div>
              <div className="mb-3">
                  <label htmlFor="inputState" className="form-label">State<span className="astrick">*</span></label>
                  <input type="text" className="form-control exampleInput" id="inputState" aria-describedby="emailHelp" required
                    name="state" onChange={handleChange} placeholder="Enter state"/>
              </div>
              <div className="mb-3">
                  <label htmlFor="inputPincode" className="form-label">Pincode<span className="astrick">*</span></label>
                  <input type="number" className="form-control exampleInput" id="inputPincode" aria-describedby="emailHelp" required
                    name="pincode" onChange={handleChange} placeholder="Enter pincode"/>
                  {<p style={{ color: 'red' }}>{formError.pincode}</p> }
              </div>
              <div id="emailHelp" className="form-text">
                <NavLink to='/forgotpassword' className="forgot-pass-link">Forget Password?</NavLink>
              </div>
              <div className="mb-3 form-check">
                <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                <label className="form-check-label" htmlFor="exampleCheck1">Remember me.</label>
              </div>
              <div className="d-flex justify-content-center">
                  <button type="submit" className="btn btn-primary signupBtn">
                      Sign Up
                  </button>                             
              </div>
              <div className="frame4">
                <div className="frame-item" />
                <div className="or">OR</div>
                <div className="frame-item" />
              </div>
              <div className="d-flex justify-content-center">
              <button  type="button" className="btn btn-primary phone-btn">
                 <img src="../resources/googleLogo.svg" className="google-logo"/> <span>Login With Gmail</span>
              </button>
              </div>
              <div className="d-flex justify-content-center" style={{marginTop:"10px"}}>
                 <div id="emailHelp" className="form-text" style={{fontWeight:"700"}}>
                     Already have an account?<span><NavLink to='/login' className="signup-text">Login</NavLink></span>
                 </div>               
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
};

export default SignUp;
