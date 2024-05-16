import React from 'react';
import  "../styles/AdminLogin.css"
import { useMutation } from 'react-query';
import { CircularProgress } from '@mui/material';
import { userPostRequest } from '../hooks/users.hooks';
import { checkFormFields } from '../utils/utils';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux"
import { setUser } from '../state';


function AdminLogin() {
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
                dispatch(setUser({ type: "admin", ...data.body }))
                navigate("/admin/home")
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

        loginMutation.mutate({postDetails: {...formDetails, admin: true}, route: "login"})
    }

    if(loginMutation.isLoading) {
        return <CircularProgress sx={{color: "#ffb11f", margin: "300px 500px"}} size={100}/>
    }

    return (
        <>
            <div className="section">
                <div className="container">
                    <div className="row full-height justify-content-center">
                        <div className="col-12 text-center align-self-center py-5">
                            <div className="section pb-5 pt-5 pt-sm-2 text-center">
                                <div className="card-3d-wrap mx-auto">
                                    <div className="card-3d-wrapper">
                                        <div className="card-front">
                                            <div className="center-wrap">
                                            <div className="section text-center">
                                                <h4 style={{color: "#ffb11f"}} className="mb-4 pb-3">Administrator Log In</h4>
                                                <div className="admin-form-group">
                                                    <input type="email" name="email" onChange={handleChange} value={formDetails.email} className="form-style" placeholder="Email" id="logemail" autoComplete="off"/>
                                                    <i className="input-icon uil uil-at"></i>
                                                </div>
                                                <div className="admin-form-group mt-2">
                                                    <input type="password" name="password" onChange={handleChange} value={formDetails.password} className="form-style" placeholder="Password" id="logpass" autoComplete="off"/>
                                                    <i className="input-icon uil uil-lock-alt"></i>
                                                </div>
                                                <a href onClick={submitForm} className="btn mt-4">login</a>
                                            </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


export default AdminLogin