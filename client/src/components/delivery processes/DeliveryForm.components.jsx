import React from 'react';
import FreeSolo from '../mui/FreeSolo.components.mui';
import { useSelector } from 'react-redux';
import { deliveryPostRequest, userGetRequest } from '../../hooks/users.hooks';
import { useMutation, useQueries } from 'react-query';
import ErrorBoundary from '../ErrorBoundary.components';
import { CircularProgress } from '@mui/material';
import FriendsFreeSolo from '../mui/FriendsFreeSolo.components.mui';
import { checkFormFields } from '../../utils/utils';
import { useNavigate } from 'react-router-dom';


function DeliveryForm(props) {
    const navigate = useNavigate()
    const userInfo = useSelector(state => state.user)
    const maxCapacity = {
        small: 15,
        medium: 25,
        large: 40
    } 

    const friendsQuery = useQueries(
        userInfo.friends.map(friendId => ({
            queryKey: ["friend", friendId],
            queryFn: () => userGetRequest({ route: `id/${friendId}` })
        }))
    )

    const deliveryMutation = useMutation(deliveryPostRequest, {
        onError: () => alert("Couldn't create delivery. check your internet and try again"),
        onSuccess: data => {
            console.log(data)
            if(data.ok) {
                navigate(`/user/sent/view/${data.body._id}`)
                // props.completeProcess(props.index)
                // props.goToElement(props.index+1)
            } else {
                alert(data.error)
            }
        }
    })

    const isLoading = friendsQuery.some(query => query.isLoading);
    const isError = friendsQuery.some(query => query.isError);
    const friendsData = friendsQuery.map(query => ({ fullName: query.data?.body.firstName + " " + query.data?.body.lastName, email: query.data?.body.email}));
    if (isError) {
        console.error("One of the friendsQuery failed.");
    }

    function handleRecipientChange(value) {
        console.log(value)
        props.setDeliveryDetails(prev => {
            return {
                ...prev,
                receiver: value
            }
        })
    }

    function handleGenericChange(value, type) {
        console.log(value)
        props.setDeliveryDetails(prev => {
            return {
                ...prev,
                [type]: value
            }
        })
    }

    function submitForm() {
        if(props.type === "new") {
            console.log(props.deliveryDetails)
            const emptyFields = checkFormFields(props.deliveryDetails)
            if (emptyFields.length > 0) {
                const emptyFieldNames = emptyFields.join(', ');
                alert(`Please fill in the following fields: ${emptyFieldNames}`);
                return
            }
            deliveryMutation.mutate({ postDetails: props.deliveryDetails, route: "create" })
        }

        if(props.type === "old") {
            props.goToElement(props.index+1)
        }
    }

    return (
        <ErrorBoundary message="There was an error fetching your friends. Check Your Internet and try again" isError={isError}>
            {(isLoading || deliveryMutation.isLoading) ? <CircularProgress sx={{color: "#ffb11f"}} size={100}/> : <div className="col-lg-9">
                <div className="row justify-content-center">
                    <div>
                        <div className="modal-content cs_modal">
                            <div style={{ backgroundColor: "#373063", padding: "10px" }} className="modal-header justify-content-center">
                                <h5 className="modal-title text_white">{props.type === "new" && "Enter "}Delivery Details</h5>
                            </div>
                            <div style={{height: "70vh"}} className="modal-body">
                                <form>
                                    <div>
                                        <input 
                                            name="payloadWeight" 
                                            value={props.deliveryDetails.payloadWeight}
                                            onChange={event => handleGenericChange(event.target.value, event.target.name)}
                                            style={{height: "50px"}} 
                                            type="number" 
                                            min={1} 
                                            disabled={props.type === "old"}
                                            max={maxCapacity[props.deliveryDetails.droneType]} 
                                            className="form-control" 
                                            placeholder="Enter The Weight of the package in KG"
                                        />
                                    </div>
                                    <div>
                                        <FriendsFreeSolo 
                                            value={props.deliveryDetails.receiver} 
                                            handleChange={handleRecipientChange} 
                                            options={friendsData} 
                                            disabled={props.type === "old"}
                                            label="Enter Recipient's email"
                                        />
                                    </div>
                                    <div style={{marginTop: "15px"}}>
                                        <FreeSolo 
                                            value={props.deliveryDetails.pickupLocation} 
                                            handleChange={value => handleGenericChange(value, "pickupLocation")} 
                                            options={[userInfo.address, ...userInfo.otherAddresses]} 
                                            label="Enter Pickup Location"
                                            disabled={props.type === "old"}
                                        />
                                    </div>
                                    <div style={{marginTop: "15px"}}>
                                        <FreeSolo 
                                            value={props.deliveryDetails.deliveryLocation} 
                                            handleChange={value => handleGenericChange(value, "deliveryLocation")} 
                                            options={[userInfo.address, ...userInfo.otherAddresses]} 
                                            label="Enter Delivery Location"
                                            disabled={props.type === "old"}
                                        />
                                    </div>
                                    <div>
                                        <input 
                                            style={{height: "50px"}} 
                                            name="deliveryScheduledDate" 
                                            value={props.deliveryDetails.deliveryScheduledDate}
                                            onChange={event => handleGenericChange(event.target.value, event.target.name)}
                                            type="date" 
                                            min={new Date().toISOString().split('T')[0]} 
                                            className="form-control" 
                                            disabled={props.type === "old"}
                                            placeholder="Enter delivery date"
                                        />
                                    </div>
                                    <a onClick={submitForm} style={{cursor: "pointer", userSelect: "none"}} href className="btn_1 full_width text-center">{props.type === "new" && "Confirm with Recipient and "}Proceed</a>
                                    
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>}
        </ErrorBoundary>
    )
}


export default DeliveryForm