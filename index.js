const express = require('express');//Set up the express module
const app = express();
const router = express.Router();
const path = require('path')//Include the Path module
var fs = require('fs')


app.use(express.urlencoded())

/**
 * Gerar Rotas Dinamicas
 * @const {array} route Contém o mapeamento das páginas
 */
let route = [
	["/", "/pageOne/index.html"],
	["/pageTwo", "/pageTwo/pageTwo.html"],
	["/pageTree", "/pageTree/pageTree.html"],
	['/pageFour', "/pageFour/pageFour.html"],
	['/pageFive', "/pageFive/pageFive.html"]
    ['/pageSix', "/pageSix/pageSix.html"]
]
//Set up the Express router foreach loop of the array created above
route.forEach(function(Route) {
	router.get(`${Route[0]}`, function(req, res) {
		res.sendFile(path.join(__dirname, `${Route[1]}`));
	});
	app.use(`${Route[0]}`, router);
})
// Just add the desired route and filename to the array, and route will be generated


//defining the public foleder, which contains css, scripts, and images. If you want to add something from it eg. if you want to use style.css, then in the link put href= 'styles/style.css', that's it!
// The same goes for scripts and images! 
app.use(express.static('public'));

//404 Error
app.use(function(req, res, next) {
	res.status(404);
	res.sendFile(__dirname + '/pages/404.html');
});

// getting the contact messages
router.post('/contact', function(req, res) {
	let contactdata = req.body;
	let name = contactdata["name"]
	let stringCD = JSON.stringify(contactdata);
	fs.writeFile(`contactData/${name}-${Math.floor(Math.random() * 1000000)}.json`, stringCD, function(err, result) {
		if (err) { console.log('error', err) };
	})
	res.sendFile(path.join(__dirname, `/pages/contact.html`));

})

//getting search request
router.get('/results', function(req, res) {
	res.send(`
    <!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Results</title>
        <link rel="stylesheet" href="styles/style.css">
    	<link rel="shortcut icon" href="images/favicon.ico">
    </head>
    
    <body>
        <div class="container">
            <h3 class="smooch" id="reshead" style="font-size: 2em; margin-bottom: 30px;margin-left: 20px;">Results for - ${req.query.search}</h3>
            <div class="blogs" id="resultBlog">
                <!-- Go Put the links, description, image and the title in the scripts/BlogLink.js file, read the instruction there to dynamically generate the blog links appear! :) -->
                <!-- DON'T PUT ANY LINKS OR ANY THING HERE, IT WILL BE NOT SHOWN, AS THE CONTENT INSIDE THIS IS BIENG DYNAMILCALLY GENERATED! -->
            </div>
        </div>    
        <script src="scripts/Bloglink.js"></script>
        <script src="scripts/navbar.js"></script>
    </body>
    
    </html>
    `)
})



//set up the Express server to listen on port 3000 and logs some messages when the server is ready
let server = app.listen(4040, function() {
	console.log("App server is running on port 4040");
});