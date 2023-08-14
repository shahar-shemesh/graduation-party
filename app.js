require('dotenv').config();                         // using Environment Variables

const express = require("express"); 	        	// popular web framework for Node.js.
const bodyParser = require("body-parser");	        // a middleware used to parse the request body in HTTP requests.
const ejs = require("ejs");				            // ejs module is a templating engine for JavaScript.
const mongoose = require("mongoose");           /* { Mongoose allow to define schemas to specify the structure of data and create
                                                        models based on those schemas. Models allow to interact with the database, perform CRUD
                                                        operations (Create, Read, Update, Delete), and define relationships between different collections
                                                        (known as models in Mongoose). Moongose have features to connect to a MongoDB database,
                                                        define schemas, create models, and perform database operations. } */
//const request = require("request");		        // a simplified HTTP client used for making HTTP requests.
//const _ = require("lodash"); 			            // lowercase to uppercase or the opposite, and provides utility functions for JavaScript.


const app = express();	                            // Creating an instance of the Express application.

app.use(express.static("public"));                  // for public files like css & images etc. Serving static files from the "public" directory.

app.use(bodyParser.urlencoded({ extended: true }));   // allow to get data from the client. Parsing URL-encoded bodies in the HTTP requests.

// ↓↓ ♦♦♦♦ IMPORTANT ♦♦♦♦ : the line "app.set('view engine', 'ejs')" must show AFTER (meaning below) the line: "const app = express()" ↓↓

app.set('view engine', 'ejs');                      /* View engines allow us to render web pages using template files. Setting the view engine to EJS
                                                       (EJS=Embedded JavaScript) for rendering dynamic web pages. */

mongoose.connect('mongodb+srv://shahar:' + process.env.PASS + '@cluster0.valhdpg.mongodb.net/participants', { useNewUrlParser: true }).then(function () {
    console.log("Connected to DB.");
}).catch(function (err) {
    console.log(err);
});

app.get("/", function (req, res) { 		            // Handling GET requests to the root URL ("/").
    res.render("home");		        	            // Rendering the "home" view and sending it as the response.
});



app.listen(3000, function () {
    console.log("Server started on port 3000");
});




/*******************        Write Here: ↓↓        ***************/

const participantSchema = new mongoose.Schema({
    participantName: String,
    participantPhone: String
});

const Participant = new mongoose.model("Participant", participantSchema);


app.post("/", function (req, res) {
    console.log(req.body.participantName + ", " + req.body.participantPhone);

    const newParticipant = new Participant({
        participantName: req.body.participantName,
        participantPhone: req.body.participantPhone
    });
    newParticipant.save();

    res.redirect("https://api.whatsapp.com/send?phone=972533318500&text=%D7%94%D7%99%D7%99%20%D7%A0%D7%A8%D7%A9%D7%9E%D7%AA%D7%99%20%D7%9C%D7%9E%D7%A1%D7%99%D7%91%D7%94%20%3A)");
});