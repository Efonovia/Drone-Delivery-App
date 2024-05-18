import express from "express"
import { 
    createDelivery, 
    editDelivery, 
    getDelivery, 
    getReceiverDeliveries, 
    getAdminAllDeliveries, 
    getSenderDeliveries,
    getAdminPendingDeliveries,
    getCompletedDeliveries,
    getAdminUnProcessedDeliveries,
    getStats
} from "../controllers/delivery.controller.js"

const deliveryRouter = express.Router()

deliveryRouter.post("/create", createDelivery)
deliveryRouter.post("/edit", editDelivery)
deliveryRouter.get("/id/:id", getDelivery)

deliveryRouter.get("/stats", getStats)
deliveryRouter.get("/all", getAdminAllDeliveries)
deliveryRouter.get("/unprocessed", getAdminUnProcessedDeliveries)
deliveryRouter.get("/pending", getAdminPendingDeliveries)
deliveryRouter.get("/completed", getCompletedDeliveries)

deliveryRouter.get("/sender/:senderId", getSenderDeliveries)
deliveryRouter.get("/receiver/:receiverId", getReceiverDeliveries)

export default deliveryRouter