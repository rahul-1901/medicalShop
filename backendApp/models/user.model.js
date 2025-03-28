import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    disease: {
        type: String,
        required: true
    },
    medicine: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    price: {
        type: String, 
        required: true
    }
})

const Usermodel = mongoose.model("user", UserSchema);

export default Usermodel