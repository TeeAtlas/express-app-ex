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
    const {id}
    try {
        const = await ;
        res.status(201)
    } catch (error) {
        console.error(error);
        res.sendStatus(418);
    }
}
