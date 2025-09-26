import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'
import connectDB from './config/db.js';
import errorHandler from './middleware/errorMiddleware.js';
import path from 'path'
import userRoutes from './routes/userRoutes.js';
import adminRoutes from './routes/adminRoutes.js'
const __dirname = import.meta.dirname;
const __filename = import.meta.filename;

dotenv.config();

connectDB();

const app = express()

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended: false}))

app.use('/uploads',express.static(path.join(__dirname,'uploads')));

app.use('/api/users',userRoutes)
app.use('/api/admin',adminRoutes)

app.use(errorHandler);

const PORT = process.env.PORT || 7000

app.listen(PORT, ()=>console.log('server running on port '+PORT))
