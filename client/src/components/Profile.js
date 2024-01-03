import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Profile = () => {
  const userId = Cookies.get("userId");
  const [updatedUserData,setUpdatedUserData] = useState({});
  const [userData,setUserData] = useState();
  const [editMode, setEditMode] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e)=>{
    const {name,value} = e.target;
    setUpdatedUserData((prev)=>{
      return {...prev, [name]:value }
    })
  }

  const getUserDetails = async (userId) => {
    try {
      const response = await fetch(`/api/user/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error(`Server response not OK: ${response.status} ${response.statusText}`);
      }
  
      const userDetails = await response.json();
      console.log('User Details:', userDetails);
      setUserData(userDetails);
      return userDetails;
    } catch (error) {
      console.error('Error fetching user details:', error);
      return null;
    }
  };

  const updateUser = ()=>{
    console.log(updatedUserData);
    fetch(`/api/user/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedUserData),
    }).then((response) => {
        if (!response.ok) {
          throw new Error(`Server response not OK: ${response.status} ${response.statusText}`);
        }
        return response.json();
      }).then((data) => {
        setEditMode(false);
        console.log('User updated successfully:', data);
      }).catch((error) => {
        console.error('Error updating user:', error);
      });
  }

  const logoutUser = ()=>{
     Cookies.remove("userId");
     Cookies.remove("token");
     navigate('/login');
  }

  const handleEditClick = () => {
    setEditMode(true);
  };

  useEffect(() => {
    getUserDetails(userId);
  }, [userId]);
  
  return (
    <div>
      <div className="container">
      {userData && (
         <div className="profile-container">
          <div className="profile-img-wrapper">
            <img alt="profile of user" className="profile-page-img" src="https://s3-alpha-sig.figma.com/img/e632/dc20/86efa3df337e8c215dd8095476bb6513?Expires=1704672000&Signature=U~lQUCHNgQtQFcnC7BLJdHcczYHkpevAjBQAfxVcEDr3n7ztNiWmCHz4tvFvP4vxcnzPPrJHGliGORTnSy2ffYsmfxHt8r4G2-JU3YLR~iP3WQmp0UQ4pLY19BF4YACtrqzfKh2-~17ekNauoz9uBR8PSWVYmkbyNljYDlNi007Y0xUCN82NrLUiws66RFOaXu-qL566y97Cm4v8FQ5cwXXnqhG3oR0P5iBaodsHKXgSTuwAWDJ3JP0zIb7oe5Gqrn9z9pQnsYsV56VGA3KgkHXzjFtFJqbWjXxZPlrhzIQTzZ8HnJWltfo3iRgKcvHdTfmEGLaKpag07HZ6zYRHYA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"/>
            <img alt="plus icon" className="plus-icon" src="../resources/plus.png" />
          </div>
          <h2 className="userName-header">Hello, {userData.username} </h2>
        <button type="button" className="btn btn-primary logout-btn edit-btn" onClick={handleEditClick} >
            Edit Profile <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                 <path d="M3.3335 12H6.16016C6.2479 12.0005 6.33488 11.9837 6.4161 11.9505C6.49732 11.9173 6.5712 11.8685 6.6335 11.8067L11.2468 7.18667L13.1402 5.33333C13.2026 5.27136 13.2522 5.19762 13.2861 5.11638C13.3199 5.03514 13.3374 4.94801 13.3374 4.86C13.3374 4.77199 13.3199 4.68485 13.2861 4.60362C13.2522 4.52238 13.2026 4.44864 13.1402 4.38667L10.3135 1.52667C10.2515 1.46418 10.1778 1.41458 10.0965 1.38074C10.0153 1.34689 9.92817 1.32947 9.84016 1.32947C9.75215 1.32947 9.66502 1.34689 9.58378 1.38074C9.50254 1.41458 9.4288 1.46418 9.36683 1.52667L7.48683 3.41333L2.86016 8.03333C2.79838 8.09563 2.74949 8.1695 2.71632 8.25073C2.68314 8.33195 2.66632 8.41893 2.66683 8.50667V11.3333C2.66683 11.5101 2.73707 11.6797 2.86209 11.8047C2.98712 11.9298 3.15668 12 3.3335 12ZM9.84016 2.94L11.7268 4.82667L10.7802 5.77333L8.8935 3.88667L9.84016 2.94ZM4.00016 8.78L7.9535 4.82667L9.84016 6.71333L5.88683 10.6667H4.00016V8.78ZM14.0002 13.3333H2.00016C1.82335 13.3333 1.65378 13.4036 1.52876 13.5286C1.40373 13.6536 1.3335 13.8232 1.3335 14C1.3335 14.1768 1.40373 14.3464 1.52876 14.4714C1.65378 14.5964 1.82335 14.6667 2.00016 14.6667H14.0002C14.177 14.6667 14.3465 14.5964 14.4716 14.4714C14.5966 14.3464 14.6668 14.1768 14.6668 14C14.6668 13.8232 14.5966 13.6536 14.4716 13.5286C14.3465 13.4036 14.177 13.3333 14.0002 13.3333Z" fill="white"/>
                 </svg>
        </button> 
        </div> 
        )}
      </div>
      {
          userData && (
            <div className="profile-wrapper">
      <div className="profile-left-div">
      <div className="container">
          <form id="signup-form">
              <h4 className="profile-header">General Details</h4>
              <div className="mb-3" style={{ marginTop: "35px" }}>
                  <label htmlFor="inputName" className="form-label">Name</label>
                  <input type="text" {...(editMode ? { defaultValue: userData.username } : { value: userData.username })} className="form-control" id="inputName" aria-describedby="emailHelp" required
                    name="username" onChange={handleChange} placeholder="Enter Your Name"/>
              </div>
              <div className="mb-3" >
                  <label htmlFor="inputName" className="form-label">Email address</label>
                  <input type="text" {...(editMode ? { defaultValue: userData.email } : { value: userData.email })} className="form-control" id="inputName" aria-describedby="emailHelp" required
                    name="email" onChange={handleChange} placeholder="Enter Your email"/>
              </div><div className="mb-3">
                  <label htmlFor="inputName" className="form-label">Enter Password</label>
                  <input type="text" className="form-control" id="inputName" aria-describedby="emailHelp" required
                    name="password" onChange={handleChange} placeholder="Enter Your password"/>
              </div><div className="mb-3">
                  <label htmlFor="inputName"  className="form-label">Enter phone number</label>
                  <input type="text" {...(editMode ? { defaultValue: userData.phone } : { value: userData.phone })} className="form-control" id="inputName" aria-describedby="emailHelp" required
                    name="phone" onChange={handleChange} placeholder="Enter Your phone number"/>
              </div><div className="mb-3">
                  <label htmlFor="inputName" className="form-label">Gender</label>
                  <input type="text" {...(editMode ? { defaultValue: userData.gender } : { value: userData.gender })} className="form-control" id="inputName" aria-describedby="emailHelp" required
                    name="gender" onChange={handleChange} placeholder="gender"/>
              </div>
           </form>
        </div>
      </div>
      <div className="profile-right-div">
      <div className="container">
      <form id="signup-form">
              <h4 className="profile-header">Contact Details</h4>
              <div className="mb-3" style={{ marginTop: "35px" }}>
                  <label htmlFor="inputName" className="form-label">Address</label>
                  <input type="text" {...(editMode ? { defaultValue: userData.address } : { value: userData.address })} className="form-control" id="inputName" aria-describedby="emailHelp" required
                    name="address" onChange={handleChange} placeholder="Enter Your Address"/>
              </div>
              <div className="mb-3" >
                  <label htmlFor="inputName" className="form-label">City</label>
                  <input type="text" {...(editMode ? { defaultValue: userData.city } : { value: userData.city })} className="form-control" id="inputName" aria-describedby="emailHelp" required
                    name="city" onChange={handleChange} placeholder="City"/>
              </div>
              <div className="mb-3">
                  <label htmlFor="inputName" className="form-label">State</label>
                  <input type="text" {...(editMode ? { defaultValue: userData.stae } : { value: userData.state })} className="form-control" id="inputName" aria-describedby="emailHelp" required
                    name="state" onChange={handleChange} placeholder="State"/>
              </div>
              <div className="mb-3">
                  <label htmlFor="inputName" className="form-label">Pincode</label>
                  <input type="text" {...(editMode ? { defaultValue: userData.pincode } : { value: userData.pincode })} className="form-control" id="inputName" aria-describedby="emailHelp" required
                    name="pincode" onChange={handleChange} placeholder="Enter Your Pincode"/>
              </div>
              <div className="mb-3">
                  <label htmlFor="inputName" className="form-label">Age</label>
                  <input type="text" {...(editMode ? { defaultValue: userData.age } : { value: userData.age })} className="form-control" id="inputName" aria-describedby="emailHelp" required
                    name="age" onChange={handleChange} placeholder="Enter Your Age"/>
              </div>
           </form>
           <div>
                <div className="d-flex justify-content-center ">
                  <button onClick={updateUser} disabled={!editMode} className="btn btn-primary save-btn">
                     Save Changes
                  </button>    
                  <button type="button" onClick={logoutUser}  className="btn btn-primary logout-btn">
                     Log Out
                  </button>                             
              </div>
            </div>
           </div>
      </div>
      </div>
          )
        }
    </div>
  )
};

export default Profile;
