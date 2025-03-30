import mongoose from "mongoose";
import Usermodel from "./user.model.js";

const AdminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    myCustomers: [
        {
            _id: {type: mongoose.Schema.Types.ObjectId, ref: "Usermodel"}
        }
    ]
})

const Adminmodel = mongoose.model("admin", AdminSchema);

export default Adminmodel