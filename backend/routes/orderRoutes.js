import express from 'express'
const router = express.Router()
import { addOrderItems, getOrderById, getMyOrders, getOrders } from '../controllers/orderController.js';
import { protect, admin } from '../middleware/authMiddleware.js'



router.route('/').post(protect, addOrderItems)
router.route('/').get(protect, admin, getOrders)
router.route('/myorders').get(protect, getMyOrders)
router.route('/:id').get(protect, getOrderById)


export default router