const fs = require('fs') // node.js built-in function to manage files
const notes = require('express').Router(); // uses express modulation
const { v4: uuidv4 } = require('uuid'); // creates crypotgraphically strong random values

notes.get('/', (req, res) => {
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) { // checks to see if response returns an error first
            console.log(err); // logs the error
        } else {
            res.json(JSON.parse(data)) // parses out data retrieved from db.json
        }
    })
});