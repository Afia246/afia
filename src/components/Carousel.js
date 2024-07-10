import React from 'react';

export default function Carousel() {
  return (
    <div>
      <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{ objectFit: "contain !important" }}>
        <div className="carousel-inner" id='carousel'>
          <div 
            className="carousel-caption d-flex justify-content-center align-items-center" 
            style={{ zIndex: "10", height: "100%", top: "0" }}
          >
            <form className="d-flex w-75">
              <input 
                className="form-control me-2" 
                type="search" 
                placeholder="Search" 
                aria-label="Search"
                style={{ height: '50px', fontSize: '20px' }} // Larger input box
              />
              <button 
                className="btn btn-outline-success text-white bg-success" 
                type="submit"
                style={{ height: '50px', fontSize: '20px' }} // Larger button
              >
                Search
              </button>
            </form>
          </div>

          <div className="carousel-item active">
            <img src="/images/coffe1.jpeg" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="Coffe"/>
          </div>
          <div className="carousel-item">
            <img src="/images/coffe2.jpg" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="Pastry"/>
          </div>
          <div className="carousel-item">
            <img src="/images/coffe3.jpg" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="Croissant"/>
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
    </div>
  );
}