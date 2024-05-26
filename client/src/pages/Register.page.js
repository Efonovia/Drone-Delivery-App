import React from 'react';
import "../styles/usersignup.css"
import ComboBox from '../components/mui/Autocomplete.components.mui';
import nigerianStates from '../data/nigeria_states';
import { useMutation } from 'react-query';
import { CircularProgress } from '@mui/material';
import { userPostRequest } from '../hooks/users.hooks';
import { capitalizeWords, checkFormFields } from '../utils/utils';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux"
import { setUser } from '../state';


function Register() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [formDetails, setFormDetails] = React.useState({
        firstName: "",
        lastName: "",
        email: "",
        state: "",
        telephone: "",
        address: "",
        password: "",
        isAdmin: false
    })

    const signUpMutation = useMutation(userPostRequest, {
        onError: () => alert("Couldn't sign you up. check your internet and try again"),
        onSuccess: data => {
            console.log(data)
            if(data.ok) {
                if(data.exists) {
                    alert("A user already exists with that email. sign in with that account or try a different email")
                } else {
                    dispatch(setUser({ type: "user", ...data.body }))
                    navigate("/user/profile")
                }
            } else {
                alert("server error. try again")
            }
        }
    })

    function handleChange(event) {
        const { name, value } = event.target
        setFormDetails(prev => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    function onSearchStateChange(value) {
        setFormDetails(prev => {
            return {
                ...prev,
                state: value
            }
        })
        console.log(value)
    }

    async function submitForm() {
        setFormDetails(prev => {
            return {
                ...prev,
                firstName: capitalizeWords(prev.firstName),
                lastName: capitalizeWords(prev.lastName)
            }
        })
        console.log(formDetails)
        const emptyFields = checkFormFields(formDetails);
        if (emptyFields.length > 0) {
            const emptyFieldNames = emptyFields.join(', ');
            alert(`Please fill in the following fields: ${emptyFieldNames}`);
            return
        }

        signUpMutation.mutate({postDetails: formDetails, route: "create"})
    }


    return (
        signUpMutation.isLoading ? 
        <div style={{position: "absolute", marginTop: "100px", marginLeft: "20vw", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
            <h1 style={{textAlign: "center"}}>Creating your account and signing you in.<br></br> Please Wait...</h1>
            <br></br>
            <CircularProgress sx={{color: "#ffb11f"}} size={100} />
        </div>:
        <section className="signup-section pt-5 pb-5">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="signup-area">
                            <div className="signup-element">
                                <img src="https://i.ibb.co/bRJVsq5/contact-us-box-bg.png" alt="signup"/>
                            </div>
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="signup-left-area">
                                        <h2 className="title">Create your account</h2>
                                        <div className="sign-up-form-area">
                                            <form className="signup-form">
                                                <div className="row">
                                                    <div className="col-lg-6 form-group">
                                                        <input type="text" name="firstName" value={formDetails.firstName} onChange={handleChange} placeholder="First Name"/>
                                                    </div>
                                                    <div className="col-lg-6 form-group">
                                                        <input type="text" name="lastName" value={formDetails.lastName} onChange={handleChange} placeholder="Last Name"/>
                                                    </div>
                                                    <div className="col-lg-6 form-group">
                                                        <input type="email" name="email" value={formDetails.email} onChange={handleChange} placeholder="Your Email"/>
                                                    </div>
                                                    <div className="col-lg-6 form-group">
                                                        <input type="password" id="myInput" name="password" value={formDetails.password} onChange={handleChange} placeholder="password"/>
                                                    </div>
                                                    <div className="col-lg-6 form-group">
                                                        <input type="tel" name="telephone" value={formDetails.telephone} onChange={handleChange} placeholder="Phone Number"/>
                                                    </div>
                                                    <div className="col-lg-6">
                                                        <ComboBox
                                                            options={nigerianStates} 
                                                            label="State of residence"
                                                            value={formDetails.state}
                                                            onStateChange={onSearchStateChange}
                                                        />
                                                    </div>
                                                    <div className="col-lg-12 form-group">
                                                        <input type="text" id="myInputTwo" name="address" value={formDetails.address} onChange={handleChange} placeholder="Address"/>
                                                    </div>
                                                    <div className="col-lg-12 form-group">
                                                        <input onClick={submitForm} type="button" className="cmn-btn" value="Register"/>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="signup-right-area">
                                        <h2 className="title">Welcome To Fly-By Deliveries </h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}


export default Register