import React from 'react';


function WaitingForRecipientApproval(props) {
    console.log(props)
    let message = ""

    if(props.receiverApproval === "none") {
        message = `Waiting for the confirmation of ${props.name}`
    }

    if(props.receiverApproval === "approved") {
        message = `${props.name} has approved your delivery request`
    }

    if(props.receiverApproval === "denied") {
        message = `Unfortunately, ${props.name} has denied your delivery request`
    }

    return (
        <div className='approval-waiting'>
            <h1>{message}</h1>
            {props.isCompleted && <button onClick={() => props.goToElement(props.index+1)} type="button" className="btn btn-outline-success mb-3">Proceed</button>}
        </div>
    )
}


export default WaitingForRecipientApproval