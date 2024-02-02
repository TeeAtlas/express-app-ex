import { check, validationResult } from 'express-validator';
import { pool } from "../db/pool.js";

export const getUsers = async (req, res) => {

    try {
        const result = await pool.query('SELECT * FROM users');
        res.json(result.rows);
    } catch (error) {
        console.log(error);
        res.status(404).json({message: "users not found"})
    }
};



export const getUser = async (req, res) => {
    const {id} = req.params;
    
    try {
        const {rows} = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
        if(rows.length === 0) {
            res.status(404).json({message: `user ${id} not found`});
        } else {
            //this sets default status to 200 (success)
            res.json(rows[0]);
        }
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
};

export const postUser =  async (req, res) => {
    //validate before logic of the function
    const errors = validationResult(req);
    console.log(errors.array());
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    };


    //first we export the propertied from the body
    const {first_name, last_name, age, active} = req.body;

    //try statement will attempt to execute code inside
    try {
        //query to insert new user
        const result = await pool.query(`INSERT INTO users (first_name, last_name, age, active) VALUES ($1, $2, $3, $4) RETURNING *`, [first_name, last_name, age, active]);
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error("Error inserting new user", error); 
        res.sendStatus(500);
    }
}


export const putUser = async (req, res) => {
    //validate before logic of function
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { id } = req.params; //get user id from params
    const { first_name, last_name, age, active } = req.body;

    try {
        const result = await pool.query(`UPDATE users SET first_name =$1, last_name = $2, age = $3, active = $4 WHERE id = $5 RETURNING *`, [first_name, last_name, age, active, id]);
        if (result.rows.length === 0) {
            res.status(404).json({ message: `User ${id} not found`});
        } else {
            // if row was indeed updated 
            res.json(result.rows[0]);
        }
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}

export const deleteUser = async (req, res) => {
    const { id } = req.params; 

    try {
        const result = await pool.query(`DELETE FROM users WHERE id = $1 RETURNING *`, [id]);
        if (result.rows.length === 0)
        {
            res.status(404).json({ message: `User ${id} not found` });
        } else {
            //if a row was deleted, return the deleted user
            res.json(result.rows[0]);
        }
    } catch (error) {
        console.log('Error deleting user', error);
        res.sendStatus(500);
    }
}
