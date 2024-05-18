import smallDrone from "../assets/img/drone-small.png"
import mediumDrone from "../assets/img/drone-medium.png"
import largeDrone from "../assets/img/drone-large.png"

export const centerStyle = {display: "flex", justifyContent: "center", alignItems: "center"}

export const dronePic = {
    small: smallDrone,
    medium: mediumDrone,
    large: largeDrone
}

export function formatDate(date) {
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    const formattedDate = new Date(date).toLocaleDateString('en-US', options);
    return formattedDate;
}

export function capitalizeWords(text) {
    if (!text) return '';
    const words = text.split(' ');
    const capitalizedWords = words.map(word => {
        return word.charAt(0).toUpperCase() + word.slice(1);
    });
    return capitalizedWords.join(' ');
}

export function formatTime(dateString) {
    const date = new Date(dateString);
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const amOrPm = hours >= 12 ? 'pm' : 'am';
    hours %= 12;
    hours = hours || 12;
    const formattedTime = `${hours}:${minutes < 10 ? '0' : ''}${minutes} ${amOrPm}`;
    return formattedTime;
}

export function checkFormFields(formData) {
    const emptyFields = [];

    for (const field in formData) {
        if (!formData[field] && field !== "isAdmin") {
            emptyFields.push(field);
        }
    }

    return emptyFields;
}

export function isDateGreaterOrEqual(date1, date2) {
    const year1 = date1.getFullYear();
    const month1 = date1.getMonth();
    const day1 = date1.getDate();

    const year2 = date2.getFullYear();
    const month2 = date2.getMonth();
    const day2 = date2.getDate();

    if (year1 === year2 && month1 === month2 && day1 === day2) {
        return true; // Dates are equal
    } else if (year1 > year2 || (year1 === year2 && month1 > month2) || (year1 === year2 && month1 === month2 && day1 > day2)) {
        return true; // date1 is greater than date2
    } else {
        return false; // date1 is less than date2
    }
}

export function getDateAndTimeObject(dateInput) {
    const date = new Date(dateInput)
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    const deliveryDate = `${year}-${month}-${day}`;
    const deliveryTime = `${hours}:${minutes}`;

    return { deliveryDate, deliveryTime };
}

const statusPriority = {
    "ACTIVE": 0,
    "Needs your approval": 1,
    "Unprocessed": 1,
    "Pending": 2,
}

export function sortDeliveries(arr, client) {
    if(arr.length < 1) return []
    return arr.sort((a, b) => {
        console.log(a)
        console.log(getDeliveryStatus(a, client))
        const statusA = getDeliveryStatus(a, client).status
        const statusB = getDeliveryStatus(b, client).status
    
        const priorityA = statusPriority[statusA] !== undefined ? statusPriority[statusA] : Infinity;
        const priorityB = statusPriority[statusB] !== undefined ? statusPriority[statusB] : Infinity;
    
        if (priorityA === priorityB) {
            return statusA.localeCompare(statusB) || 0;
        }
    
        return priorityA - priorityB;
    })
}

export function getDeliveryStatus(delivery, client) {

    const { receiverApproval, adminApproval, hasPaid, completed } = delivery

    if(client === "sender") {
        if(receiverApproval === "none") {
            return { 
                    status: "Recipient hasn't approved yet",
                    color: "white",
                }
        }

        if(receiverApproval === "denied") {
            return { 
                    status: "Recipient declined your delivery",
                    color: "red",
                }
        }

        if(receiverApproval === "approved" && !hasPaid) {
            return { 
                    status: "You haven't made payment yet",
                    color: "white",
                }
        }

        if(receiverApproval === "approved" && hasPaid && adminApproval === "none") {
            return { 
                    status: "Waiting for admin confirmation",
                    color: "white",
                }
        }

        if(receiverApproval === "approved" && hasPaid && adminApproval === "denied") {
            return { 
                    status: "Admin denied",
                    color: "red",
                }
        }
    }

    if(client === "receiver") {
        if(receiverApproval === "none") {
            return { 
                    status: "Needs your approval",
                    color: "#ffb11f",
                }
        }

        if(receiverApproval === "approved" && !hasPaid) {
            return { 
                    status: "Sender hasn't made payment yet",
                    color: "white",
                }
        }

        if(receiverApproval === "approved" && hasPaid && adminApproval === "none") {
            return { 
                    status: "Waiting for admin confirmation",
                    color: "white",
                }
        }

        if(receiverApproval === "approved" && hasPaid && adminApproval === "denied") {
            return { 
                    status: "Admin denied",
                    color: "red",
                }
        }
    }

    if(client === "admin") {
        if(adminApproval === "none" && receiverApproval === "approved" && hasPaid) {
            return { 
                    status: "Unprocessed",
                    color: "red",
                }
        }

        if(adminApproval==="approved" && receiverApproval === "approved" && hasPaid && !completed) {
            return { 
                    status: "Pending",
                    color: "#ffb11f",
                }
        }
    
        if(completed) {
            return { 
                    status: "Completed",
                    color: "#00ff15",
                }
        }

        if(receiverApproval === "approved" && hasPaid && adminApproval === "denied") {
            return { 
                    status: "Denied",
                    color: "red",
                }
        }
    }

    if(completed) {
        return { 
                status: "Completed",
                color: "#00ff15",
            }
    }

    if(adminApproval==="approved" && receiverApproval === "approved" && hasPaid && !completed) {
        return { 
                status: "Pending",
                color: "#ffb11f",
            }
    }

    if(adminApproval==="approved" && receiverApproval === "approved" && hasPaid && !completed && isDateGreaterOrEqual(new Date(), new Date(delivery.deliveryScheduledDate))) {
        return { 
                status: "ACTIVE",
                backgroundColor: "#00ff15",
                color: "white",
            }
    }
}