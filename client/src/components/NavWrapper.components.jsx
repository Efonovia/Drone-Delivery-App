import React from 'react';
import HorizontalNav from './HorizontalNav.components';
import CloseIcon from '@mui/icons-material/Close';
import { capitalizeWords } from '../utils/utils';
import { useLocation, useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import ConnectingAirportsIcon from '@mui/icons-material/ConnectingAirports';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import InventoryIcon from '@mui/icons-material/Inventory';
import CheckIcon from '@mui/icons-material/Check';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import { nanoid } from '@reduxjs/toolkit';
import appLogo from "../assets/img/app_logo.png"


const navElements = [
    { name: "home", icon: HomeIcon },
    { name: "drones", icon: ConnectingAirportsIcon },
    { name: "unprocessed deliveries", icon: VisibilityOffIcon },
    { name: "all deliveries", icon: InventoryIcon },
    { name: "completed deliveries", icon: CheckIcon },
    { name: "pending deliveries", icon: HourglassBottomIcon },
]

function NavWrapper({ children }) {
    const [open, setOpen] = React.useState(false)
    const navigate = useNavigate()
    const location = useLocation()

    const navElementsHTML = navElements.map(el => {
        const isActive = location.pathname === `/admin/${el.name.split(" ")[0]}`
        const uid = nanoid()
        return <li key={uid} style={{ cursor: "pointer" }}>
                    <a style={isActive ? {textDecoration: "underline"} : {}} onClick={() => navigate(`/admin/${el.name.split(" ")[0]}`)} href aria-expanded="false">
                        <div className="nav_icon_small">
                            <el.icon />
                        </div>
                        <div className="nav_title">{capitalizeWords(el.name)}</div>
                    </a>
                </li>
    })

    return (
        <>
            <nav className={`sidebar dark_sidebar ${open && "active_sidebar"}`}>
                <div className="logo d-flex justify-content-between">
                    <div>
                        <img width={30} height={30} src={appLogo} alt="pic" />
                        <a style={{color: "white", fontSize: "18px"}} href>Fly-By Deliveries</a>
                    </div>
                    <div onClick={() => setOpen(false)} className="sidebar_close_icon d-lg-none">
                        <CloseIcon size='50' sx={{ color: "white", cursor: "pointer" }}/>
                    </div>
                </div>
                <ul id="sidebar_menu" className="metismenu">{navElementsHTML}</ul>
            </nav>
            <section className='main_content dashboard_part large_header_bg'>
                <HorizontalNav openNav={() => setOpen(true)}/>
                <div className='main_content_iner overly_inner '>{children}</div>
            </section>
        </>
    )
}


export default NavWrapper