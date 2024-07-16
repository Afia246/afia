import React from 'react';
import { useCart, useDispatchCart } from '../components/ContextReducer';
import trash from '../Screens/trash.svg'; // Ensure this path is correct

export default function Cart() {
  const data = useCart(); // Access cart state
  const dispatch = useDispatchCart(); // Access dispatch function

  if (data.length === 0) {
    return (
      <div className='m-5 w-100 text-center fs-3'>
        The Cart is Empty!
      </div>
    );
  }

  // Calculate total price
  const totalPrice = data.reduce((total, item) => total + (item.price * item.qty), 0);

  // Handle checkout process
  const handleCheckout = async () => {
    try {
      let userEmail = localStorage.getItem("userEmail"); // Get user email from localStorage

      const response = await fetch("http://localhost:5000/api/orderData", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          order_data: data,
          email: userEmail,
          order_date: new Date().toDateString()
        })
      });

      console.log("Order Response:", response);

      if (response.status === 200) {
        dispatch({ type: "DROP" }); // Clear the cart upon successful order
      } else {
        console.error("Error placing order:", response.statusText);
        // Handle error state or display error message
      }
    } catch (error) {
      console.error("Error:", error);
      // Handle fetch error or display error message
    }
  };

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
              <td className='text-white'>{(item.price * item.qty).toFixed(2)}</td>
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
        <button className='btn bg-success mt-5' onClick={handleCheckout}>Check Out</button>
      </div>
    </div>
  );
}
