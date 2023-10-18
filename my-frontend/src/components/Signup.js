//importing required image,packages,library
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
// import logo from '../logo.png';

//signup component
const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  //handle signup process
  const handleSignup = async () => {
    //POST request for signup
    try {
      const response = await fetch(
        "https://busy-pink-chinchilla-shoe.cyclic.app/user/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, email, password, role }),
        }
      );

      if (response.ok) {
        alert("Signup successful");
        navigate('/');
      } else {
        alert("Signup failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
        <h1>Hello folks!</h1>
        {/* <img className="image" src={logo} alt="logo" /> */}
        <div className="main">
      <h2>Signup</h2>
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
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
      <div>
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="">Select Role</option>
          <option value="dealer">Dealer</option>
          <option value="buyer">Buyer</option>
        </select>
      </div>
      <button onClick={handleSignup}>Signup</button>
      <h4>
        Already Registered? <Link to="/">Login</Link>
      </h4>
    </div>
    </div>
   
  );
};

export default Signup;
