import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Signup.css';  // Import the CSS file

export default function Signup() {
  const [credentials, setCredentials] = useState({
    name: '',
    email: '',
    password: '',
    location: '',
  });

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/createuser', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      const json = await response.json();

      if (json.success) {
        navigate('/login');
      } else {
        alert('Enter Valid Credentials');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      alert('Failed to fetch data. Please try again later.');
    }
  };

  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  return (
    <div className="signup-container">
      <div className="card signup-card">
        <div className="card-body">
          <h3 className="card-title text-center">Sign Up</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input type="text" className="form-control" name="name" value={credentials.name} onChange={onChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
              <input type="email" className="form-control" name="email" value={credentials.email} onChange={onChange} id="exampleInputEmail1" aria-describedby="emailHelp" />
              <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
              <input type="password" className="form-control" name="password" value={credentials.password} onChange={onChange} id="exampleInputPassword1" />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputlocation" className="form-label">Address</label>
              <input type="text" className="form-control" name="location" value={credentials.location} onChange={onChange} id="exampleInputlocation" />
            </div>
            <button type="submit" className="btn btn-primary w-100">Submit</button>
            <Link to="/login" className="btn btn-link w-100 mt-2">Already a user? Log in</Link>
          </form>
        </div>
      </div>
    </div>
  );
}
