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
            console.log("Successfully retrieved saved note.");
        }
    })
});

// POST route to take user's inputted note
notes.post('/', (req, res) => {
    // properties taken from the db.json that form the body of user's input
    const { title, text } = req.body;

    // if note has both a title and text associated
    if (title && text) {
        // stores the new note's title, text, and unique id that will be used for deletion later
        const newNote = {
            title,
            text,
            id: uuidv4(), // function installed from uuid that randomly generates a string
        };


        // function that modifies the db.json file
        fs.readFile('./db/db.json', 'utf8', (err, data) => {
            if (err) { // checks to see if response returns an error first
                console.log(err); // logs the error
            } else {
                // takes data read from db.json, parses it, and appends the new note as a brand new object
                const parsedDB = JSON.parse(data);
                parsedDB.push(newNote);

                //writes the modified data to the db.json file
                fs.writeFile(
                    './db/db.json', // writes to the file
                    JSON.stringify(parsedDB, null, 2), // stringifies the parsed object back into JSON, null allows all properties of the object to be included in the string, and 2 represents the amount of spaces included for legibility in the new code
                    (err, data) => {
                        if (err) { // checks error first
                            console.log(err);
                        } else {
                            res.json(data);
                            console.log('Successfully added new tip.');
                        }
                    });

            }
        });
    }
});

// export this file's code for usage in the app
module.exports = notes;