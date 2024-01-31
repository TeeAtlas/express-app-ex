import express from 'express';
import { getUsers, getUser, postUser, putUser, deleteUser } from '../controllers/usersController.js';

//create instance of express and where function is invoked to handle ids/routes
const usersRouter = express.Router();

usersRouter.get('/', getUsers);
usersRouter.get('/:id', getUser);
usersRouter.post('/', postUser);
usersRouter.put('/:id', putUser);
usersRouter.delete('/:id', deleteUser);

export default usersRouter;