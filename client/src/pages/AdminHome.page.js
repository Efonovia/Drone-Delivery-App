import React from 'react';
import EqualizerIcon from '@mui/icons-material/Equalizer';


function AdminHome() {


    return (
        <div className="container-fluid p-0 ">

    <div className="row">
        <div className="col-12">
            <div className="page_title_box d-flex flex-wrap align-items-center justify-content-between">
                <div className="page_title_left">
                    <h3 className="mb-0">Dashboard</h3>
                    <p>Dashboard/Crypto currenct</p>
                </div>
                <div className="monitor_list_widget">
                    <div className="simgle_monitor_list">
                        <div className="simgle_monitor_count d-flex align-items-center" style={{position: 'relative'}}>
                            <span>Purchase</span>
                            <div id="monitor_1" style={{minHeight: '20px'}}><EqualizerIcon sx={{ color: "red" }}/></div>
                            <div className="resize-triggers">
                                <div className="expand-trigger">
                                    <div style={{width: '116px', height: '22px'}}></div>
                                </div>
                                <div className="contract-trigger"></div>
                            </div>
                        </div>
                        <h4 className="counter">6,250</h4>
                    </div>
                    <div className="simgle_monitor_list">
                        <div className="simgle_monitor_count d-flex align-items-center" style={{position: 'relative'}}>
                            <span>Purchase</span>
                            <div id="monitor_1" style={{minHeight: '20px'}}><EqualizerIcon sx={{ color: "red" }}/></div>
                            <div className="resize-triggers">
                                <div className="expand-trigger">
                                    <div style={{width: '116px', height: '22px'}}></div>
                                </div>
                                <div className="contract-trigger"></div>
                            </div>
                        </div>
                        <h4>$ <span className="counter">55,250</span> </h4>
                    </div>
                    <div className="simgle_monitor_list">
                        <div className="simgle_monitor_count d-flex align-items-center" style={{position: 'relative'}}>
                            <span>Purchase</span>
                            <div id="monitor_1" style={{minHeight: '20px'}}><EqualizerIcon sx={{ color: "red" }}/></div>
                            <div className="resize-triggers">
                                <div className="expand-trigger">
                                    <div style={{width: '116px', height: '22px'}}></div>
                                </div>
                                <div className="contract-trigger"></div>
                            </div>
                        </div>
                        <h4>$ <span className="counter">451.60</span>M </h4>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div className="row ">
        <div className="col-xl-12">
            <div className="white_card  mb_30">
                <div className="white_card_header ">
                    <div className="box_header m-0">
                        <ul className="nav  theme_menu_dropdown">
                            <li className="nav-item">
                                <a className="nav-link active" href>Analytics</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href>Cryptocurrency</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href>Campaign</a>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href role="button"
                                    aria-haspopup="true" aria-expanded="false">More</a>
                                <div className="dropdown-menu">
                                    <a className="dropdown-item" href> Ecommarce Analytics</a>
                                    <a className="dropdown-item" href> Sales</a>
                                    <a className="dropdown-item" href> Performance</a>
                                </div>
                            </li>
                        </ul>
                        <div className="button_wizerd">
                            <a href className="white_btn mr_5">ToDo</a>
                            <a href className="white_btn">Settings</a>
                        </div>
                    </div>
                </div>
                <div className="white_card_body anlite_table p-0">
                    <div className="row">
                        <div className="col-lg-3">
                            <div className="single_analite_content">
                                <h4>Total Income</h4>
                                <h3>$ <span className="counter">14,025</span> </h3>
                                <div className="d-flex">
                                    <div>3.78 <i className="fa fa-caret-up"></i></div>
                                    <span>This year</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3">
                            <div className="single_analite_content">
                                <h4>Sessions</h4>
                                <h3><span className="counter">2025</span> </h3>
                                <div className="d-flex">
                                    <div>3.78<i className="fa fa-caret-up"></i></div>
                                    <span>This month</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3">
                            <div className="single_analite_content">
                                <h4>Ethereum Wallet</h4>
                                <h3><span className="counter">8025</span> </h3>
                                <div className="d-flex">
                                    <div>3.78 <i className="fa fa-caret-up"></i></div>
                                    <span>This month</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3">
                            <div className="single_analite_content">
                                <h4>Number of Clients</h4>
                                <h3><span className="counter">5645</span> </h3>
                                <div className="d-flex">
                                    <div>3.78 <i className="fa fa-caret-up"></i></div>
                                    <span>This month</span>
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