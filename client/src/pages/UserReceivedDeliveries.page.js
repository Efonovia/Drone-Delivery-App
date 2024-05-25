import React from 'react';
import CallReceivedIcon from '@mui/icons-material/CallReceived';
import { useSelector } from 'react-redux';
import { useQuery } from 'react-query';
import { deliveryGetRequest } from '../hooks/users.hooks';
import ErrorBoundary from '../components/ErrorBoundary.components';
import { CircularProgress } from '@mui/material';
import { formatDate, formatTime, getDeliveryStatus, sortDeliveries } from '../utils/utils';
import { useNavigate } from 'react-router-dom';


function UserRecievedDeliveries() {
    const navigate = useNavigate()
    const userInfo = useSelector(state => state.user)
    const getUserReceivedDeliveriesQuery = useQuery("get users received deliveries", () => deliveryGetRequest({ route: `receiver/${userInfo._id}` }))

    if(getUserReceivedDeliveriesQuery.isLoading) {
        return <CircularProgress sx={{margin: "200px 500px", color: "#ffb11f"}} size={100}/>
    }

    const tableRowsHTML = [...sortDeliveries(getUserReceivedDeliveriesQuery.data?.body, "receiver")].map((delivery, i) => {
        const statusObj = getDeliveryStatus(delivery, "receiver")
        const canTrack = ["Pending", "ACTIVE"].includes(statusObj.status)
        return <tr key={delivery._id}>
                <th scope="row">{i+1}</th>
                <td>{delivery.sender.firstName + " " + delivery.sender.lastName}</td>
                <td>{delivery.sender.email}</td>
                <td>{formatDate(delivery.deliveryScheduledDate)} by {formatTime(delivery.deliveryScheduledDate)}</td>
                {statusObj.status === "ACTIVE" ? <td><span className='current'>ACTIVE</span></td> : <td style={{color: statusObj.color}}>{statusObj.status}</td>}
                <td><span onClick={() => navigate(`/user/received/view/${delivery._id}`)} className='view-button'>View</span></td>
                <td>{canTrack && <span onClick={() => navigate(`/user/delivery/track/${delivery._id}`)} className='view-button'>Track</span>}</td>
            </tr>
    })

    return ( 
        <ErrorBoundary message="Error fetching your received deliveries. Check your internet and try again" fetch={getUserReceivedDeliveriesQuery.refetch} isError={getUserReceivedDeliveriesQuery.isError}>
            <div style={{width: "90%", margin: "auto"}}>
                <h1 style={{paddingTop: "20px", paddingLeft: "20px"}}><CallReceivedIcon sx={{height: 40, width: 40}}/>Received Deliveries</h1>
                <div className="white_card_body">
                    <div className="QA_section">
                    {Boolean(getUserReceivedDeliveriesQuery.data.body.length) ? <div className="table-responsive">
                            <table className="table table-striped table-user">
                                <thead>
                                    <tr style={{color: "#ffb11f"}}>
                                        <th scope="col">#</th>
                                        <th scope="col">Sender's Name</th>
                                        <th scope="col">Sender's Email</th>
                                        <th scope="col">Date Made</th>
                                        <th scope="col">Status</th>
                                        <th scope="col"></th>
                                        <th scope="col"></th>
                                    </tr>
                                </thead>
                                <tbody>{tableRowsHTML}</tbody>
                            </table>
                        </div> : <h4>You haven't received any deliveries</h4>}
                        
                    </div>
                </div>
            </div>
        </ErrorBoundary>
    
    )
}


export default UserRecievedDeliveries