import express from 'express';
import { getProductById } from '../controllers/productController';

/**
 * Express router for handling product routes.
 */
const router = express.Router();

router.get('/product/:id', getProductById);

export default router;