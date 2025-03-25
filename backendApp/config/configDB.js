import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()

if(!process.env.MONGO_URL) {
    throw new Error("Add mongoDB URL...")
}

export const connectDB = async () => {
    try {
        const connecting = mongoose.connect(process.env.MONGO_URL);
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
}