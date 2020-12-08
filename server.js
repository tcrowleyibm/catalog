const { response } = require('express');
const express = require('express')
const { Client } = require('pg')
const app = express()
const port = 3001

let client = null;
const initClient = async () => {
    console.log(`Database: ${process.env.DB_NAME} User: ${process.env.DB_USER} Host: ${process.env.DB_HOST} Port: ${process.env.DB_PORT}`)
    client = new Client({
        database: process.env.DB_NAME,
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        password: process.env.DB_PW,
        port: process.env.DB_PORT,
        ssl: {
            rejectUnauthorized: false // This is for simplicity in the demo; don't do this in a "real" app!
        }
    });
    await client.connect();
}

app.get('/dbtime', async (req, res) => {
    if (client == null) {
        try {
            await initClient()
        } catch (excc) {
            const msg = `Error connecting to the database. Please be sure all environment variables have been defined. Error = ${excc.message}`;
            console.log(msg);
            res.status(400).send({ message: msg });
            return;
        }
    }

    let msg = "No message"
    try {
        const response = await client.query('SELECT NOW()')
        msg = response.rows[0].now;
    } catch (exc) {
        msg = `Error retrieving message: ${exc.message}`
    }
    res.status(200).send({ message: msg })
});

app.get('/charters', async (req, res) => {
    if (client == null) {
        try {
            await initClient()
        } catch (excc) {
            const msg = `Error connecting to the database. Please be sure all environment variables have been defined. Error = ${excc.message}`;
            console.log(msg);
            res.status(400).send({ message: msg });
            return;
        }
    }

    const query = "select charter_id, charter_name, charter_descr from charters order by charter_name";
    try {
        const response = await client.query(query);
        res.status(200).send({ charters: response.rows })
    } catch (exc) {
        const msg = `Error retrieving charters: ${exc.message}`;
        res.status(400).send({ message: msg })
    }
});

app.listen(port, () => {
    console.log(`Listening on port ${port}.`)
});