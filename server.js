// Dependencies ////////////////////////////////////////////////////////////
let express = require("express");
let path = require("path");
let fs = require("fs");

// Sets up the Express App and middlewear /////////////////////////////////

let app = express();
let PORT = process.env.PORT || 3000 ;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

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
  fs.readFile(dbLocation, 'utf8', function(err,data){
    if(err) throw err;
    console.log(data);
  });


  fs.appendFile(dbLocation, newNote, function(err){
    if(err) throw err;
    });
  res.sendFile(path.join(__dirname, "db/db.json"));
 });



 // main page
 app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "public/index.html"));
});



// Display a single note
app.get("/api/notes/:id", function(req, res) {
  let noteIndex = req.params.id;
  console.log(noteIndex)
});



// Server start and console message //////////////////////////////
 
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});