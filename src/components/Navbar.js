import React, { useState } from 'react'
import {Link,useNavigate} from 'react-router-dom';
import Badge from 'react-bootstrap/Badge'
import Modal from '../Modal';
import Cart from '../screens/Cart';
import { useCart } from './ContextReducer';
export default function Navbar() {
let data = useCart();
const [cartView,setCartView] = useState(false)
  // to navigate
const navigate = useNavigate();
const handleLogout = () =>{
  localStorage.removeItem("authToken")
  navigate("/login")
}
  return (
    <div>
      <nav class="navbar navbar-expand-lg navbar-dark bg-success">
  <div class="container-fluid">
    <Link class="navbar-brand active fs-1 fst-italic" to="/">MEfood</Link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav me-auto mb-2">
        <li class="nav-item">
          <Link class="nav-link active fs-5" aria-current="page" to="/">Home</Link>
        </li>
        {(localStorage.getItem("authToken")) ? 
        <li class="nav-item">
        <Link class="nav-link active fs-5" aria-current="page" to="/myOrder">My orders</Link>
      </li>:""
      }
      </ul>
      {(!localStorage.getItem("authToken")) ? 
        <div class='d-flex'> 
          <Link class="btn bg-white text-success mx-1" to="/login">Login</Link>
          <Link class="btn bg-white text-success mx-1" to="/signup">Signup</Link>
      </div>
      : <div>
          <div class="btn bg-white text-success mx-2" onClick={()=>{setCartView(true)}}>
            My Cart {" "}
            <Badge pill bg='danger' > {data.length} </Badge>
          </div>
          {cartView? <Modal onClose={()=>setCartView(false)}><Cart/></Modal>:null}
          <div class="btn bg-white text-danger mx-1" onClick={handleLogout}>Logout</div>
        </div>
      }
    </div>
  </div>
</nav>
    </div>
  )
}
