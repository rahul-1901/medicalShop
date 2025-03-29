import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    }
})

const Adminmodel = mongoose.model("admin", AdminSchema);

export default Adminmodel