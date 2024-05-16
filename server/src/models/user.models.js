import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        min: 8,
        max: 50,
    },
    telephone: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        default: ""
    },
    address: {
        type: String,
        default: ""
    },
    otherAddresses: {
        type: Array,
        default: [],
    },
    friends: {
        type: Array,
        default: [],
    },
    isAdmin: {
        type: Boolean,
    }
}, { timestamps: true })

const User = mongoose.model("User", UserSchema)
export default User