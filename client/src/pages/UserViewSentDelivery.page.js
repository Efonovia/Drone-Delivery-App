import React from 'react';
import { centerStyle, getDateAndTimeObject } from '../utils/utils';
import BasicTimeline from '../components/mui/BasicTimeline.components.mui';
import SelectDrones from '../components/delivery processes/SelectDrones.components';
import DeliveryForm from '../components/delivery processes/DeliveryForm.components';
import ProcessPayment from '../components/delivery processes/ProcessPayment.components';
import Completed from '../components/delivery processes/Completed.components';
import WaitingForRecipientApproval from '../components/delivery processes/WaitingForRecipientApproval.components';
import WaitingForAdminApproval from '../components/delivery processes/WaitingForAdminApproval.components';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { deliveryGetRequest } from '../hooks/users.hooks';
import ErrorBoundary from '../components/ErrorBoundary.components';
import { CircularProgress } from '@mui/material';


function UserViewSentDelivery() {
    const deliveryId = useParams().id

    const getDeliveryQuery = useQuery(
        "get delivery info", 
        ()=>deliveryGetRequest({route: `id/${deliveryId}`}), 
        { 
            enabled: !!deliveryId, 
            cacheTime: 0,
            staleTime: 3000000,
            // onSuccess: () => setCurrentProcess(elements.find(element => !element.completed))
        })

    
    console.log(getDeliveryQuery.data)
    const deliveryDetails= {
        sender: getDeliveryQuery.data?.body.sender,
        receiver: getDeliveryQuery.data?.body.receiver.email,
        droneType: getDeliveryQuery.data?.body.drone.drone,
        pickupLocation: getDeliveryQuery.data?.body.pickupLocation,
        deliveryLocation: getDeliveryQuery.data?.body.deliveryLocation,
        deliveryScheduledDate: getDateAndTimeObject(getDeliveryQuery.data?.body.deliveryScheduledDate).deliveryDate,
        payloadWeight: getDeliveryQuery.data?.body.payloadWeight
    }
    console.log(deliveryDetails)

    function setDeliveryDetails() {
        console.log("nada")
    }

    let elements = [
        { index: 0, description: "Select Drone", completed: true, component: SelectDrones },
        { index: 1, description: "Enter Delivery Info", completed: true, component: DeliveryForm },
        { index: 2, description: "Wait for recipient's approval", completed: getDeliveryQuery.data?.body.receiverApproval === "approved", component: WaitingForRecipientApproval},
        { index: 3, description: "Process payment", completed: getDeliveryQuery.data?.body.hasPaid, component: ProcessPayment },
        { index: 4, description: "Wait for admin approval", completed: getDeliveryQuery.data?.body.adminApproval === "approved", component: WaitingForAdminApproval },
        { index: 5, description: "Completed", completed: getDeliveryQuery.data?.body.completed, component: Completed },
    ]
    console.log(elements)
    const [currentProcess, setCurrentProcess] = React.useState(getDeliveryQuery.isLoading ? elements[1] : elements.find(element => !element.completed))

    function goToElement(index) {
        if(index > 0) {
            if(elements[index-1].completed) {
                setCurrentProcess(elements.find(process => process.index === index))
            }
        } else {
            setCurrentProcess(elements.find(process => process.index === index))
        }
    }

    function completeProcess(index) {
        elements.find(process => process.index === index).completed = true
        setCurrentProcess(elements[currentProcess.index+1])
    }

    return (
        <ErrorBoundary message="There was an error fetching the delivery details. Check your internet and try again" refetch={getDeliveryQuery.refetch} isError={getDeliveryQuery.isError}>
            {getDeliveryQuery.isLoading ? <CircularProgress sx={{color: "#ffb11f", margin: "300px 500px"}} size={100}/>: 
            <section className="profile-section">
                <div className="main_content_iner overly_inner ">
                    <div className="container-fluid p-0 ">

                        <div className="row">
                            <div style={{height: "85vh"}} className="col-lg-3 ">
                                <div style={{...centerStyle, flexDirection: "column"}} className="white_card card_height_100">
                                    <h4>Delivery Steps</h4>
                                    <div><BasicTimeline current={currentProcess.index} goToElement={goToElement} elements={elements}/></div>
                                    
                                </div>
                            </div>
                            <div style={{height: "85vh"}} className="col-lg-9">
                                <div style={{...centerStyle, flexDirection: "column"}} className="white_card card_height_100 mb_30">
                                    <currentProcess.component
                                        deliveryId={deliveryId}
                                        deliveryDetails={deliveryDetails} 
                                        setDeliveryDetails={setDeliveryDetails} 
                                        type="old"
                                        index={currentProcess.index} 
                                        isCompleted={currentProcess.completed} 
                                        completeProcess={completeProcess}
                                        goToElement={goToElement}
                                        name={getDeliveryQuery.data?.body.receiver.fullName}
                                        receiverApproval={getDeliveryQuery.data?.body.receiverApproval}
                                        adminApproval={getDeliveryQuery.data?.body.adminApproval}
                                        refetch={getDeliveryQuery.refetch}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>}
        </ErrorBoundary>
    )
}


export default UserViewSentDelivery