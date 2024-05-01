// import { getUserValue } from './utils.mjs';
require('dotenv').config();
// sequelize...

const express = require('express');
const router = express.Router();
const mysql = require('mysql');


// ==================================================
// Get records
router.get('/', (req, res) => {
    try {
        const connection = mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            port: 3306,
            database: 'quality'
        });
        connection.connect(function(err) {
            if (err) {
                console.error('Error connecting: ' + err.stack);
                return;
            }
        // console.log('Connected to DB');

        const query = `select * from PRODUCT_BOS where PRODUCT_ID = '${req.query.PRODUCT_ID}'`;
        
        connection.query(query, (err, rows, fields) => {
            if (err) {
                console.log('Failed to query for inputs: ' + err);
                res.sendStatus(500);
                return;
            }
            res.json(rows);
        });

        connection.end();
        });
    
    } catch (err) {
        console.log('Error connecting to Db');
        return;
    }

});


// ==================================================
// Create a record
router.post('/', (req, res) => {
    try {
        const connection = mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            port: 3306,
            database: 'quality'
        });
        connection.connect(function(err) {
            if (err) {
                console.error('Error connecting: ' + err.stack);
                return;
            }
        // console.log('Connected to DB');
        const pid = req.body.PRODUCT_ID;
        for (let i = 0; i < req.body.BOS_SPECIFICATION.length; i++) {
            const query = `insert into PRODUCT_BOS values (
                '${pid}'
                , '${req.body.BOS_SPECIFICATION[i]}'
            )`;
        
            // console.log(query);

            connection.query(query, (err, rows, fields) => {
                if (err) {
                    console.log('Failed to query for PRODUCT_BOS insert: ' + err);
                    res.sendStatus(500);
                    return;
                }
                // res.json(rows);
            });
        }
        connection.end();
        });

    } catch (err) {
        console.log('Error connecting to Db (changes 88)');
        return;
    }

});

// ==================================================
// Get a single record
router.get('/:pid', (req, res) => {
    // console.log(req.params.id);
    try {
        const connection = mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            port: 3306,
            database: 'quality'
        });
        connection.connect(function(err) {
            if (err) {
                console.error('Error connecting: ' + err.stack);
                return;
            }
        // console.log('Connected to DB');

        const query = `select pb.PRODUCT_ID, pb.BOM_PRODUCT_ID, ps.BOS_SPECIFICATION_ID from PRODUCT_BOM pb left join PRODUCT_BOS ps on pb.BOM_PRODUCT_ID = ps.PRODUCT_ID where pb.PRODUCT_ID = '${req.params.pid}'`;

        // console.log(query);

        connection.query(query, (err, rows, fields) => {
            if (err) {
                console.log('Failed to query for corrective actions: ' + err);
                res.sendStatus(500);
                return;
            }
            res.json(rows);
        });

        connection.end();
        });
    } catch (err) {
        console.log('Error connecting to Db 83');
        return;
    }
});

router.put('/:id', (req, res) => {
    // console.log("Params: " + req.params.id);
    // console.log(req.body);
    let mytable = '';
    let appended = '';
    const myfield = Object.keys (req.body) [2]
    // console.log(myfield);
    switch (myfield) {
        case 'RESPONSE_TEXT':
            // console.log('Response');
            mytable = 'PPL_INPT_RSPN';
            // appended = req.body.RESPONSE_TEXT.replace(/'/g, "\\'");
            appended = req.body.RESPONSE_TEXT;
            break;
        case 'FOLLOWUP_TEXT':
            // console.log('Followup');
            mytable = 'PPL_INPT_FLUP';
            appended = req.body.FOLLOWUP_TEXT
            break;
        case 'INPUT_TEXT':
            // console.log('Input');
            mytable = 'PPL_INPT_TEXT';
            appended = req.body.INPUT_TEXT
            break;
        default:
            console.log('No match');
    }
    // Replace the br with a newline
    appended = appended.replace(/<br>/g, "\n");
    try {
        const connection = mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            port: 3306,
            database: 'quality'
        });
        connection.connect(function(err) {
            if (err) {
                console.error('Error connecting: ' + err.stack);
                return;
            }
        // console.log('Connected to DB');
        // console.log(req.body);
        const query = `REPLACE INTO ${mytable} SET 
        INPUT_ID = '${req.params.id}',
        ${myfield} = '${appended}'`;
        // console.log(query);
        connection.query(query, (err, rows, fields) => {
            if (err) {
                console.log('Failed to query for input : ' + err);
                res.sendStatus(500);
                return;
            }
            res.json(rows);
        });
    
        connection.end();
        });
    } catch (err) {
        console.log('Error connecting to Db 83');
        return;
    }
});


module.exports = router;