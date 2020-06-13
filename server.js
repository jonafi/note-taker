// Dependencies ////////////////////////////////////////////////////////////

let express = require("express");
let path = require("path");
let fs = require("fs");
let colors = require('colors');

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
  let newNote = req.body;  
  let dbLocation = path.join(__dirname, "db/db.json");
  fs.readFile(dbLocation, 'utf8', function(err,data){
    if(err) throw err;
    let oldData = JSON.parse(data);
    newNote.id = oldData.length;
    oldData.push(newNote);
    let update = JSON.stringify(oldData);

    fs.writeFile(dbLocation, update, function(err){
    if(err) throw err;
    });
  res.sendFile(path.join(__dirname, "db/db.json"));
  res.sendFile(path.join(__dirname, "public/notes.html"));

 });
});


 // main page
 app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "public/index.html"));
});



// Display a single note
app.delete("/api/notes/:id", function(req, res) {
  let noteIndex = req.params.id;
  let dbLocation = path.join(__dirname, "db/db.json");

  //console.log(noteIndex)

  fs.readFile(dbLocation, 'utf8', function(err,data){
    if(err) throw err;
    let oldData = JSON.parse(data);
    for (let i=0; i<oldData.length;i++){
      // console.log(oldData[i].id);
      // console.log(noteIndex);

      if(oldData[i].id==noteIndex){
        oldData.splice(i,1);
        console.log(oldData);
      }
    }
  
    let update = JSON.stringify(oldData);
    fs.writeFile(dbLocation, update, function(err){
      if(err) throw err;
      });

  });


});



// Server start and console message //////////////////////////////
 
app.listen(PORT, function() {
  console.log("App listening on PORT ".cyan + colors.brightGreen.underline(PORT));
});