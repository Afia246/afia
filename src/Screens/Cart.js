

import React from 'react';
import { useCart, useDispatchCart } from '../components/ContextReducer';
import trash from '../Screens/trash.svg'; // Ensure this path is correct

export default function Cart() {
  let data = useCart(); // Access cart state
  let dispatch = useDispatchCart(); // Access dispatch function

  if (data.length === 0) {
    return (
      <div>
        <div className='m-5 w-100 text-center fs-3'>The Cart is Empty!</div>
      </div>
    );
  }

  // Calculate total price
  const totalPrice = data.reduce((total, item) => total + (item.price * item.qty), 0);

  return (
    <div className='container m-auto mt-5'>
      <table className='table table-hover'>
        <thead className='text-success fs-4'>
          <tr>
            <th scope='col'>#</th>
            <th scope='col'>Name</th>
            <th scope='col'>Quantity</th>
            <th scope='col'>Size</th>
            <th scope='col'>Price</th>
            <th scope='col'></th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td>{item.qty}</td>
              <td>{item.size}</td>
              <td className='text-white'>{item.price * item.qty}</td>
              <td>
                <button type='button' className='btn p-0'>
                  <img src={trash} alt='delete' onClick={() => dispatch({ type: 'REMOVE', index })} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className='fs-2 text-white'>
        <h1>Total Price: {totalPrice.toFixed(2)}</h1>
      </div>
      <div>
        <button className='btn bg-success mt-5'>Check Out</button>
      </div>
    </div>
  );
}
