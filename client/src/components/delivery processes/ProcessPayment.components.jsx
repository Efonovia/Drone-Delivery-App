import React from 'react';
import itemPic from "../../assets/img/uba_logo.png"
import { useMutation } from 'react-query';
import { deliveryPostRequest } from '../../hooks/users.hooks';
import { CircularProgress } from '@mui/material';


function ProcessPayment(props) {
    const deliveryMutation = useMutation(deliveryPostRequest, {
        onError: () => alert("Couldn't update details. check your internet and try again"),
        onSuccess: data => {
            console.log(data)
            if(data.ok) {
                props.completeProcess(props.index)
                props.goToElement(props.index+1)
                props.refetch()
            } else {
                alert(data.error)
            }
        }
    })

    function handlePayment() {
        deliveryMutation.mutate({ postDetails: { deliveryId: props.deliveryId, updates: [{ field: "hasPaid", value: true }] }, route: "/edit" })
    }

    if(deliveryMutation.isLoading) {
        return <CircularProgress sx={{color: "#ffb11f"}} size={100}/>
    }

    if(props.isCompleted) {
        return (
            <div className='payment-div'>
                <h2>You have successfully made payment</h2>
                <button onClick={() => props.goToElement(props.index+1)} type="button" className="btn btn-outline-success mb-3">Proceed</button>
            </div>
        )
    }

    return (
        <div className='payment-div'>
            <h2>Make your payment to this bank</h2>
            <div className='payment-info'>
                <img width={200} height={200} src={itemPic} alt='bank logo'></img>
                <div>
                    <p>BANK: <span style={{ color: "black" }}>United Bank For Africa</span></p>
                    <p>Account Number: <span style={{ color: "black" }}>213493573</span></p>
                    <p>Account Name: <span style={{ color: "black" }}>Lukman Abdullahi</span></p>
                </div>
            </div>
            <button onClick={handlePayment} type="button" className="btn btn-outline-success mb-3">Confirm Payment</button>
        </div>
    )
}


export default ProcessPayment