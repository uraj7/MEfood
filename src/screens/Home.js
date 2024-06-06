import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/Card'
// import Corousal from '../components/Corousal'

export default function Home() {
  
  const [search, setsearch] = useState('');
  const [foodCat, setfoodCat] = useState([]);
  const [foodItem, setfoodItem] = useState([]);

  const loadData = async () => {
    let responce = await fetch("http://localhost:5000/api/foodData", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      }
    });

    responce = await responce.json();
    // console.log(responce[0],responce[1]);
    setfoodItem(responce[0])
    setfoodCat(responce[1])
  }
  useEffect(() => { loadData() }, []);

  return (
    <div>
      <div><Navbar /></div>
      <div>
        {/* corousel */}
        <div id="carouselExampleFade" class="carousel slide carousel-fade" data-bs-ride="carousel" style={{ objectFit: "contain !important" }}>
          <div class="carousel-inner corousel-box" id='corousel'>
            <div class="carousel-caption d-none d-md-block " style={{ zIndex: "10" }}>
              <div class="d-flex justify-content-center">
                <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e)=>setsearch(e.target.value)} />
                {/* <button class="btn btn-outline-success bg-success text-white" type="submit">Search</button> */}
              </div>
            </div>
            <div class="carousel-item active">
              <img src="https://source.unsplash.com/random/900×300/?burger" class="d-block w-100" style={{ filter: "brightness(40%)" }} alt="..."  />
            </div>
            <div class="carousel-item">
              <img src="https://source.unsplash.com/random/900×300/?pizza" class="d-block w-100" style={{ filter: "brightness(40%)" }} alt="..." />
            </div>
            <div class="carousel-item">
              <img src="https://source.unsplash.com/random/900×300/?noodles" class="d-block w-100" style={{ filter: "brightness(40%)", objectFit:"fill"}} alt="..." />
            </div>
          </div>
          <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div className='container'>
        {foodCat.length !== 0 ? (
          foodCat.map((data) => {
            return (
              <div key={data._id} className='row mb-3'>
                <div className='fs-3 m-3'>
                  {data.CategoryName}
                </div>
                <hr />
                {foodItem.length !== 0 ? foodItem.filter((item) => (item.CategoryName === data.CategoryName && item.name.toLowerCase().includes(search.toLocaleLowerCase()))).map((filterItems) => {
                  return (
                    <div key={filterItems._id} className='col-12 col-md-6 col-lg-3 mb-1'>
                      <Card foodItems={filterItems} options={filterItems.options[0] } ImgSrc={filterItems.img} />
                    </div>
                  );
                }) : <div>No categories found</div>}
              </div>
            );
          })
        ) : (
          <div>No categories found</div>
        )}
      </div>
      <div><Footer /></div>
    </div>
  );

}
