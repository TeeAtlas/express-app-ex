import express from 'express';
import { getUsers, getUser, postUser } from '../controllers/usersController.js';

//create instance of express and where function is invoked to handle ids/routes
const usersRouter = express.Router();

usersRouter.get('/', getUsers);
usersRouter.get('/:id', getUser);
usersRouter.post('/', postUser);
usersRouter.put('/:id', putUser);

export default usersRouter;