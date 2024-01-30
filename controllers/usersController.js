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
    
        try {
    
        } catch (error) {
    
        }
};