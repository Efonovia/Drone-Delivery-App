import React from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PhoneIcon from '@mui/icons-material/Phone';
import MailIcon from '@mui/icons-material/Mail';
import PersonIcon from '@mui/icons-material/Person';
import { centerStyle } from '../utils/utils';
import InteractiveList from '../components/mui/InteractiveList.components.mui';
import { useSelector } from 'react-redux';


function UserProfile() {
    const userInfo = useSelector(state => state.user)

    return (
        <section className='profile-section'>
            <div className='main_content_iner overly_inner '>
                <div>
                    <div className="col-12">
                        <div style={{...centerStyle, gap: "10px"}} className="mb_30">
                            <span><PersonIcon sx={{ height: 50, width: 50 }}/></span>
                            <h2 className="m-0">Your Profile</h2>
                        </div>
                    </div>
                    <div className="col-lg-12 ">
                        <div className="white_card card_height_100 mb_30">
                            <div className="white_card_header pb-0">
                                <div className="box_header m-0">
                                </div>
                            </div>
                            <div className="white_card_body">
                                <div className="d-flex mb_40 border_bottom_1px pb-3">
                                    <div className="flex-shrink-0"><AccountCircleIcon sx={{ height: 50, width: 50 }} /></div>
                                    <div className="flex-grow-1">
                                        <h1 className="mb-2">{userInfo.firstName} {userInfo.lastName}</h1>
                                        <h5 style={{color: "#ffb11f"}} className="mb-1"> <span><PhoneIcon sx={{ height: 20, width: 20 }} /></span>{userInfo.telephone}</h5>
                                        <h5 style={{color: "#ffb11f"}} className="mb-1"> <span><MailIcon sx={{ height: 20, width: 20 }} /></span>{userInfo.email}</h5>
                                    </div>
                                </div>
                                <div style={{...centerStyle, width: "100%", gap: "100px"}}>
                                    <ul style={{width: "40%"}} className="card-profile__info">
                                        <li>
                                            <h2 className="me-4">State</h2>
                                            <h5 style={{color: "#ffb11f"}} >{userInfo.state}</h5>
                                        </li>
                                        <li>
                                            <h2 className="me-4">Address</h2>
                                            <h5 style={{color: "#ffb11f"}} >{userInfo.address}</h5>
                                        </li>
                                    </ul>
                                    <InteractiveList userId={userInfo._id} addresses={userInfo.otherAddresses}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}


export default UserProfile