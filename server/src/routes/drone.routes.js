import express from "express"
import { getDronesAvailability } from "../controllers/drone.controller.js"


const dronesRouter = express.Router()

dronesRouter.get("/availability", getDronesAvailability)


export default dronesRouter