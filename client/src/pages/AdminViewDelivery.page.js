import React from 'react';
import CheckIcon from '@mui/icons-material/Check';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import FeedIcon from '@mui/icons-material/Feed';
import AlertDialogSlide from '../components/mui/AlertDialogSlide.components';
import ErrorBoundary from '../components/ErrorBoundary.components';
import {useMutation, useQuery} from "react-query"
import { deliveryGetRequest, deliveryPostRequest } from '../hooks/users.hooks';
import { useParams } from 'react-router-dom';
import { centerStyle, formatDate, formatTime, getDateAndTimeObject, getDeliveryStatus } from '../utils/utils';
import { CircularProgress } from '@mui/material';


function AdminViewDelivery() {
    const deliveryId = useParams().id
    const [open, setOpen] = React.useState(false);
    const [type, setType] = React.useState("");
    const [newDate, setNewDate] = React.useState(null)

    const getDeliveryDetailsQuery = useQuery(
        "get admin delivery info", 
        ()=>deliveryGetRequest({route: `id/${deliveryId}`}), 
        { 
            enabled: !!deliveryId, 
            cacheTime: 0,
            staleTime: 3000000,
        })

    const editdeliveryMutation = useMutation(deliveryPostRequest, {
        onError: () => alert("Couldn't make change date. Check your internet and try again"),
        onSuccess: data => {
            if(!data.ok) {
                alert(data.error)
            } else {
                getDeliveryDetailsQuery.refetch()
            }
        }
    })

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

    function completeDelivery() {
        editdeliveryMutation.mutate({ postDetails: { deliveryId: deliveryId, updates: [{ field: "completed", value: true }] }, route: `edit` })
    }

    function submitForm() {
        editdeliveryMutation.mutate({ postDetails: { deliveryId: deliveryId, updates: [{ field: "deliveryScheduledDate", value: newDate }] }, route: `edit` })
    }



    if(getDeliveryDetailsQuery.isLoading || editdeliveryMutation.isLoading) {
        return <CircularProgress sx={{color: "#ffb11f", margin: "200px 500px"}} size={100}/>
    }

    if(getDeliveryDetailsQuery.isError) {
        return <ErrorBoundary message="There was an error fetching the delivery details. Check your intrenet and try again" isError={true}></ErrorBoundary>
    }

    const { sender, receiver,  drone, pickupLocation, deliveryLocation, deliveryScheduledDate, price, payloadWeight, adminApproval, completed } = getDeliveryDetailsQuery.data?.body 
    const status = getDeliveryStatus(getDeliveryDetailsQuery.data.body, "admin")
    const isDateTheSame = newDate ? getDateAndTimeObject(newDate).deliveryDate === getDateAndTimeObject(deliveryScheduledDate).deliveryDate : true

    return (
        <section className="profile-section">
            <AlertDialogSlide type={type} open={open} deliveryId={deliveryId} handleClose={handleClose}  clientType="adminApproval" redir="/admin/all" refetch={getDeliveryDetailsQuery.refetch} />
            <div style={{padding: "0px 0 0 0", marginTop: "-25px"}} className="main_content_iner overly_inner ">
                <div className="container-fluid p-0 ">

                    <div style={{gap: "10px"}} className="row">
                        <div style={{height: "85vh", ...centerStyle, flexDirection: "column", background: "white", gap: 10}} className="col-lg-5">
                            <h2><FeedIcon sx={{ color: "#ffb11f", height: 40, width: 40 }}/> Delivery Details</h2>
                            <div className="delivery-details">
                                <div className="single-detail">Sender: <span>{sender.firstName} {sender.lastName}</span>({sender.email})</div>
                                <div className="single-detail">Receiver: <span>{sender.email}</span>({receiver.email})</div>
                                <div className="single-detail">Type of Drone: <span>{drone.type}</span></div>
                                <div className="single-detail">Pickup Location: <span>{pickupLocation}</span></div>
                                <div className="single-detail">Delivery Location: <span>{deliveryLocation}</span></div>
                                <div className="single-detail">Scheduled Date of Delivery: <span>{formatDate(deliveryScheduledDate)} by {formatTime(deliveryScheduledDate)}</span></div>
                                <div className="single-detail">Price: <span>N{price.toLocaleString()}</span></div>
                                <div className="single-detail">Weight of Package: <span>{payloadWeight}</span></div>
                                <div className="single-detail">Delivery Status: <span style={{background: status?.backgroundColor || "black",color: status?.color, borderRadius: "5px", padding: "4px 8px"}}>{status?.status}</span></div>
                            </div>
                            {adminApproval === "none" && <div className='button-actions'>
                                <button onClick={() => handleApproval("approved")} style={{background: "green", color: "white", border: "2px solid green"}} type="button" className="approve-btn btn mb-3 btn-primary"><CheckIcon />&nbsp;Accept</button>
                                <button onClick={() => handleApproval("denied")} style={{background: "red", color: "white", border: "2px solid red"}} type="button" className="deny-btn btn mb-3 btn-primary"><DoDisturbIcon />&nbsp;Deny</button>
                            </div>}
                            {status?.status === "Pending" && (completed ? <button style={{background: "green", color: "white"}} type="button" className="btn mb-3 btn-primary"><CheckIcon />&nbsp;Completed</button> : <button onClick={completeDelivery} style={{background: "green", color: "white", border: "2px solid green"}} type="button" className="approve-btn btn mb-3 btn-primary">Mark as Completed</button>)}
                        </div>

                        <div style={{height: "85vh", background: "white"}} className="col-lg-6">
                            <div className="row justify-content-center">
                                <div>
                                    <div className="modal-content cs_modal">
                                        <div style={{ backgroundColor: "#373063", padding: "10px" }} className="modal-header justify-content-center">
                                            <h5 className="modal-title text_white">Modify Delivery Date If Needed</h5>
                                        </div>
                                        <div style={{height: "70vh"}} className="modal-body">
                                            <form>
                                                <div>
                                                    <input 
                                                        name="payloadWeight" 
                                                        value={payloadWeight}
                                                        style={{height: "50px", cursor: "not-allowed"}} 
                                                        type="number" 
                                                        disabled
                                                        className="form-control" 
                                                        placeholder="Enter The Weight of the package in KG"
                                                    />
                                                </div>
                                                <div>
                                                    <input 
                                                        value={receiver.email} 
                                                        style={{height: "50px", cursor: "not-allowed"}} 
                                                        className="form-control" 
                                                        disabled
                                                        label="Enter Recipient's email"
                                                    />
                                                </div>
                                                <div style={{marginTop: "15px"}}>
                                                <input 
                                                        value={pickupLocation} 
                                                        style={{height: "50px", cursor: "not-allowed"}} 
                                                        className="form-control" 
                                                        disabled
                                                        label="Enter Pickup Location"
                                                    />
                                                </div>
                                                <div style={{marginTop: "15px"}}>
                                                    <input 
                                                        value={deliveryLocation} 
                                                        className="form-control" 
                                                        style={{height: "50px", cursor: "not-allowed"}} 
                                                        disabled
                                                        label="Enter Delivery Location"
                                                    />
                                                </div>
                                                <div>
                                                    <input 
                                                        style={{height: "50px"}} 
                                                        name="deliveryScheduledDate" 
                                                        value={newDate || getDateAndTimeObject(deliveryScheduledDate).deliveryDate}
                                                        onChange={event => setNewDate(event.target.value)}
                                                        type="date" 
                                                        min={new Date().toISOString().split('T')[0]} 
                                                        className="form-control" 
                                                        placeholder="Enter delivery date"
                                                    />
                                                </div>
                                                {!isDateTheSame && <a onClick={submitForm} style={{cursor: "pointer", userSelect: "none"}} href className="btn_1 full_width text-center">Save Changes</a>}
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}


export default AdminViewDelivery