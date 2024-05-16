import React from 'react';
import bigLogo from "../assets/img/logo_white.png"
import miniLogo from "../assets/img/mini_logo.png"
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
        return <li style={{ cursor: "pointer" }}>
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
            <nav class={`sidebar dark_sidebar ${open && "active_sidebar"}`}>
                <div className="logo d-flex justify-content-between">
                    {/* <a className="large_logo" href><img src={bigLogo} alt="pic" /></a>
                    <a className="small_logo" href><img src={miniLogo} alt="pic" /></a> */}
                    <a style={{color: "white"}} href>ADMIN LOGO</a>
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