import React from 'react';
import itemPic from "../assets/img/products/img-5.png"

function AdminViewDrones() {


    return (
        <div className="container-fluid p-0 ">
            <div className="row">
                <div className="col-12">
                    <div className="page_title_box d-flex align-items-center justify-content-between">
                        <div className="page_title_left">
                            <h3 className="f_s_30 f_w_700 dark_text">All Drones</h3>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-4">
                    <div className="white_card position-relative mb_20 ">
                        <div className="card-body">
                            <img src={itemPic} alt="" className="d-block mx-auto my-4" height="150" />
                            <div className="row my-4">
                                <div className="col">
                                    <span style={{ background: "green", color: "white" }} className="badge_btn_3  mb-1">Available</span> 
                                    <a href className="f_w_400 color_text_3 f_s_14 d-block">LARGE</a>
                                </div>
                                <div className="col-auto">
                                    <h4 className="text-dark mt-0">#40,000</h4>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <div style={{cursor: "pointer"}} className="col-md-4">
                    <div className="white_card position-relative mb_20 grey-div">
                        <div className="card-body">
                            <img src={itemPic} alt="" className="d-block mx-auto my-4 grey-img" height="150" />
                            <div className="row my-4">
                                <div className="col">
                                    <span style={{ background: "red", color: "white" }} className="badge_btn_3  mb-1">In Use</span> 
                                    <a style={{ color: "white" }} href className="f_w_400 f_s_14 d-block">LARGE</a>
                                </div>
                                <div className="col-auto">
                                    <h4 className="text-dark mt-0">#40,000</h4>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="col-md-4">
                    <div className="white_card position-relative mb_20 ">
                        <div className="card-body">
                            <div className="ribbon1 rib1-primary"><span className="text-white text-center rib1-primary">50% off</span>
                            </div>
                            <img src="img/products/02.png" alt="" className="d-block mx-auto my-4" height="150" />
                            <div className="row my-4">
                                <div className="col"><span className="badge_btn_3  mb-1">Life Style</span> <a href
                                        className="f_w_400 color_text_3 f_s_14 d-block">Unique Blue Bag</a></div>
                                <div className="col-auto">
                                    <h4 className="text-dark mt-0">$49.00 <small
                                            className="text-muted font-14"><del>$99.00</del></small></h4>
                                    <ul className="list-inline mb-0 product-review align-self-center">
                                        <li className="list-inline-item"><i className="fas fa-star text-warning font-16"></i></li>
                                        <li className="list-inline-item"><i className="fas fa-star text-warning font-16 ms-n2"></i></li>
                                        <li className="list-inline-item"><i className="fas fa-star text-warning font-16 ms-n2"></i></li>
                                        <li className="list-inline-item"><i className="fas fa-star text-warning font-16 ms-n2"></i></li>
                                        <li className="list-inline-item"><i className="fas fa-star-half text-warning font-16 ms-n2"></i>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="d-grid">
                                <button className="btn_2 ">Add To Cart</button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}


export default AdminViewDrones