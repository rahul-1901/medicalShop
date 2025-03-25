import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import {connectDB} from './config/configDB.js';
import userRoutes from './routes/user.routes.js'; 
dotenv.config();
connectDB();

const app = express();
app.use(express.json())
app.use(cors());

app.use('/api', userRoutes)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {console.log(`Server running on ${PORT}`)})