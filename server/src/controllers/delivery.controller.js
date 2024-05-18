import DeliveryDatabase from "../models/delivery.models.js"
import DroneDatabase from "../models/drone.models.js"
import UserDatabase from "../models/user.models.js"

const prices = {
    small: 15000,
    medium: 25000,
    large: 40000
}

export const getStats = async(req, res) => {
    try {
        const allDeliveries = await DeliveryDatabase.find({ senderApproval: "approved" })
        const customerCount = await UserDatabase.countDocuments({ isAdmin: false })

        let income = 0
        let processed = 0
        let successful = 0
        let total = 0
        let weight = 0

        for(let i=0;i<6; i++) {
            const current = allDeliveries[i]
            income += current.price
            weight += current.payloadWeight
            total += 1

            if(current.completed) {
                successful +=1
            }

            if(current.receiverApproval === "approved" && current.adminApproval === "approved" && current.hasPaid && !current.completed) {
                processed +=1
            }
        }

        return res.status(200).json({ 
            ok: true, 
            body: {
                totalIncome: income,
                totalCustomers: customerCount,
                totalDrones: 12,
                processedDeliveries: active,
                successfulDeliveries: successful,
                totalDeliveries: total,
                averagePackageWeight: weight/total
            } 
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ ok: false, error: "Couldn't get stats" })
    }
}

export const createDelivery = async(req, res) => {
    try {
        const {
            sender,
            receiver,
            droneType,
            pickupLocation,
            deliveryLocation,
            deliveryScheduledDate,
            payloadWeight
        } = req.body

        const drone = await DroneDatabase.findOne({ type: droneType, isAvailable: true })
        const receiverUser = await UserDatabase.findOne({ email: receiver })

        if(receiverUser._id === sender)  {
            return res.status(404).json({ ok: false, error: "You can't send a delivery to yourself" })
        }

        if(!drone) {
            return res.status(404).json({ ok: false, error: "Unfortunately the drone you selected is no longer available" })
        }

        if(!receiverUser) {
            return res.status(404).json({ ok: false, error: "The user You are delivering to does not exist" })
        }

        const newDelivery = new DeliveryDatabase({
            sender,
            receiver: receiverUser._id,
            drone: drone._id,
            pickupLocation,
            deliveryLocation,
            deliveryScheduledDate,
            deliveryCompletionDate: null,
            dateCreated: new Date(),
            adminApproval: "none",
            receiverApproval: "none",
            senderApproval: "approved",
            completed: false,
            price: prices[droneType],
            payloadWeight,
            hasPaid: false
        })

        drone.isAvailable = false
        await newDelivery.save()
        await drone.save()
        return res.status(201).json({ ok: true, body: newDelivery })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ ok: false, error: "Couldn't create delivery" })
    }
}

export const editDelivery = async(req, res) => {
    try {
        const { deliveryId, updates } = req.body
        const delivery = await DeliveryDatabase.findById(deliveryId)

        if(!delivery) {
            console.log("delivery not found")
            return res.status(404).json({ ok: false, error: "delivery does not exist" })
        }

        const droneUpdate = updates.find(update => update.field === "droneType")
        if(droneUpdate) {
            const oldDrone = await DroneDatabase.findById(delivery.drone)
            oldDrone.isAvailable = true
            await oldDrone.save()

            const newDrone = await DroneDatabase.findOne({ type: droneUpdate.value })
            newDrone.isAvailable = false
            await newDrone.save()
            delivery.drone = newDrone._id
            delivery.price = prices[droneUpdate.value]
        }
        
        updates.forEach(({ field, value }) => {
            if(field !== "droneType") {
                delivery[field] = value;
            }
        })

        await delivery.save()
        const updatedDelivery = await DeliveryDatabase.findById(deliveryId)
        return res.status(201).json({ ok: true, body: updatedDelivery })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ ok: false, error: "couldn't make updates. try again" })
    }
}

export const getDelivery = async(req, res) => {
    try {
        const { id } = req.params

        const delivery = await DeliveryDatabase.findById(id)
        .populate({
            path: 'sender',
            select: '_id email firstName lastName'
        })
        .populate({
            path: 'receiver',
            select: '_id email firstName lastName'
        })
        .populate({
            path: 'drone',
            select: '_id type'
        })

        if(!delivery) return res.status(404).json({ ok: false, error: "delivery doesn't exist" })
        // const receiver = await UserDatabase.findById(delivery.receiver)
        // const drone = await DroneDatabase.findById(delivery.drone)
        return res.status(200).json({ ok: true, body: delivery})
    } catch (error) {
        console.log(error)
        return res.status(500).json({ ok: false, error: "couldn't get delivery. try again" })
    }
}

