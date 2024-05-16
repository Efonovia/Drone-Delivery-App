import mongoose from "mongoose";

const DeliverySchema = mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    drone: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Drone',
        required: true
    },
    pickupLocation: {
        type: String,
        required: true,
    },
    deliveryLocation: {
        type: String,
        required: true,
    },
    deliveryScheduledDate: {
        type: Date,
        required: true,
    },
    deliveryCompletionDate: {
        type: Date,
    },
    dateCreated: {
        type: Date,
        required: true,
    },
    adminApproval: {
        type: String,
        required: true,
    },
    receiverApproval: {
        type: String,
        required: true,
    },
    senderApproval: {
        type: String,
        required: true,
    },
    completed: {
        type: Boolean,
        required: true,
    },
    hasPaid: {
        type: Boolean,
        required: true,
    },
    price: {
        type: Number,
        required: true
    },
    payloadWeight: {
        type: Number,
        required: true
    }
}, { timestamps: true })


const Delivery = mongoose.model("Delivery", DeliverySchema)
export default Delivery