// Dependencies ////////////////////////////////////////////////////////////
let express = require("express");
let path = require("path");
let fs = require("fs");

// Sets up the Express App and middlewear /////////////////////////////////

let app = express();
let PORT = process.env.PORT || 3000 ;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes //////////////////////////////////////////////////////////////////

// notes page
app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "public/notes.html"));
  });

  // api for grabbing info
app.get("/api/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "db/db.json"));
});


// adding notes
app.post("/api/notes", function(req, res) {
  let newNote = JSON.stringify(req.body);  
  let dbLocation = path.join(__dirname, "db/db.json");
  //console.log(dbLocation);
  fs.readFile(dbLocation, 'utf8', function(err,data){
    if(err) throw err;
    console.log(data);
  });


  fs.appendFile(dbLocation, newNote, function(err){
    if(err) throw err;
    });
  res.sendFile(path.join(__dirname, "db/db.json"));
 });



 // catchall & main page
 app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

// // Displays all characters
// app.get("/api/waitlist", function(req, res) {
//   return res.json(waitlist);
// });

// // Displays a single character, or returns false
// app.get("/api/waitlist/:customer", function(req, res) {
//   let chosen = req.params.character;

//   console.log(chosen);

//   for (let i = 0; i < waitlist.length; i++) {
//     if (chosen === waitlist[i].routeName) {
//       return res.json(waitlist[i]);
//     }
//   }

//   return res.json(false);
// });

// // Create New Characters - takes in JSON input
// app.post("/api/waitlist", function(req, res) {
//   // req.body hosts is equal to the JSON post sent from the user
//   // This works because of our body parsing middleware
//   let newCustomer = req.body;

//   // Using a RegEx Pattern to remove spaces from newCharacter
//   // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
//   newCustomer.routeName = newCustomer.name.replace(/\s+/g, "").toLowerCase();

//   console.log(newCustomer);

//   characters.push(newCustomer);

//   res.json(newCustomer);
// });

// Server start and console message //////////////////////////////
 
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});