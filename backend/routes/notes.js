const express = require("express");
const Notes = require("../models/notes");
const router = express.Router();
const fetchUser = require("../middleware/fetchUser");
const { body, validationResult } = require("express-validator");

//ROUTE 1; fetch all notes using: GET "api/notes/fetchallnotes"
router.get("/fetchallnotes", fetchUser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error!");
  }
});

//ROUTE 2; add note using: POST "api/notes/addnote"
router.post(
  "/addnote",
  fetchUser,
  [
    body("title", "Enter a valid title!").isLength({ min: 3 }),
    body("description", "Description must be atleast 5 characters!").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      const result = validationResult(req);
      if (!result.isEmpty()) {
        return res.send({ errors: result.array() });
      }
      const { title, description, tag } = req.body;
      const note = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedNote = await note.save();
      res.json(savedNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error!");
    }
  }
);

//ROUTE 3; update existing note using: PUT "api/notes/addnote"
router.put("/updatenote/:id", fetchUser, async (req, res) => {
  //we use put when updating
  try {
    const { title, description, tag } = req.body;
    const newnote = {};
    if (title) {
      newnote.title = title;
    }
    if (description) {
      newnote.description = description;
    }
    if (tag) {
      newnote.tag = tag;
    }

    //find the note and update it
    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).send("not found!");
    }

    if (note.user.toString() !== req.user.id) {
      //if a logged in user try to update another users note so we restrict them.
      return res.status(401).send("Not allowed");
    }

    note = await Notes.findByIdAndUpdate(
      req.params.id,
      { $set: newnote },
      { new: true }
    );
    res.json(note);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error!");
  }
});

//ROUTE 4; delete existing note using: DELETE "api/notes/addnote"
router.delete("/deletenote/:id", fetchUser, async (req, res) => {
  //we use delete when deleting
  try {
    //find the note and delete it
    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).send("not found!");
    }

    //allow deletion only if user is authenticated
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not allowed");
    }

    note = await Notes.findByIdAndDelete(req.params.id);
    res.json({ Success: "note has been deleted." });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error!");
  }
});

module.exports = router;
