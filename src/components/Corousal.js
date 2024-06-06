import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
export default function Corousal() {
    return (
        <div>
            <div>
                <div id="carouselExampleFade" class="carousel slide carousel-fade" data-bs-ride="carousel" style={{ objectFit: "contain !important" }}>
                    <div class="carousel-inner corousel-box" id='corousel'>
                        <div class="carousel-caption d-none d-md-block " style={{ zIndex: "10" }}>
                            <form class="d-flex">
                                <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                                <button class="btn btn-outline-success bg-success text-white" type="submit">Search</button>
                            </form>
                        </div>
                        <div class="carousel-item active">
                            <img src="https://source.unsplash.com/random/900×700/?burger" class="d-block w-100" style={{ filter: "brightness(40%)" }} alt="..." />
                        </div>
                        <div class="carousel-item">
                            <img src="https://source.unsplash.com/random/900×700/?pizza" class="d-block w-100" style={{ filter: "brightness(40%)" }} alt="..." />
                        </div>
                        <div class="carousel-item">
                            <img src="https://source.unsplash.com/random/900×700/?noodles" class="d-block w-100" style={{ filter: "brightness(40%)" }} alt="..." />
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
        </div>
    )
}
