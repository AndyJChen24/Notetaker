var db = require("../../../db/db")
const fs = require("fs");

module.exports = function(app){
    app.get("/api/notes", function(req,res){
        res.json(db);
    })
    app.post("/api/notes", function(req,res){
        req.body.id = db.length;
        db.push(req.body);
        console.log(db)
        res.end("done")
    })
    app.delete("/api/notes/:id", function(req,res){
        let noteId = req.params.id;
        console.log(noteId)
        res.end("done")
        return noteId
    })
}