import React from 'react';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import { useQuery } from 'react-query';
import { deliveryGetRequest } from '../hooks/users.hooks';
import ErrorBoundary from '../components/ErrorBoundary.components';
import { CircularProgress } from '@mui/material';
import PaidIcon from '@mui/icons-material/Paid';
import PeopleIcon from '@mui/icons-material/People';
import ConnectingAirportsIcon from '@mui/icons-material/ConnectingAirports';
import ScaleIcon from '@mui/icons-material/Scale';


function AdminHome() {
    const getStatsQuery = useQuery("get drone availability fro admin", () => deliveryGetRequest({ route: "stats" }), {
        cacheTime: 0,
        staleTime: 2000000,
    })

    console.log(getStatsQuery)

    if(getStatsQuery.isLoading) {
        return <CircularProgress sx={{color: "#ffb11f", margin: "200px 400px"}} size={100}/>
    }

    if(getStatsQuery.isError) {
        return <ErrorBoundary message="Could't get necessary Info. Check your internet and try agin" isError={true} refetch={getStatsQuery.refetch} />

    }
    
    const { totalIncome,totalCustomers,totalDrones,processedDeliveries,successfulDeliveries,totalDeliveries,averagePackageWeight } = getStatsQuery.data?.body

    return (
        <div className="container-fluid p-0 ">
            <div className="row">
                <div className="col-12">
                    <div className="page_title_box d-flex flex-wrap align-items-center justify-content-between">
                        <div className="page_title_left">
                            <h3 className="mb-0">Admin Dashboard</h3>
                        </div>
                        <div className="monitor_list_widget">
                            <div className="simgle_monitor_list">
                                <div className="simgle_monitor_count d-flex align-items-center" style={{position: 'relative'}}>
                                    <span>Processed Deliveries</span>
                                    <div id="monitor_1" style={{minHeight: '20px'}}><EqualizerIcon sx={{ color: "#ffb11f" }}/></div>
                                </div>
                                <h4 className="counter">{processedDeliveries}</h4>
                            </div>
                            <div className="simgle_monitor_list">
                                <div className="simgle_monitor_count d-flex align-items-center" style={{position: 'relative'}}>
                                    <span>Successful Deliveries</span>
                                    <div id="monitor_1" style={{minHeight: '20px'}}><EqualizerIcon sx={{ color: "#ffb11f" }}/></div>
                                </div>
                                <h4><span className="counter">{successfulDeliveries}</span> </h4>
                            </div>
                            <div className="simgle_monitor_list">
                                <div className="simgle_monitor_count d-flex align-items-center" style={{position: 'relative'}}>
                                    <span>Total Deliveries</span>
                                    <div id="monitor_1" style={{minHeight: '20px'}}><EqualizerIcon sx={{ color: "#ffb11f" }}/></div>
                                </div>
                                <h4><span className="counter">{totalDeliveries}</span></h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row ">
                <div className="col-xl-12">
                    <div className="white_card  mb_30">
                        <div style={{height: "100px", width: "100px"}}></div>
                        <div className="white_card_body anlite_table p-0">
                            <div className="row">
                                <div className="col-lg-3">
                                    <div className="single_analite_content">
                                        <h4><PaidIcon sx={{color: "#ffb11f"}}/>Total Income</h4>
                                        <h3 style={{textAlign: "center"}}>N <span className="counter">{totalIncome.toLocaleString()}</span> </h3>
                                        <div className="d-flex">
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-3">
                                    <div className="single_analite_content">
                                        <h4><PeopleIcon sx={{color: "#ffb11f"}}/> Total Customers</h4>
                                        <h3 style={{textAlign: "center"}}><span className="counter">{totalCustomers}</span> </h3>
                                        <div className="d-flex">
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-3">
                                    <div className="single_analite_content">
                                        <h4 style={{textAlign: "center"}}><ScaleIcon sx={{color: "#ffb11f"}}/> Average Package Weight</h4>
                                        <h3 style={{textAlign: "center"}}><span className="counter">{averagePackageWeight || 0}KG</span> </h3>
                                        <div className="d-flex">
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-3">
                                    <div className="single_analite_content">
                                        <h4><ConnectingAirportsIcon  sx={{color: "#ffb11f"}}/> Total Drones</h4>
                                        <h3 style={{textAlign: "center"}}><span className="counter">{totalDrones}</span> </h3>
                                        <div className="d-flex">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default AdminHome