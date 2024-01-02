import React, { useEffect, useState } from 'react';
import { useNavigate,useLocation } from "react-router-dom";
import Cookies from 'js-cookie';


const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = Cookies.get('token');
  const [validToken,setValidToken] = useState(false);

  const handleNavigation = (path,e) => {
    e.preventDefault();
    if(validToken){
      navigate(path);
    }else{
      navigate("/login");
    }
  };

  const fetchAuthenticatedData = async () => {
    try {
      if (!token) {
        console.error('Token not available');
        setValidToken(false);
        return ;
      }

      const response = await fetch('/api/profile', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        setValidToken(false);
        throw new Error(`Server response not OK: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log('Authenticated Data:', data);
      Cookies.set('userId', data.user.userId, { expires: 1 });
      setValidToken(true);
    } catch (error) {
      console.error('Error:', error);
      setValidToken(false);
      navigate('/');
    }
  };

  useEffect(() => {
    if (token) {
      fetchAuthenticatedData();
    } else {
      setValidToken(false);
      navigate('/');
    }
  }, [token]);


  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-transparent">
        <div className="container-fluid">
          <a className="navbar-brand logo-name" onClick={(e) => handleNavigation('/',e)}  >
            <img src="../resources/ellipse.png" alt="Logo" width="54" height="54" className="d-inline-block align-text-top site-logo" style={{ marginRight: "14px" }} />
            Archana's Classes
          </a>
          <div className="collapse navbar-collapse" id="navbarText">

            <ul className="navbar-nav ms-auto">
              <li className={`nav-item ${location.pathname === '/' ? 'active' : 'navbar-links'}`} onClick={(e) => handleNavigation('/',e)}>
                <a className="nav-link" href="/">
                  Home
                </a>
              </li>
              <li className={`nav-item ${location.pathname === '/about' ? 'active' : 'navbar-links'}`} onClick={(e) => handleNavigation('/about',e)}>
                <a className="nav-link" href="/about">
                  About
                </a>
              </li>
              <li className={`nav-item ${location.pathname === '/profile' ? 'active' : 'navbar-links'}`} onClick={(e) =>{ validToken ? handleNavigation('/profile',e) : handleNavigation('/login',e) }}>
                <a className="nav-link" href="/profile">
                  My Profile 
                  <img alt="a man in suit" className="nav-profile-img" src="https://s3-alpha-sig.figma.com/img/e632/dc20/86efa3df337e8c215dd8095476bb6513?Expires=1704672000&Signature=U~lQUCHNgQtQFcnC7BLJdHcczYHkpevAjBQAfxVcEDr3n7ztNiWmCHz4tvFvP4vxcnzPPrJHGliGORTnSy2ffYsmfxHt8r4G2-JU3YLR~iP3WQmp0UQ4pLY19BF4YACtrqzfKh2-~17ekNauoz9uBR8PSWVYmkbyNljYDlNi007Y0xUCN82NrLUiws66RFOaXu-qL566y97Cm4v8FQ5cwXXnqhG3oR0P5iBaodsHKXgSTuwAWDJ3JP0zIb7oe5Gqrn9z9pQnsYsV56VGA3KgkHXzjFtFJqbWjXxZPlrhzIQTzZ8HnJWltfo3iRgKcvHdTfmEGLaKpag07HZ6zYRHYA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"/>
                </a>
              </li>
            </ul>
          </div>

        </div>
      </nav>
    </div>
  )
};

export default NavBar;
