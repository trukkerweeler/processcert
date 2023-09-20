require('dotenv').config();
// sequelize...

const express = require('express');
const router = express.Router();
const mysql = require('mysql');


// ==================================================
// Get all records
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

        const query = `select pi.INPUT_ID
        , pi.INPUT_DATE
        , pi.ASSIGNED_TO
        , pi.PROJECT_ID
        , pit.INPUT_TEXT
        , pi.CLOSED
        , pi.CLOSED_DATE 
        from PEOPLE_INPUT pi left join PPL_INPT_TEXT pit on pi.INPUT_ID = pit.INPUT_ID`;
        
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
    

    // res.send('Hello Corrective!');
    } catch (err) {
        console.log('Error connecting to Db');
        return;
    }

});

// Get the next ID for a new expiry record
router.get('/nextId', (req, res) => {
    // res.json('0000005');
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

        const query = 'SELECT CURRENT_ID FROM SYSTEM_IDS where TABLE_NAME = "PEOPLE_INPUT"';
        connection.query(query, (err, rows, fields) => {
            if (err) {
                console.log('Failed to query for attendance: ' + err);
                res.sendStatus(500);
                return;
            }
            const nextId = parseInt(rows[0].CURRENT_ID) + 1;
            let dbNextId = nextId.toString().padStart(7, '0');

            res.json(dbNextId);
        });    

        connection.end();
        });
    } catch (err) {
        console.log('Error connecting to Db 83');
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
             
        const query = `insert into PEOPLE_INPUT (INPUT_ID
            , INPUT_DATE
            , PEOPLE_ID
            , ASSIGNED_TO
            , DUE_DATE
            , INPUT_TYPE
            , SUBJECT
            , PROJECT_ID
            , CLOSED
            , CREATE_DATE
            , CREATE_BY
            ) values (
                '${req.body.INPUT_ID}'
                , '${req.body.INPUT_DATE}'
                , '${req.body.PEOPLE_ID}'
                , '${req.body.ASSIGNED_TO}'
                , '${req.body.DUE_DATE}'
                , '${req.body.INPUT_TYPE}'
                , '${req.body.SUBJECT}'
                , '${req.body.PROJECT_ID}'
                , '${req.body.CLOSED}'
                , '${req.body.CREATE_DATE}'
                , '${req.body.CREATE_BY}'
            )`;
        
        // console.log(query);

        connection.query(query, (err, rows, fields) => {
            if (err) {
                console.log('Failed to query for corrective insert: ' + err);
                res.sendStatus(500);
                return;
            }
            res.json(rows);
        });

        const insertQuery = `insert into PPL_INPT_TEXT values ('${req.body.INPUT_ID}', '${req.body.INPUT_TEXT}')`;
        connection.query(insertQuery, (err, rows, fields) => {
            if (err) {
                console.log('Failed to query for corrective trend insert: ' + err);
                res.sendStatus(500);
                return;
            }
        });

        const updateQuery = `UPDATE SYSTEM_IDS SET CURRENT_ID = '${req.body.INPUT_ID}' WHERE TABLE_NAME = 'PEOPLE_INPUT'`;
        connection.query(updateQuery, (err, rows, fields) => {
            if (err) {
                console.log('Failed to query for corrective id update: ' + err);
                res.sendStatus(500);
                return;
            }
        });

        connection.end();
        });

    } catch (err) {
        console.log('Error connecting to Db (changes 175)');
        return;
    }

});

// ==================================================
// Get a single record
router.get('/:id', (req, res) => {
    console.log(req.params.id);
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

        const query = `select c.CORRECTIVE_ID
        , USER_DEFINED_2
        , USER_DEFINED_1
        , c.REQUEST_BY
        , c.ASSIGNED_TO
        , c.CORRECTIVE_DATE
        , c.REFERENCE
        , ia.CORRECTION_DATE
        , ia.ACTION_BY
        , cc.CREATE_DATE
        , CLOSED
        , c.CLOSED_DATE
        , ct.NC_TREND
        , ia.CORRECTION_TEXT
        , cc.CONTROL_TEXT
        , cc.CAUSE_TEXT
        from CORRECTIVE c
        left join CORRECTIVE_TREND ct on c.CORRECTIVE_ID = ct.CORRECTIVE_ID            
        left join CORRECTION ia on c.CORRECTIVE_ID = ia.CORRECTIVE_ID
        left join CORRECTIVE_CTRL cc on c.CORRECTIVE_ID = cc.CORRECTIVE_ID
        where c.CORRECTIVE_ID = '${req.params.id}'`;

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





module.exports = router;