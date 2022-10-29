const fs = require('fs') // node.js built-in function to manage files
const notes = require('express').Router(); // uses express modulation
const { v4: uuidv4 } = require('uuid'); // creates crypotgraphically strong random values

// GET route to retrieve notes data
notes.get('/', (req, res) => {
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) { // checks to see if response returns an error first
            console.log(err); // logs the error
        } else {
            res.json(JSON.parse(data)) // parses out data retrieved from db.json
        }
    })
});

// POST route to take user's inputted note
notes.post('/', (req, res) => {
    // properties taken from the db.json that form the body of user's input
    const { title, text } = req.body;

    // if note has both a title and text associated
    if(title && text) {
        // stores the new note's title, text, and unique id that will be used for deletion later
        const newNote = {
            title,
            text,
            id: uuidv4(),
        };
    }

    
})