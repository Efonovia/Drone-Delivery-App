import mongoose from "mongoose"

const DroneSchema = mongoose.Schema({
    type: {
        type: String,
        required: true,
    },
    isAvailable: {
        type: Boolean
    }
})


const Drone = mongoose.model("Drone", DroneSchema)
export default Drone