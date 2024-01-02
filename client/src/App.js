import './App.css';
import { BrowserRouter as Router, Routes ,Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import SignUp from './components/SignUp';
import ForgotPass from './components/ForgotPass';
import NavBar from './components/Navbar';
import About from './components/About';
import Profile from './components/Profile';

function App() {
  return (
    <div className="App">
       <Router>
      <NavBar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgotpassword" element={<ForgotPass />} />
        <Route path="/about" element={<About />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      </Router>

    </div>
  );
}

export default App;
