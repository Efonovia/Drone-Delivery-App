import React from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../state';


function HorizontalNav(props) {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    function logout() {
        dispatch(setUser(null))
        navigate("/")
    }

    return (
        <div className="container-fluid g-0">
            <div className="row">
                <div className="col-lg-12 p-0 ">
                    <div className="header_iner d-flex justify-content-between align-items-center">
                        <div style={{cursor: "pointer"}} onClick={props.openNav} className="sidebar_icon d-lg-none">
                            <MenuIcon />
                        </div>
                        <div style={{marginLeft: "50px"}} className="header_right d-flex justify-content-between align-items-center">
                            <div className="profile_info d-flex align-items-center">
                                <div className="profile_thumb mr_20">
                                    <AccountCircleIcon sx={{ height: 40, width: 40 }}/>
                                </div>
                                <div className="author_name">
                                    <h4 className="f_s_15 f_w_500 mb-0">Jiue Anderson</h4>
                                    <p className="f_s_12 f_w_400">Administrator</p>
                                </div>
                            </div>
                        </div>
                        <div className="line_icon open_miniSide d-none d-lg-block">
                            <button onClick={logout} style={{background: "#182444"}} type="button" className="btn mb-3 btn-primary"><LogoutIcon />&nbsp;Logout</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default HorizontalNav