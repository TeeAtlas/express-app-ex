import express from 'express';
import { getIds, getId, postId } from '../controllers/idsController.js';

//create instance of express and where function is invoked to handle ids/routes
const idsRouter = express.Router();

idsRouter.get('/', getIds);
idsRouter.get('/:id', getId);
// idsRouter.post('/', postId);