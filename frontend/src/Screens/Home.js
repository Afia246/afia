import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Card from '../components/Card';

export default function Home() {
  const [search, setSearch] = useState('');
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);

  const loadData = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/foodData`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      setFoodItem(data[0] || []); // Ensure data[0] is an array
      setFoodCat(data[1] || []); // Ensure data[1] is an array
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
      <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{ objectFit: "contain !important" }}>
        <div className="carousel-inner" id='carousel'>
          <div 
            className="carousel-caption d-flex justify-content-center align-items-center" 
            style={{ zIndex: "10", height: "100%", top: "0" }}
          >
            <div className="d-flex justify-content-center w-75">
              <input 
                className="form-control me-2" 
                type="search" 
                placeholder="Search" 
                aria-label="Search"
                style={{ height: '50px', fontSize: '20px' }} // Larger input box
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button 
                className="btn btn-outline-success text-white bg-success" 
                type="submit"
                style={{ height: '50px', fontSize: '20px' }} // Larger button
              >
                Search
              </button>
            </div>
          </div>

          <div className="carousel-item active">
            <img src="/images/bg01.jpg" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="Coffee"/>
          </div>
          <div className="carousel-item">
            <img src="/images/bg02.jpg" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="Pastry"/>
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      <div className='container'>
        {
          foodCat.length > 0 
          ? foodCat.map((data, index) => (
            <div key={data.id || index} className='row mb-3'>
              <div className="fs-3 m-3">
                {data.CategoryName} 
                <hr />
              </div>
              {
                foodItem.length > 0 
                ? foodItem
                  .filter((item) => item.CategoryName === data.CategoryName && item.name.toLowerCase().includes(search.toLowerCase()))
                  .map((filterItems, idx) => (
                    <div key={filterItems._id || idx} className="col-12 col-md-6 col-lg-3">
                      <Card 
                        foodItem={filterItems}
                        options={filterItems.options[0]}
                        description={filterItems.description}
                      />
                    </div>
                  ))
                : <div>No such data found</div>
              }
            </div>
          ))
          : <div>No categories found</div>
        }
      </div>
      <Footer />
    </div>
  );
}
