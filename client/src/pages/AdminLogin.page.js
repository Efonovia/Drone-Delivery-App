import React from 'react';
import  "../styles/AdminLogin.css"


function AdminLogin() {


    return (
        <>
            <div className="section">
                <div className="container">
                    <div className="row full-height justify-content-center">
                        <div className="col-12 text-center align-self-center py-5">
                            <div className="section pb-5 pt-5 pt-sm-2 text-center">
                                <div className="card-3d-wrap mx-auto">
                                    <div className="card-3d-wrapper">
                                        <div className="card-front">
                                            <div className="center-wrap">
                                            <div className="section text-center">
                                                <h4 style={{color: "#ffb11f"}} className="mb-4 pb-3">Administrator Log In</h4>
                                                <div className="admin-form-group">
                                                <input type="email" name="email" className="form-style" placeholder="Email" id="logemail" autocomplete="off"/>
                                                <i className="input-icon uil uil-at"></i>
                                                </div>
                                                <div className="admin-form-group mt-2">
                                                <input type="password" name="password" className="form-style" placeholder="Password" id="logpass" autocomplete="off"/>
                                                <i className="input-icon uil uil-lock-alt"></i>
                                                </div>
                                                <a href className="btn mt-4">login</a>
                                            </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


export default AdminLogin