import 'dotenv/config.js';
import express from 'express';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import morgan from 'morgan';
import cors from 'cors';
import apiRouter from './routes/api-router.js';
import rateLimit from 'express-rate-limit';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import Constants from './constants/Constants.js';

const app = express();

// Rate limiter configuration
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100,
});

// Swagger/Open API Config
const OPENAPI_OPTIONS = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'ProductTrackerAPI',
            version: '1.0.0',
            description: 'API documentation for Product Tracker',
        },
        servers: [{ url: `http://${Constants.HOSTNAME}:${Constants.PORT}/api` }],
    },
    apis: ['./docs/*.yaml'],
};

// Express middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(compression());
app.use(morgan('dev'));
app.use(cors());
app.use(limiter);
app.use('/api/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJSDoc(OPENAPI_OPTIONS)));

// Routing
app.use('/api', apiRouter);

export default app;
