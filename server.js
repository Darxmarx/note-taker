// required const needed for server.js to run
const express = require('express');
const { appendFile } = require('fs');
const path = require('path');
const api = require('./routes/index.js');

// listens to port 3001 if the heroku port is not being used
const PORT = process.env.PORT || 3001; 

// initialize express usage
const app = express();

// middleware both parses json and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);

// express.static is built-in middleware that serves static files from a specific folder
app.use(express.static('public'));

// GET route for notes page
app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, 'public/notes.html'))
);

// GET route for landing page
app.get('*', (req, res) => 
    res.sendFile(path.join(__dirname, 'public/index.html'))
);

// confirms app is listening at specific port
app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`)
);
