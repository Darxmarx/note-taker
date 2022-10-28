// express needed to function
const express = require('express');

// import modular router for /notes
const notesRouter = require('./notes');

// initialize express, import notes route
const app = express();

app.use('/notes', notesRouter);

// export code read here to the app
module.exports = app;
