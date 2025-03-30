import Usermodel from "../models/user.model.js";
import Adminmodel from "../models/admin.model.js";
import jwt from  'jsonwebtoken';
import dotenv from 'dotenv';

export const userDetails = async (req, res) => {
    try {
        const email = req.email
        const admin = await Adminmodel.findOne({email});
        if(!admin) {
            return res.status(500).json({
                message: "Admin's dont't exist!!"
            })
        }

        const allUsersMine = await Usermodel.find({
            _id: { 
                $in: admin.myCustomers
            }
        })
        
        return res.status(200).json({
            allUsersMine
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
        const email = req.email
        const name = req.body.name;

        const admin = await Adminmodel.findOne({
            email
        })

        if (!admin) {
            return res.status(404).json({
                message: "Admin does not exist!",
            });
        }

        if (!admin.myCustomers || admin.myCustomers.length === 0) {
            return res.status(200).json({ user: [] });
        }
        
        const user = await Usermodel.find({
            _id: {$in: admin.myCustomers},
            name: name
        })

        if(!user) {
            return res.status(500).json({
                message: "User not founded..."
            })
        }

        return res.status(200).json({
            user
        })
    } catch (error) {
        return res.status(404).json({
            message: "Error..."
        })
    }
}

export const addCustomer = async (req, res) => {
    try {
        const email = req.email;
        const { name, phoneNumber, address, disease, medicine, date, price } = req.body;

        const admin = await Adminmodel.findOne({ email });

        if (!admin) {
            return res.status(404).json({
                message: "Admin don't exist!",
            });
        }

        const user = await Usermodel.create({
            name,
            address,
            phoneNumber,
            medicine,
            disease,
            date,
            price
        });

        admin.myCustomers.push(user._id);
        await admin.save();

        return res.status(201).json({
            message: `User named: ${user.name} created...`
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error creating user...",
            success: false,
        });
    }
};
