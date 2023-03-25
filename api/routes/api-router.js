import express from 'express';
import { getProducts } from '../controllers/product-api-controller.js';

const router = express.Router();

router.route('/health')
    .get((req, res) => res.status(200).send('API is up and running!'));

router.route('/products')
    .get(getProducts);

export default router;
