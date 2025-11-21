import { Router } from "express";
import { AuthRequest } from "../middleware/genericMiddleware";
import { authMiddleware } from "../middleware/genericMiddleware";
import { OrderController } from "../controllers/OrderController";
import { OrderService } from "../services/OrderService";
import { normalize } from "path";

const router=Router();
const orderController=new OrderController();

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Operations related to orders
 */

/**
 * @swagger
 * /orders/registerOrder:
 *   post:
 *     summary: register new order
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               usuario_id:
 *                 type: string
 *                 example: MarinoPene
 *               producto:
 *                 type: string
 *                 example: pene congelado
 *               cantidad:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: order created   
 *       500:
 *         description: Error creating order
 */
router.post('/registerOrder',authMiddleware(['Admin']),orderController.createOrder);

/**
 * @swagger
 * /orders/getAllOrders:
 *   get:
 *     summary: Get all orders (only Admin)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Orders found
 *       403:
 *         description: Role not authorized
 *       500:
 *         description: Error getting orders
 */
router.get('/getAllOrders',authMiddleware(['Admin']),orderController.getAllOrders);


/**
 * @swagger
 * /orders/getOrdersById/{id}:
 *   get:
 *     summary: Get order by ID (only Admin)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Order ID
 *     responses:
 *       200:
 *         description: Order found
 *       404:
 *         description: Order not found
 *       403:
 *         description: Role not authorized
 *       500:
 *         description: Error getting order
 */
router.get('/getOrdersById/:id',authMiddleware(['Admin']), orderController.getOrderById);


/**
 * @swagger
 * /orders/getMyOrders:
 *   get:
 *     summary: Get orders by User ID
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Orders found
 *       404:
 *         description: No orders found for the specified user
 *       403:
 *         description: error unauthorized role
 *       500:
 *         description: error getting user's orders
 */
router.get('/getMyOrders',authMiddleware(['Admin','Usuario']),orderController.getMyOrders);

export default router;