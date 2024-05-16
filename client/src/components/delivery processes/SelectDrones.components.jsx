import React from 'react';
import itemPic from "../../assets/img/products/img-5.png"
import { useQuery } from 'react-query';
import { droneGetRequest } from '../../hooks/users.hooks';
import ErrorBoundary from '../ErrorBoundary.components';
import { CircularProgress } from '@mui/material';


function SelectDrones(props) {
    const maxCapacity = {
        small: 15,
        medium: 25,
        large: 40
    } 

    const getAvailabilityQuery = useQuery("get drone availability", droneGetRequest,
        { 
            cacheTime: 0,
            staleTime: 300000,
            // onSuccess: () => setCurrentProcess(elements.find(element => !element.completed))
        }
    )

    function pickDrone(drone) {
        if(props.type === "old") return
        if(!getAvailabilityQuery.data.body[drone] > 0) return
        props.setDeliveryDetails(prev => {
            return {
                ...prev,
                droneType: drone
            }
        })

        props.completeProcess(props.index)

    }

    const dronesHTML = ["small", "medium", "large"].map(drone => {
        const classForNew = props.deliveryDetails.droneType === drone ? "selected" : (getAvailabilityQuery?.data?.body?.[drone] > 0 ? "select-drone" : "select-drone-unavailable-div")
        const classForOld =  props.deliveryDetails.droneType === drone ? "selected" : ""

        return (
            <div key={drone} onClick={()=>pickDrone(drone)} className={`${props.type === "new" ? classForNew: classForOld} col-md-4`}>
                <div className={`white_card position-relative ${props.type === "new" ? classForNew: classForOld}`}>
                    <div className="card-body">
                        <img src={itemPic} alt="" className={`d-block mx-auto ${props.type==="new" && !getAvailabilityQuery?.data?.body?.[drone] > 0 && "select-drone-unavailable-img"}`} height="150" />
                        <div className="row">
                            <div className="col">
                                {props.type === "new"&&<span style={{ background: getAvailabilityQuery?.data?.body?.[drone] > 0?"green":'red', color: "white" }} className="badge_btn_3  mb-1">{getAvailabilityQuery.data?.body?.[drone] > 0?"Available": "Unavailable"}</span> }
                                <a style={{color: "black"}} href className="f_w_400 f_s_14 d-block">{drone.toLocaleUpperCase()}</a>
                            </div>
                            <div>
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
        <ErrorBoundary message="There was an error fetching the drones. Check Your Internet and try again" isError={getAvailabilityQuery.isError}>
            {getAvailabilityQuery.isLoading ? 
            (<CircularProgress sx={{color: "#ffb11f"}} size={100}/>) : 
            (<div className="container-fluid p-0">
                    <div className="row">
                        <div className="col-12">
                            <div className="page_title_box d-flex align-items-center">
                                <div style={{width: "100%"}} className="page_title_left">
                                    <h3 style={{textAlign: "center", width: "100%", padding: "0"}} className="f_s_30 f_w_700 dark_text">{props.type === "new" ? "Select a Drone": "Selected Drone"}</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">{dronesHTML}</div>
                </div>
            )}
            {props.isCompleted && <button style={{marginTop: "10px"}} onClick={() => props.goToElement(props.index + 1)} type="button" className="btn btn-outline-success mb-3">Proceed</button>}
        </ErrorBoundary>
    );
    
}


export default SelectDrones