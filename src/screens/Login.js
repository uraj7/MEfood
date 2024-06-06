import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';  // Import the CSS file

export default function Login() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "" // Fixed typo in the state variable name
  });
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(JSON.stringify({
      email: credentials.email,
      password: credentials.password
    }));

    const response = await fetch("http://localhost:5000/api/loginuser", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      })
    });

    const json = await response.json();
    console.log(json);

    if (!json.success) {
      alert("Enter Valid Credentials");
    }

    if (json.success) {
      localStorage.setItem("userEmail", credentials.email);
      localStorage.setItem("authToken", json.authToken);
      console.log(localStorage.getItem("authToken"));
      navigate("/");
    }
  };

  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  return (
    <div className="login-container">
      <div className="card login-card">
        <div className="card-body">
          <h3 className="card-title text-center">Login</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
              <input type="email" className="form-control" name="email" value={credentials.email} onChange={onChange} id="exampleInputEmail1" aria-describedby="emailHelp" />
              <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
              <input type="password" className="form-control" name="password" value={credentials.password} onChange={onChange} id="exampleInputPassword1" />
            </div>
            <button type="submit" className="btn btn-primary w-100">Submit</button>
            <Link to="/signup" className="btn btn-link w-100 mt-2">New user? Sign up</Link>
          </form>
        </div>
      </div>
    </div>
  );
}
