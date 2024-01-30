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