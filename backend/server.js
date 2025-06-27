import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';

import { globalErrorHandler, notFound } from './middleware/errorHandler.js';
import blogRoutes from './route/BlogRoute.js';

dotenv.config();
const app = express();

// Middlewares
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use('/blog', blogRoutes)

// Error handlers
app.use(notFound);
app.use(globalErrorHandler);

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Database connected successfully')
        const port = process.env.PORT || 3000;
        app.listen(port, () => console.log('Listen on port ', port))
    })
    .catch((err) => {
        console.log('Connection failed ', err.message)
        process.exit(1)
    })