import React, { useEffect, useState,useRef } from 'react';
import { useCart, useDispatchCart } from './ContextReducer';

export default function Card(props) {
  let dispatch=useDispatchCart();
  let data=useCart()
  const priceRef=useRef();
  let options = props.options;
  let priceOptions = Object.keys(options);
  const [qty,setQty]=useState(1)
  const [size,setSize]=useState("")
  const handleAddToCart=async ()=>{
    await dispatch({type:'ADD',id:props.foodItem._id,name:props.foodItem.name,price:props.finalPrice,qty:qty,size:size})
  console.log(data)
  }
  let finalPrice=qty* parseInt(options[size]);
  useEffect(()=>{
    setSize(priceRef.current.value)
  },[])
  return (
    <div>
      <div className="card mt-3" style={{ width: "18rem", maxHeight: "500px" }}>
        <img src={props.foodItem.img} className="card-img-top" alt={props.foodName} style={{ height: "250px", objectFit: "fill" }} />
        <div className="card-body">
          <h5 className="card-title">{props.foodItem.name}</h5>
          <div className='container w-100'>
            <select className='m-2 h-100 w-100 bg-success' onChange={(e)=>setQty(e.target.value)}>
              {
                Array.from(Array(6), (e, i) => {
                  return (
                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                  )
                })
              }
            </select>
            <select className='m-2 h-100 w-100 bg-success rounded' ref={priceRef} onChange={(e)=>setSize(e.target.value)}>
              {priceOptions.map((data) => (
                <option key={data} value={data}>{data}</option>
              ))}
            </select>
            <div className='d-inline h-100 fs-5'>
              BDT{finalPrice}/-
            </div>
          </div>
          <button className={'btn btn-success juatify-center ms-2'}onClick={handleAddToCart}>Add to Cart</button>

        </div>
      </div>
    </div>
  );
}