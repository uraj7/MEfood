import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatchCart, useCart } from './ContextReducer';

export default function Card(props) {
  const data = useCart();
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");
  const priceRef = useRef();
  const options = props.options;
  const priceOptions = Object.keys(options);
  const foodItem = props.foodItems;
  const dispatch = useDispatchCart();

  const handleClick = () => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }

  const handleQty = (e) => {
    setQty(e.target.value);
  }

  const handleOptions = (e) => {
    setSize(e.target.value);
  }

  const handleAddToCart = async () => 
  {
    let food = [];
    for (const item of data) {
      if (item.id === foodItem._id) {
        food = item;
        break;
      }
    }

    if (food.length !== 0) 
    {
      if (food.size === size) 
      {
        await dispatch({ type: "UPDATE", id: foodItem._id, price: finalPrice, qty: qty });
        return
      } 
      else if(food.size !== size)
      {
        await dispatch({ type: "ADD", id: foodItem._id, name: foodItem.name, price: finalPrice, qty: qty, size: size, img: props.ImgSrc });
        console.log("Size different so simply ADD one more to the list");
        return
      }
      return

    } 
    
      await dispatch({ type: "ADD", id: foodItem._id, name: foodItem.name, price: finalPrice, qty: qty, size: size });
      
  }

  useEffect(() => {
    setSize(priceRef.current.value);
  }, []);

  let finalPrice = options[size] ? qty * parseInt(options[size]) : 0;

  return (
    <div>
      <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
        <img src={props.ImgSrc} className="card-img-top" alt="..." style={{ height: "120px", objectFit: "fill" }} />
        <div className="card-body">
          <h5 className="card-title">{foodItem.name}</h5>
          <div className='container w-100 p-0' style={{ height: "38px" }}>
            <select className="m-2 h-100 w-20 bg-success text-black rounded" onChange={handleQty}>
              {Array.from(Array(6), (e, i) => {
                return <option key={i + 1} value={i + 1}>{i + 1}</option>;
              })}
            </select>
            <select className="m-2 h-100 w-20 bg-success text-black rounded" ref={priceRef} onChange={handleOptions}>
              {priceOptions.map((i) => {
                return <option key={i} value={i}>{i}</option>;
              })}
            </select>
            <div className=' d-inline ms-2 h-100 w-20 fs-5' >
              ₹{finalPrice}/-
            </div>
          </div>
          <hr></hr>
          <button className={`btn btn-success justify-center ms-2 `} onClick={handleAddToCart}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
}
