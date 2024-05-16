import React from 'react';
import itemPic from "../assets/img/products/img-5.png"
import { useQuery } from 'react-query';
import { droneGetRequest } from '../hooks/users.hooks';
import ErrorBoundary from '../components/ErrorBoundary.components';
import { CircularProgress } from '@mui/material';


function AdminViewDrones() {
    const maxCapacity = {
        small: 15,
        medium: 25,
        large: 40
    } 
    const getAvailabilityQuery = useQuery("get drone availability fro admin", droneGetRequest)

    const dronesHTML = ["small", "medium", "large"].map(drone => {
        const isAvailable = getAvailabilityQuery.data?.body[drone] > 0
        return (
            <div className="col-md-4">
                <div className={`white_card position-relative mb_20 ${!isAvailable ? "grey-div" : ""}`}>
                    <div className="card-body">
                        <img src={itemPic} alt="" className={`d-block mx-auto my-4 ${!isAvailable ? "grey-img" : ""}`} height="150" />
                        <div className="row my-4">
                            <div className="col">
                                <span style={{ background: isAvailable ? "green": "red", color: "white" }} className="badge_btn_3  mb-1">{isAvailable? "Available": "Unavailable"}</span> 
                                <a href className="f_w_400 color_text_3 f_s_14 d-block">{drone.toLocaleUpperCase()}</a>
                            </div>
                            <div className="col-auto">
                                <p className="text-dark mt-0">Qty Available: {getAvailabilityQuery.data?.body[drone]}</p>
                                <p className="text-dark mt-0">Max Capacity: {maxCapacity[drone]}KG</p>
                                <p className="text-dark mt-0">Price: #{(maxCapacity[drone]*1000).toLocaleString()}</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        )
    })

    return (
        getAvailabilityQuery.isLoading ?
        <CircularProgress sx={{color: "#ffb11f", margin: "200px 400px"}} size={100}/> :
        <ErrorBoundary message="There was an error while fetching the drones. Check your internet and try again" refetch={getAvailabilityQuery.refetch} isError={getAvailabilityQuery.isError}>
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
                <div className="row">{dronesHTML}</div>
            </div>
        </ErrorBoundary>
    )
}


export default AdminViewDrones