import React from 'react';
import "../styles/userviewdelivery.css"
import CheckIcon from '@mui/icons-material/Check';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import FeedIcon from '@mui/icons-material/Feed';
import AlertDialogSlide from '../components/mui/AlertDialogSlide.components';
import ErrorBoundary from '../components/ErrorBoundary.components';
import {useQuery} from "react-query"
import { deliveryGetRequest } from '../hooks/users.hooks';
import { useParams } from 'react-router-dom';
import { formatDate, formatTime, getDeliveryStatus } from '../utils/utils';
import { CircularProgress } from '@mui/material';

function UserViewReceivedDelivery() {
    const deliveryId = useParams().id
    const [open, setOpen] = React.useState(false);
    const [type, setType] = React.useState("");

    const handleClickOpen = () => {
      setOpen(true)
    }
  
    const handleClose = () => {
      setOpen(false);
    }

    function handleApproval(approval) {
        setType(approval)
        handleClickOpen()
    }

    const getDeliveryDetailsQuery = useQuery(
        "get delivery info", 
        ()=>deliveryGetRequest({route: `id/${deliveryId}`}), 
        { 
            enabled: !!deliveryId, 
            cacheTime: 0,
            staleTime: 3000000,
            // onSuccess: () => setCurrentProcess(elements.find(element => !element.completed))
        })

    if(getDeliveryDetailsQuery.isLoading) {
        return <CircularProgress sx={{color: "#ffb11f", margin: "300px 500px"}} size={100}/>
    }

    if(getDeliveryDetailsQuery.isError) {
        return <ErrorBoundary message="There was an error fetching the delivery details. Check your intrenet and try again" isError={true}></ErrorBoundary>
    }

    const { sender, drone, pickupLocation, deliveryLocation, deliveryScheduledDate, price, payloadWeight, receiverApproval } = getDeliveryDetailsQuery.data?.body 
    const status = getDeliveryStatus(getDeliveryDetailsQuery.data.body, "receiver")

    return (
        <>
            <AlertDialogSlide type={type} open={open} deliveryId={deliveryId} handleClose={handleClose} refetch={getDeliveryDetailsQuery.refetch} />
            <div className="main-body">
                <h1><FeedIcon sx={{ color: "#ffb11f", height: 45, width: 45 }}/> Delivery Details</h1>
                <div className="delivery-details">
                    <div className="single-detail">Name of sender: <span>{sender.firstName} {sender.lastName}</span></div>
                    <div className="single-detail">Sender's email: <span>{sender.email}</span></div>
                    <div className="single-detail">Type of Drone: <span>{drone.type}</span></div>
                    <div className="single-detail">Pickup Location: <span>{pickupLocation}</span></div>
                    <div className="single-detail">Delivery Location: <span>{deliveryLocation}</span></div>
                    <div className="single-detail">Scheduled Date of Delivery: <span>{formatDate(deliveryScheduledDate)} by {formatTime(deliveryScheduledDate)}</span></div>
                    <div className="single-detail">Price: <span>N{price.toLocaleString()}</span></div>
                    <div className="single-detail">Weight of Package: <span>{payloadWeight}</span></div>
                    <div className="single-detail">Delivery Status: <span style={{background: status?.backgroundColor || "black",color: status?.color, borderRadius: "5px", padding: "4px 8px"}}>{status?.status}</span></div>
                </div>
                {receiverApproval === "none" ? <div className='button-actions'>
                    <button onClick={() => handleApproval("approved")} style={{background: "green", color: "white", border: "2px solid green"}} type="button" className="approve-btn btn mb-3 btn-primary"><CheckIcon />&nbsp;Accept</button>
                    <button onClick={() => handleApproval("denied")} style={{background: "red", color: "white", border: "2px solid red"}} type="button" className="deny-btn btn mb-3 btn-primary"><DoDisturbIcon />&nbsp;Deny</button>
                </div> :
                <div className='acceptance'>You {receiverApproval} this delivery</div>}
            </div>
        </>
        
    )
}


export default UserViewReceivedDelivery