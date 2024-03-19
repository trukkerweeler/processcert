// import { getUserValue } from './utils.mjs';
require('dotenv').config();
// sequelize...

const express = require('express');
const router = express.Router();
const mysql = require('mysql');


router.put('/:id', (req, res) => {
    // console.log("Params: " + req.params.id);
    console.log(req.body);
    // let mytable = '';
    // let appended = '';
    // const myfield = Object.keys (req.body) [2]
    // // console.log(myfield);
    
    // try {
    //     const connection = mysql.createConnection({
    //         host: process.env.DB_HOST,
    //         user: process.env.DB_USER,
    //         password: process.env.DB_PASS,
    //         port: 3306,
    //         database: 'quality'
    //     });
    //     connection.connect(function(err) {
    //         if (err) {
    //             console.error('Error connecting: ' + err.stack);
    //             return;
    //         }
    //     // console.log('Connected to DB');
    //     // console.log(req.body);
    //     const query = `REPLACE INTO ${mytable} SET 
    //     INPUT_ID = '${req.params.id}',
    //     ${myfield} = '${appended}'`;
    //     // console.log(query);
    //     connection.query(query, (err, rows, fields) => {
    //         if (err) {
    //             console.log('Failed to query for input : ' + err);
    //             res.sendStatus(500);
    //             return;
    //         }
    //         res.json(rows);
    //     });
    
    //     connection.end();
    //     });
    // } catch (err) {
    //     console.log('Error connecting to Db 83');
    //     return;
    // }

});

module.exports = router;