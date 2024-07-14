import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Card from '../components/Card';
import Carousel from '../components/Carousel';

export default function Home() {
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);

  const loadData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/foodData", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      setFoodItem(data[0]); // Assuming data[0] contains food items
      setFoodCat(data[1]); // Assuming data[1] contains food categories
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <Navbar />
      <Carousel />
      <div className='container'>
        {
          foodCat.length !== 0
          ? foodCat.map((category, index) => (
              <div key={index}>
                {category.CategoryName} {/* Render category name */}
              </div>
            ))
          : <div>No categories available</div>
        }
        <Card />
      </div>
      <Footer />
    </div>
  );
}
