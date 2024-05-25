import React from 'react';
import "../styles/tracker.css"
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { deliveryGetRequest } from '../hooks/users.hooks';
import { CircularProgress } from '@mui/material';
import ErrorBoundary from '../components/ErrorBoundary.components';
import Timer from '../components/Timer.components';
import { dronePic, formatDate, isDateGreaterOrEqual } from '../utils/utils';


function TrackDelivery(props) {
    const deliveryId = useParams().id

    const getDeliveryDetailsQuery = useQuery(
        "get delivery info", 
        ()=>deliveryGetRequest({route: `id/${deliveryId}`}), 
        { 
            enabled: !!deliveryId, 
            cacheTime: 0,
            staleTime: 3000000,
        })

    if(getDeliveryDetailsQuery.isLoading) {
        return <CircularProgress sx={{color: "#ffb11f", margin: "300px 500px"}} size={100}/>
    }

    if(getDeliveryDetailsQuery.isError) {
        return <ErrorBoundary refetch={getDeliveryDetailsQuery.refetch} message="There was an error fetching the delivery details. Check your internet and try again" isError={true}></ErrorBoundary>
    }

    const { pickupLocation, deliveryLocation, deliveryScheduledDate, drone } = getDeliveryDetailsQuery.data?.body

    if(!isDateGreaterOrEqual(new Date(deliveryScheduledDate), new Date())) {
        return <h2 style={{margin: "200px 200px"}}>It isn't time for {props.type === "admin" ? "the":"your"} delivery yet. it's on {formatDate(deliveryScheduledDate)}</h2>
    }

    return (
        <div className={props.type === "admin" ? "track-body-admin" : 'track-body'}>
            <div className='za-details'>
                <h1 style={{color: "#fbb11f"}}><GpsFixedIcon sx={{width:"50px", height:"50px", color: "#373063"}} /> Track {props.type==="user"&&"Your"} Delivery</h1>
                <>
                    <h4>From: <span style={{color: "#373063"}}>{pickupLocation}</span></h4>
                    <h4>To: <span style={{color: "#373063"}}>{deliveryLocation}</span></h4>
                    <h4>Estimated time of arrival: <Timer deliveryDate={deliveryScheduledDate}/></h4>
                </>
            </div>
            <div className='map-container'>
                <div className='route'></div>
                <img className='drone-obj' src={dronePic[drone.type]} alt='drone'></img>
                <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d15755.274985329748!2d7.3408544!3d9.17081735!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sng!4v1716399991558!5m2!1sen!2sng" 
                    width="700"
                    height="450"
                    title='track delivery'
                    loading="lazy"
                    referrerpolicy="no-referrer-when-downgrade">
                </iframe>
            </div>
        </div>
    )
}


export default TrackDelivery