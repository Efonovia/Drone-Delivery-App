import React from 'react';
import "../styles/usersignup.css"
import { useMutation } from 'react-query';
import { CircularProgress } from '@mui/material';
import { userPostRequest } from '../hooks/users.hooks';
import { checkFormFields } from '../utils/utils';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux"
import { setUser } from '../state';


function Login() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [formDetails, setFormDetails] = React.useState({
        email: "",
        password: "",
    })

    const loginMutation = useMutation(userPostRequest, {
        onError: () => alert("Couldn't log you in. check your internet and try again"),
        onSuccess: data => {
            console.log(data)
            if(data.ok) {
                dispatch(setUser({ type: "user", ...data.body }))
                navigate("/user/profile")
            } else {
                alert(data.error)
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

    async function submitForm() {
        console.log(formDetails)
        const emptyFields = checkFormFields(formDetails);
        if (emptyFields.length > 0) {
            const emptyFieldNames = emptyFields.join(', ');
            alert(`Please fill in the following fields: ${emptyFieldNames}`);
            return
        }

        loginMutation.mutate({postDetails: formDetails, route: "login"})
    }


    return (
        loginMutation.isLoading ? 
        <div style={{position: "absolute", marginTop: "100px", marginLeft: "40vw", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
            <h1 style={{textAlign: "center"}}>Logging you back in.<br></br> Please Wait...</h1>
            <br></br>
            <CircularProgress sx={{color: "#ffb11f"}} size={100} />
        </div>:
        <section className="signup-section pt-5 pb-5">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="signup-area">
                            <div className="signup-element">
                            </div>
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="signup-left-area">
                                        <h2 className="title">Log back in</h2>
                                        <div className="sign-up-form-area">
                                            <form className="signup-form">
                                                <div className="row">
                                                <div className="col-lg-12 form-group">
                                                        <input type="email" name="email" value={formDetails.email} onChange={handleChange} placeholder="Your Email"/>
                                                    </div>
                                                    <div className="col-lg-12 form-group">
                                                        <input type="password" id="myInput" name="password" value={formDetails.password} onChange={handleChange} placeholder="password"/>
                                                    </div>
                                                    <div className="col-lg-12 form-group">
                                                        <input onClick={submitForm} type="button" className="cmn-btn" value="Login"/>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="signup-right-area">
                                        <h2 className="title">Welcome Back </h2>
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


export default Login