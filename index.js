// Setup express and ejs
const express = require('express');
const path = require('path');

// Create the express application object
const app = express();
const port = 8000;

// Tell Express that we want to use EJS as the templating engine
app.set('view engine', 'ejs');

// Set up the body parser
app.use(express.urlencoded({ extended: true }));

// Serve static files from public directory
app.use(express.static(path.join(__dirname, 'public')));

// Load the route handlers
const mainRoutes = require("./routes/main");
app.use('/', mainRoutes);

// Start the web app listening
app.listen(port, () => {
    console.log(`Thirsty Student Shop app listening on port ${port}!`);
    console.log(`Visit: http://localhost:${port}`);
});