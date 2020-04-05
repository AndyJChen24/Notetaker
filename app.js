// Dependencies
const express = require("express");
const app = express();
var path = require("path");
const uuid = require("uuid")
const fs = require("fs");
const db = path.join(__dirname,"db/db.json");
const PORT = process.env.PORT ||3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'))

//routes for index and notes
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "public/notes.html"));
});


// get notes 
app.get("/api/notes", (req,res)=>{
    // read json file and parse it
    fs.readFile(db,(err,data)=>{
        if(err) throw err;
        const notes = JSON.parse(data)
        //send it back as response
        res.json(notes)
    })
})


// post notes
app.post("/api/notes", (req,res)=>{
    //create random id
    req.body.id = uuid.v4();
    //get new notes from post request
    var newNote= req.body
    // read json file
    fs.readFile(db,(err,data)=>{
        if(err) throw err;
        //parse data 
        const notes = JSON.parse(data);
        // push new notes into the parsed data   
        notes.push(newNote);
        //change it back to json form   
        const writeNotes = JSON.stringify(notes);
        //write it to db file
        fs.writeFile(db,writeNotes, err=>{
            if(err) throw err; 
        })
    })
    //send end response
    res.end("done")
})

// delete notes
app.delete("/api/notes/:id",(req,res)=>{
    // get notes from request parameters from click
    let noteIdFromClick = req.params.id;
    // read db file
    fs.readFile(db,function(err,data){
        if(err) throw err;
        //parse file
        const note = JSON.parse(data);
        //filter it so that if notes id from file don't match the id from click add that to new deleteNotes var
        const deleteNotes = note.filter(note => note.id !== noteIdFromClick)   
        // change back to json
        const newNotes = JSON.stringify(deleteNotes);
        // write notes back to db
        fs.writeFile(db,newNotes, err=>{
            if(err) throw err;
            
        })  
    })
    // send end response
    res.end("done")
})


// start listening in on server
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});