import React from 'react';
import { capitalizeWords, formatTime, sortDeliveries } from '../utils/utils';
import PersonIcon from '@mui/icons-material/Person';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CreateIcon from '@mui/icons-material/Create';
import { useQuery } from 'react-query';
import { deliveryGetRequest } from '../hooks/users.hooks';
import ErrorBoundary from '../components/ErrorBoundary.components';
import { CircularProgress } from '@mui/material';
import { formatDate, getDeliveryStatus } from '../utils/utils';
import { useNavigate } from 'react-router-dom';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';


function AdminDeliveries(props) {
    const navigate = useNavigate()
    const getDeliveriesQuery = useQuery("get admin " + props.type + " deliveries", () => deliveryGetRequest({ route: props.type }), { 
        cacheTime: 0,
        staleTime: 3000000,
        retry: 2
    })

    if(getDeliveriesQuery.isLoading) {
        return <CircularProgress sx={{margin: "200px 500px", color: "#ffb11f"}} size={100}/>
    }

    if(getDeliveriesQuery.isError) {
        return <ErrorBoundary message={"Error fetching " + props.type + " deliveries. Check your internet and try again"} refetch={getDeliveriesQuery.refetch} isError={true} />
         
    }

    const tableRowsHTML = [...sortDeliveries(getDeliveriesQuery.data?.body, "admin")].map((delivery, i) => {
        const statusObj = getDeliveryStatus(delivery, "admin")
        const canTrack = ["Pending", "ACTIVE"].includes(statusObj.status)
        return <tr key={delivery._id}>
                    <th scope="row">{i+1}</th>
                    <td>{delivery.receiver.firstName + " " + delivery.receiver.lastName}</td>
                    <td>{delivery.sender.firstName + " " + delivery.sender.lastName}</td>
                    <td>{formatDate(delivery.deliveryScheduledDate)} by {formatTime(delivery.deliveryScheduledDate)}</td>
                    {statusObj.status === "ACTIVE" ? <td><span className='current'>ACTIVE</span></td> : <td style={{color: statusObj.color}}>{statusObj.status}</td>}
                    <td><span onClick={() => navigate(`/admin/delivery/view/${delivery._id}`)} className='view-button'><VisibilityIcon sx={{color: "#302d43"}}/> View</span></td>
                    <td>{canTrack && <span onClick={() => navigate(`/admin/delivery/track/${delivery._id}`)} className='view-button'><GpsFixedIcon sx={{color: "#302d43"}}/> Track</span>}</td>
                </tr>
    })

    return (
        <div className="container-fluid p-0">
            <div className="row justify-content-center">
                <div className="col-lg-12">
                    <div className="white_card card_height_100 mb_30">
                        <div className="white_card_header">
                            <div className="box_header m-0">
                                <div className="main-title">
                                    <h2 className="m-0">{capitalizeWords(props.type)} Deliveries</h2>
                                </div>
                            </div>
                        </div>
                        <div className="white_card_body">
                            <div className="QA_section">
                                {Boolean(getDeliveriesQuery.data.body.length) ? <div className="table-responsive">
                                    <table className="table table-striped table-admin">
                                        <thead>
                                            <tr>
                                                <th style={{color: "#ffb11f"}} scope="col">#</th>
                                                <th scope="col"><PersonIcon sx={{color: "#ffb11f"}}/> Sender</th>
                                                <th scope="col"><PersonIcon sx={{color: "#ffb11f"}}/> Receipient</th>
                                                <th scope="col"><CalendarMonthIcon sx={{color: "#ffb11f"}}/>Date</th>
                                                <th scope="col"><CreateIcon sx={{color: "#ffb11f"}}/>Status</th>
                                                <th scope="col"></th>
                                                <th scope="col"></th>
                                            </tr>
                                        </thead>
                                        <tbody>{tableRowsHTML}</tbody>
                                    </table>
                                </div> : <p>There are no {props.type !=="all" ? props.type : ""} deliveries at the moment</p>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default AdminDeliveries