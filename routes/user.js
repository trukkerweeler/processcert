require('dotenv').config();
// sequelize...
const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const bcrypt = require("bcrypt");

// Create a record
router.post('/', async (req, res) => {
    try {
        passwordToString = req.body.password.toString();
        const hashedPassword = await bcrypt.hash(passwordToString, 10)
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
             
        const query = `insert into APPLICATION_USER (
            USER_ID
            , USER_PWD
            ) values (
                '${req.body.username}'
                , '${hashedPassword}'
            )`;

        connection.query(query, (err, rows, fields) => {
            if (err) {
                console.log('Failed to query for USER insert: ' + err);
                res.sendStatus(500);
                return;
            }
            res.json(rows);
        });
        connection.end();
        });

    } catch (err) {
        console.log(err);
    }
}
);

// // verify login credentials
router.get('/login', async (req, res) => {
    const dbuser = '';
    const dbpass = '';
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
        const query = `select * from APPLICATION_USER where USER_ID = '${req.body.username}'`;
        connection.query(query, (err, rows, fields) => {
            if (err) {
                console.log('Failed to query for USER get: ' + err);
                res.sendStatus(500);
                return;
            }
            if (rows.length == 0) {
                res.sendStatus(500).send('User not found');
                return;
            } else {
                dbuser = rows[0].USER_ID;
                dbpass = rows[0].USER_PWD;
            }
        });
        
        console.log(dbuser);
        console.log(dbpass);
        // res.json(rows);
        connection.end();
        });

    } catch (err) {
        console.log(err);
    }
    // window.alert(dbuser);

    // console.log(req.body.username);
    // console.log(req.body.password);
    // console.log(dbuser);
    // console.log(dbpass);

    try {
        if (await bcrypt.compare(req.body.password, dbpass)) {
            res.send('Success');
        } else {
            res.send('Not Allowed');
        }
    } catch (err) {
        console.log(err);
    }
});

module.exports = router;