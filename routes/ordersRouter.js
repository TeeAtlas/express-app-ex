import express from 'express';
import { check } from 'express-validator';
import { getOrders, getOrder, postOrder, putOrder, deleteOrder } from "../controllers/ordersController.js";

//create instance of express where function where function is invoked
const ordersRouter = express.Router();

ordersRouter.get('/', getOrders);
ordersRouter.get('/:id', getOrder);
ordersRouter.post('/', [
    check('price').isNumeric(),
    check('date').isISO8601(),
    check('user_id').isInt()
], postOrder);

ordersRouter.put('/:id', [
     check('price').isNumeric(),
     check('date').isISO8601(),
     check('user_id').isInt()
], putOrder);
ordersRouter.delete('/:id', deleteOrder);

export default ordersRouter;