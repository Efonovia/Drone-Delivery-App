import React from 'react';
import { centerStyle } from '../utils/utils';
import BasicTimeline from '../components/mui/BasicTimeline.components.mui';
import SelectDrones from '../components/delivery processes/SelectDrones.components';
import DeliveryForm from '../components/delivery processes/DeliveryForm.components';
import ProcessPayment from '../components/delivery processes/ProcessPayment.components';
import Completed from '../components/delivery processes/Completed.components';
import WaitingForRecipientApproval from '../components/delivery processes/WaitingForRecipientApproval.components';
import WaitingForAdminApproval from '../components/delivery processes/WaitingForAdminApproval.components';
import { useDispatch, useSelector } from 'react-redux';


function MakeDelivery() {
    const userInfo = useSelector(state => state.user)
    const [deliveryDetails, setDeliveryDetails] = React.useState({
        sender: userInfo._id,
        receiver: "",
        droneType: "",
        pickupLocation: "",
        deliveryLocation: "",
        deliveryScheduledDate: "",
        payloadWeight: ""
    })
    console.log(deliveryDetails)

    let elements = [
        { index: 0, description: "Select Drone", completed: false, component: props => SelectDrones({setDeliveryDetails: setDeliveryDetails, ...props}) },
        { index: 1, description: "Enter Delivery Info", completed: false, component: props => DeliveryForm({setDeliveryDetails: setDeliveryDetails, ...props}) },
        { index: 2, description: "Wait for recipient's approval", completed: false, component: WaitingForRecipientApproval },
        { index: 3, description: "Process payment", completed: false, component: ProcessPayment },
        { index: 4, description: "Wait for admin approval", completed: false, component: WaitingForAdminApproval },
        { index: 5, description: "Completed", completed: false, component: Completed },
    ]
    const [processes, setProcesses] = React.useState(elements)
    console.log(processes)
    const [currentProcess, setCurrentProcess] = React.useState(processes[0])

    function goToElement(index) {
        if(index > 0) {
            if(processes[index-1].completed) {
                setCurrentProcess(processes.find(process => process.index === index))
            }
        } else {
            setCurrentProcess(processes.find(process => process.index === index))
        }
        // setCurrentProcess(processes.find(process => process.index === index))
    }

    function completeProcess(index) {
        const updatedProcesses = [...processes]
        updatedProcesses.find(process => process.index === index).completed = true
        setProcesses(updatedProcesses)
    }

    return (
        <section className="profile-section">
            <div className="main_content_iner overly_inner ">
                <div className="container-fluid p-0 ">

                    <div className="row">
                        <div style={{height: "85vh"}} className="col-lg-3 ">
                            <div style={{...centerStyle, flexDirection: "column"}} className="white_card card_height_100">
                                <h4>Delivery Steps</h4>
                                <div><BasicTimeline current={currentProcess.index} goToElement={goToElement} elements={processes}/></div>
                                
                            </div>
                        </div>
                        <div style={{height: "85vh"}} className="col-lg-9">
                            <div style={{...centerStyle, flexDirection: "column"}} className="white_card card_height_100 mb_30">
                                <currentProcess.component 
                                    setProcesses={setProcesses}
                                    deliveryDetails={deliveryDetails} 
                                    type="new" 
                                    index={currentProcess.index} 
                                    isCompleted={currentProcess.completed} 
                                    completeProcess={completeProcess}
                                    goToElement={goToElement}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}


export default MakeDelivery