// Define a route handler for rendering the 'index' view template
exports.render = function (req, res) {
    res.render('index', {
        title: 'Hello World' // Provide data to the view template, setting the 'title' to 'Hello World'
    })
};
