import React from 'react';


function WaitingForAdminApproval(props) {
    let message = ""

    if(props.adminApproval === "none") {
        message = "Waiting for the confirmation of the administrator"
    }

    if(props.adminApproval === "approved") {
        message = "The administrator has approved your delivery request"
    }

    if(props.adminApproval === "denied") {
        message = "Unfortunately, the administrator has denied your delivery request"
    }

    return (
        <div className='approval-waiting'>
            <h1>{message}</h1>
            {props.isCompleted && <button onClick={() => props.goToElement(props.index+1)} type="button" className="btn btn-outline-success mb-3">Proceed</button>}
        </div>
    )
}


export default WaitingForAdminApproval