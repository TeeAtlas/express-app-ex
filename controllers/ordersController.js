import { check, validationResult } from 'express-validator';
import { pool } from "../db/pool.js";
//validator is only used on functions that require user input

export const getOrders = async (req, res) => {
    try {
        const result = await pool.query(`SELECT * FROM Orders`);
        res.json(result.rows); // send the result back to the client
    } catch (error) {
        console.log(error);
        res.status(404).json({message: "Orders not found"})
    }
};

export const getOrder = async (req, res) => {
    const {id} = req.params;

    try{
        const result = await pool.query(`SELECT * FROM orders WHERE id = $1`, [id]);
        if(result.rows.length === 0) {
            res.status(404).json({message: `Order ${id} not found`})
        } else {
            //setting default status to 200(success)
            res.json(result.rows[0]);
        }
        
    } catch (error) {
        console.error(error)
        res.sendStatus(500);
    }
};

export const postOrder = async (req, res) => {
    //validation checks must be performed before the rest of the function's logic
    const errors = validationResult(req);
    console.log(errors.array());
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    //then we export the properties from the body
    // const { id } = req.params; //get user id from params
    const { price, date, user_id } = req.body; 

    try {
        const result = await pool.query(`INSERT INTO orders (price, date, user_id) VALUES ($1, $2, $3) RETURNING *`, [price, date, user_id]);
        res.status(201).json(result.rows[0]); //send the created order back to the client
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'an error occured while handling order'});
    }

};

export const putOrder = async (req, res) => {
    //validation checks must be performed before the rest of the function's logic
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const { price, date, user_id } = req.body;

    try {
        const result = await pool.query(`UPDATE orders SET price = $1, date = $2, user_id = $3 WHERE id = $4 RETURNING *`, [price, date, user_id, id]);
        console.log(`update operation result: ${JSON.stringify(result.rows)}`);
        if(result.rows.length === 0) {
            res.status(404).json({ message: `Order with id ${id} not found`});
        } else {
            res.json(result.rows[0]);
        }
    } catch (error) {
        console.error(error);
        res.sendStatus(500); 
    }
};

export const deleteOrder = async (req, res) => {
    // here we get he user id from params
    const { id } = req.params;
    
    try {
        const result = await pool.query(`DELETE FROM orders WHERE id = $1 RETURNING *`, [id]);
        if(result.rows.length === 0) {
            res.status(404).json({ message: `Order ${id} not in database`});
        } else {
            //if a row was deleted, return the deleted user
            res.json(result.rows[0]);
        }
    } catch (error) {
        console.log('Error deleting order', error);
        req.sendStatus(500);
    }
};