import React, { useState } from 'react'; //importing react library
import { useNavigate, Link } from "react-router-dom"; //importing package 
// import logo from '../logo.png';  //importing image

//Login Component
const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState('');

  //handle login process
  const handleLogin = async () => {
    //POST request for login
    try {
      const response = await fetch('https://busy-pink-chinchilla-shoe.cyclic.app/user/login', {
        method: 'POST',
        headers: {
          
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        
        localStorage.setItem('token', data.token);
        setUserRole(data.role);
        if (data.role === 'dealer') {
            console.log('Navigating to dealer-inventory');
            navigate('/dealer-inventory');
          } else if (data.role === 'buyer') {
            console.log('Navigating to buyer-inventory');
            navigate('/buyer-inventory');
          }
        alert('login successful');
      } else {
        alert('Login failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
        <h1>Hello folks!</h1>
        {/* <img className="image" src={logo} alt="logo" /> */}
        <div className='main'>
        
        <h2>Login</h2>
        <div>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button  onClick={handleLogin}>Login</button>
        <h4>Account not created? <Link to ="/signup">Signup</Link> </h4>
      </div>
    </div>
    
   
  );
};

export default Login;
