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

/* for examples usersRouter.delete("/:id", checkUser, deleteUser)

 export const checkUser = async (req, res, next) => {
    const { id } = req.params;
    if (!id) res.status(400).json("User id required.");
    try {
      const text = "SELECT * FROM users WHERE id=$1";
      const values = [id];
      const { rows } = await pool.query(text, values);
      rows.length === 0 ? res.status(404).json("User not found") : next();
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }; */