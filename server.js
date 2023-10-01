//Set the Node.js environment variable to 'development' if it's not already defined
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var express = require('express');
var morgan = require('morgan'); // Middleware for logging HTTP requests
var compress = require('compression'); // Middleware for response compression
var bodyParser = require('body-parser'); // Middleware for parsing request bodies
var methodOverride = require('method-override'); // Middleware for HTTP method override
const path = require('path');

var app = express(); // Create an Express application instance

// Check the environment and apply middleware accordingly
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev')); // Log HTTP requests in 'development' environment

} else if (process.env.NODE_ENV === 'production') {
    app.use(compress()); // Enable response compression in 'production' environment
}

// Configure middleware for parsing request bodies
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.use(methodOverride()); // Enable method override for handling HTTP methods

//app.set('views', './app/views'); // Set the directory for views/templates
app.set('views', path.join(__dirname, './app/views'));
app.set('view engine', 'ejs'); // Set the view engine to EJS

// Define routes using the 'index.server.routes.js' file
app.use('/', require('./app/routes/index.server.routes.js'));

// Serve static files from the 'public'directories
app.use(express.static('./public'));

// Handle a POST request to '/submitForm' and redirect to the root path ('/')
app.post('/submitForm', (req, res) => {
    const formData = req.body;
    res.redirect('/');
});

// Start the Express application on port 3000
app.listen(3000);

// Export the Express application to be used in other parts of the application
module.exports = app;

// Log a message to the console indicating that the server is running
console.log('Server is running at http://localhost:3000/');

