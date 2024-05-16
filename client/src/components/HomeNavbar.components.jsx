import React from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/usernavbar.css"


function HomeNavbar() {
    const [open, setOpen] = React.useState(false)
    const navigate = useNavigate()

    
    return (
        <>
            {!open && <><div className="navbar">
                <div className="nav-logo">
                    <a href>Logo</a>
                </div>
                <div className='extra-buttons'>
                    <div onClick={()=>navigate("/user/login")} className="nav-button">
                    <div className="anim-layer"></div>
                    <a href>Log In</a>
                </div>
                <div onClick={()=>navigate("/user/register")} className="nav-button">
                    <div className="anim-layer"></div>
                    <a href>Register</a>
                </div>
                <div onClick={()=>navigate("/admin/login")} className="admin-button">
                    <a href>Admin</a>
                </div>
                </div>
                <div onClick={() => setOpen(true)} id="hamburger-menu">&#9776;</div>
            </div>
            <div className='spacer'></div></>}

{/* // MOBILE MENU */}
            <div style={{zIndex: 99999999999, display: open ? "flex": "none", transform: open ? "translateX(0%)": "translateX(-100%)"}} id="mobile-menu">
                <div onClick={()=>navigate("/user/login")} className="mobile-nav-button">
                    <div className="anim-layer"></div>
                    <a href>Log In</a>
                </div>
                <div onClick={()=>navigate("/user/register")} className="mobile-nav-button">
                    <div className="anim-layer"></div>
                    <a href>Register</a>
                </div>
                <div onClick={()=>navigate("/admin/login")} className="mobile-nav-button">
                    <div className="anim-layer"></div>
                    <a href>Admin</a>
                </div>
                <div onClick={() => setOpen(false)} id="hamburger-cross">&#10006;</div>
            </div>
        </>
    )
}


export default HomeNavbar