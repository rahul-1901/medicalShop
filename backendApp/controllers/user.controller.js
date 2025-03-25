import Usermodel from "../models/user.model.js";
import jwt from  'jsonwebtoken';
import dotenv from 'dotenv';

export const userDetails = async (req, res) => {
    try {
        const user = await Usermodel.find({});
        if(!user) {
            return res.status(500).json({
                message: "User's not added!!"
            })
        }

        res.status(200).json({
            user
        })
    } catch (error) {
        return res.status(500).json({
            message: "Error....",
            success: false
        })
    }
}

export const searchedUser = async (req, res) => {
    try {
        const name = req.body.name;

        const user = await Usermodel.findOne({
            name  
        })

        if(!user) {
            return res.status(500).json({
                message: "User not founded..."
            })
        }

        res.json({
            user
        })
    } catch (error) {
        return res.status(404).json({
            message: "Error..."
        })
    }
}