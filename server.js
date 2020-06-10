// Dependencies
// =============================================================
let express = require("express");
let path = require("path");


// Sets up the Express App
// =============================================================
let app = express();
let PORT = process.env.PORT || 3000 ;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// NOTES (DATA)
// =============================================================
let notes = [
  // {
  //   routeName: "yoda",
  //   name: "Yoda",
  //   role: "Jedi Master",
  //   age: 900,
  //   forcePoints: 2000
  // }
];

// Routes
// =============================================================

// main page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "public/index.html"));
});
// notes page
app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "public/notes.html"));
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

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});