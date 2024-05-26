import React from 'react';
import PersonIcon from '@mui/icons-material/Person';
import CallMadeIcon from '@mui/icons-material/CallMade';
import CallReceivedIcon from '@mui/icons-material/CallReceived';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ConnectingAirportsIcon from '@mui/icons-material/ConnectingAirports';
import LogoutIcon from '@mui/icons-material/Logout';
import { useLocation, useNavigate } from 'react-router-dom';
import "../styles/usernavbar.css"
import { useDispatch } from 'react-redux';
import { setUser } from '../state';
import appLogo from "../assets/img/app_logo.png"


function UserNavbar() {
    const [open, setOpen] = React.useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()
    
    function logout() {
        dispatch(setUser(null))
        navigate("/")
    }

    
    return (
        <>
            <div className="navbar">
                <div className="nav-logo">
                    <img width={50} height={50} src={appLogo} alt='logo'></img>
                    <a href>FLY-BY DELIVERIES</a>
                </div>
                <div className="nav-items">
                    <ul>
                        <li className={location.pathname === "/user/profile" ? "current-nav" : "regular-nav"} onClick={()=>navigate("/user/profile")}>
                            <a href><PersonIcon sx={{width: 20, height: 20, color: "#ffb11f"}} /> Profile </a>
                        </li>
                        <li className={location.pathname === "/user/drones" ? "current-nav" : "regular-nav"} onClick={()=>navigate("/user/drones")}>
                            <a href><ConnectingAirportsIcon sx={{height: 20, width: 20, color: "#ffb11f"}}/> Drones </a>
                        </li>
                        <li className={location.pathname === "/user/sent" ? "current-nav" : "regular-nav"} onClick={()=>navigate("/user/sent")}>
                            <a href><CallMadeIcon sx={{height: 20, width: 20, color: "#ffb11f"}}/> Sent Deliveries </a>
                        </li>
                        <li className={location.pathname === "/user/received" ? "current-nav" : "regular-nav"} onClick={()=>navigate("/user/received")}>
                            <a href><CallReceivedIcon sx={{height: 20, width: 20, color: "#ffb11f"}}/> Received Deliveries </a>
                        </li>
                        <li className={location.pathname === "/user/friends" ? "current-nav" : "regular-nav"} onClick={()=>navigate("/user/friends")}>
                            <a href><PeopleAltIcon sx={{height: 20, width: 20, color: "#ffb11f"}}/> Friends </a>
                        </li>
                    </ul>
                </div>
                <div className='extra-buttons'>
                    <div className="nav-button">
                        <div className="anim-layer"></div>
                        <a onClick={logout} href><LogoutIcon />Sign Out</a>
                    </div>
                </div>
                <div onClick={() => setOpen(true)} id="hamburger-menu">&#9776;</div>
            </div>
            <div className='spacer'></div>


{/* // MOBILE MENU */}
            <div style={{marginTop: "60px", zIndex: 99999999999, display: open ? "flex": "none", transform: open ? "translateX(0%)": "translateX(-100%)"}} id="mobile-menu">
                <div className="mobile-nav-items">
                    <ul>
                    <li onClick={()=>navigate("/user/profile")}>
                            <a href><PersonIcon sx={{width: 20, height: 20, color: "#ffb11f"}} /> Profile </a>
                        </li>
                        <li onClick={()=>navigate("/user/drones")}>
                            <a href><ConnectingAirportsIcon sx={{height: 20, width: 20, color: "#ffb11f"}}/> Drones </a>
                        </li>
                        <li onClick={()=>navigate("/user/sent")}>
                            <a href><CallMadeIcon sx={{height: 20, width: 20, color: "#ffb11f"}}/> Sent Deliveries </a>
                        </li>
                        <li onClick={()=>navigate("/user/received")}>
                            <a href><CallReceivedIcon sx={{height: 20, width: 20, color: "#ffb11f"}}/> Received Deliveries </a>
                        </li>
                        <li onClick={()=>navigate("/user/friends")}>
                            <a href><PeopleAltIcon sx={{height: 20, width: 20, color: "#ffb11f"}}/> Friends </a>
                        </li>
                    </ul>
                </div>
                
                <div className="nav-button">
                    <div className="anim-layer"></div>
                    <a onClick={logout} href><LogoutIcon />Sign Out</a>
                </div>
                <div onClick={() => setOpen(false)} id="hamburger-cross">&#10006;</div>
            </div>
        </>
    )
}


export default UserNavbar