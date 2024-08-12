import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function MyOrder() {
    const [orderData, setOrderData] = useState([]);
    const [userEmail] = useState(localStorage.getItem('userEmail'));

    const fetchMyOrder = async () => {
        console.log("Email to be used for fetching orders:", userEmail);

        if (!userEmail) {
            console.error("No email provided.");
            return;
        }

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/myOrder`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email: userEmail })
            });
    
            const data = await response.json();
            console.log("Fetched Order Data:", data);
            setOrderData(data.orderData?.order_data || []); 
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    };

    useEffect(() => {
        fetchMyOrder();
    }, [userEmail]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return isNaN(date) ? null : date.toLocaleDateString();
    };

    return (
        <div>
            <Navbar />
            <div className="container">
                <div className="row">
                    {orderData.length > 0 ? (
                        orderData
                            .slice(0)
                            .reverse()
                            .map((itemArray, index) => (
                                <div className="col-12" key={index}>
                                    <ul className="list-group mt-3">
                                        {itemArray.map((arrayData, subIndex) => {
                                            const formattedDate = formatDate(arrayData.Order_date);
                                            return (
                                                <li className="list-group-item" key={subIndex}>
                                                    <h5>{arrayData.name}</h5>
                                                    <p>Quantity: {arrayData.qty}</p>
                                                    <p>Size: {arrayData.size}</p>
                                                    {formattedDate && <p>Date: {formattedDate}</p>}
                                                    <p>Price: ৳{arrayData.price}/-</p>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>
                            ))
                    ) : (
                        <p>No order is found.</p>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
}
