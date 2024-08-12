import React, { useState, useEffect, useRef } from 'react';
import { useCart, useDispatchCart } from './ContextReducer';

export default function Card({ foodItem, options, description }) {
  const dispatch = useDispatchCart();
  const data = useCart();
  const priceRef = useRef();
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");

  const priceOptions = Object.keys(options);

  // Calculate finalPrice based on qty and selected size
  const calculateFinalPrice = () => {
    const sizePrice = options[size] ? parseFloat(options[size]) : 0; // Ensure price is parsed as a number
    return qty * sizePrice; // Total price for the quantity
  };

  // Handle addToCart action
  const handleAddToCart = async () => {
    const finalPrice = calculateFinalPrice();
    await dispatch({
      type: 'ADD',
      id: foodItem._id,
      name: foodItem.name,
      price: finalPrice, // Correctly set price based on qty and size
      qty: qty,
      size: size
    });
    console.log(data);
  };

  // Set initial size based on ref
  useEffect(() => {
    if (priceRef.current && priceOptions.length > 0) {
      setSize(priceOptions[0]); // Initialize size with the first option
    }
  }, [priceOptions]); // Ensure useEffect runs when priceOptions changes

  return (
    <div>
      <div className="card mt-3" style={{ width: "18rem", maxHeight: "500px" }}>
        <img src={foodItem.img} className="card-img-top" alt={foodItem.name} style={{ height: "250px", objectFit: "fill" }} />
        <div className="card-body d-flex flex-column justify-content-between">
          <div>
            <h5 className="card-title">{foodItem.name}</h5>
            <p className="card-text">{description}</p>
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <div className='container w-50'>
              <select className='m-2 h-100 w-100 bg-success' value={qty} onChange={(e) => setQty(parseInt(e.target.value, 10))}>
                {Array.from(Array(6), (e, i) => (
                  <option key={i + 1} value={i + 1}>{i + 1}</option>
                ))}
              </select>
              <select className='m-2 h-100 w-100 bg-success rounded' ref={priceRef} value={size} onChange={(e) => setSize(e.target.value)}>
                {priceOptions.map((data) => (
                  <option key={data} value={data}>{data}</option>
                ))}
              </select>
            </div>
            <div className='d-inline h-100 fs-5'>
              BDT {calculateFinalPrice()}/-
            </div>
          </div>
          <button className='btn btn-success mt-2 align-self-end' onClick={handleAddToCart}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
}