export const getAdminAllDeliveries = async(req, res) => {
    try {
        const allDeliveries = await DeliveryDatabase.find(
        { 
            senderApproval: "approved",
            receiverApproval: "approved",
            hasPaid: true

        }, { '__v': 0 })
        .populate({
            path: 'sender',
            select: '_id email firstName lastName'
        })
        .populate({
            path: 'receiver',
            select: '_id email firstName lastName'
        })
        .sort({ createdAt: -1 })
        return res.status(200).json({ ok: true, body: allDeliveries })
    } catch (error) {
        return res.status(500).json({ ok: false, error: "couldn't get deliveries. try again" })
    }
}

export const getAdminPendingDeliveries = async(req, res) => {
    try {
        const pendingDeliveries = await DeliveryDatabase.find(
        {
            senderApproval: "approved",
            adminApproval: "approved",
            receiverApproval: "approved",
            hasPaid: true,
            completed: false,
        }, 
        { '__v': 0 })
        .populate({
            path: 'sender',
            select: '_id email firstName lastName'
        })
        .populate({
            path: 'receiver',
            select: '_id email firstName lastName'
        })
        .sort({ createdAt: -1 })


        return res.status(200).json({ ok: true, body: pendingDeliveries })
    } catch (error) {
        return res.status(500).json({ ok: false, error: "couldn't get deliveries. try again" })
    }
}

export const getAdminUnProcessedDeliveries = async(req, res) => {
    try {
        const unProcessedDeliveries = await DeliveryDatabase.find(
        {
            senderApproval: "approved",
            receiverApproval: "approved",
            adminApproval: "none",
            hasPaid: true,
            completed: false
        }, 
        { '__v': 0 })
        .populate({
            path: 'sender',
            select: '_id email firstName lastName'
        })
        .populate({
            path: 'receiver',
            select: '_id email firstName lastName'
        })
        .sort({ createdAt: -1 })


        return res.status(200).json({ ok: true, body: unProcessedDeliveries })
    } catch (error) {
        return res.status(500).json({ ok: false, error: "couldn't get deliveries. try again" })
    }
}

export const getCompletedDeliveries = async(req, res) => {
    try {
        const completedDeliveries = await DeliveryDatabase.find(
        {
            senderApproval: "approved",
            receiverApproval: "approved",
            adminApproval: "approved",
            hasPaid: true,
            completed: true
        }, 
        { '__v': 0 })
        .populate({
            path: 'sender',
            select: '_id email firstName lastName'
        })
        .populate({
            path: 'receiver',
            select: '_id email firstName lastName'
        })
        .sort({ createdAt: -1 })


        return res.status(200).json({ ok: true, body: completedDeliveries })
    } catch (error) {
        return res.status(500).json({ ok: false, error: "couldn't get deliveries. try again" })
    }
}

export const getReceiverDeliveries = async(req, res) => {
    try {
        const {receiverId} = req.params
        const receiverDeliveries = await DeliveryDatabase.find(
        { 
            receiver: receiverId,
            senderApproval: "approved",
            receiverApproval: { $in: ["approved", "none"] },

        }, { '__v': 0 })
        .populate({
            path: 'sender',
            select: '_id email firstName lastName'
        })
        .sort({ createdAt: -1 })
        return res.status(200).json({ ok: true, body: receiverDeliveries })
    } catch (error) {
        return res.status(500).json({ ok: false, error: "couldn't get deliveries. try again" })
    }
}

export const getSenderDeliveries = async(req, res) => {
    try {
        const {senderId} = req.params
        const senderDeliveries = await DeliveryDatabase.find(
        { 
            sender: senderId,
            senderApproval: "approved"

        }, { '__v': 0 })
        .populate({
            path: 'receiver',
            select: '_id email firstName lastName'
        })
        .sort({ createdAt: -1 })
        return res.status(200).json({ ok: true, body: senderDeliveries })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ ok: false, error: "couldn't get deliveries. try again" })
    }
}