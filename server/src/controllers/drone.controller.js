import DroneDatabase from "../models/drone.models.js"


export const getDronesAvailability = async(req, res) => {
    try {
        const availableDrones = await DroneDatabase.find({ isAvailable: true })
        const drones = {
            small: 0,
            medium: 0,
            large: 0
        }

        availableDrones.forEach(drone => drones[drone.type]++)

        return res.status(200).json({ ok: true, body: drones })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ ok: false, error: "error getting drones availability" })
    }
}