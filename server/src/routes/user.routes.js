import express from "express"
import { 
    createNewUser, 
    getUser, 
    loginUser, 
    updateArrayField
} from "../controllers/user.controller.js"


const usersRouter = express.Router()

usersRouter.post("/create", createNewUser)
usersRouter.post("/login", loginUser)
usersRouter.post("/updatelist", updateArrayField)
usersRouter.get("/id/:id", getUser)


export default usersRouter