const express = require("express");
const fetchuser = require("../middleware/fetchuser");
const router = express.Router();
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");

//ROUTE 1: fetch all notes using: GET "/api/auth/fetchNotes". login required
router.get("/fetchNotes", fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    // handle the error
    console.error(error);
    res.status(500).send("Server error");
  }
});
//ROUTE 2: adding notes using: POST "/api/auth/addnotes". login required
router.post(
  "/addnotes",
  fetchuser,
  [
    body("title", "Enter title").isLength({ min: 3 }),
    body("description", "Please description for notes").isLength({ min: 5 }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const notes = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savenote = await notes.save();
      res.json(savenote);
    } catch (error) {
      // handle the error
      console.error(error);
      res.status(500).send("Server error");
    }
  }
);
//ROUTE 3: adding updating notes using: PUT "/api/auth/updatenotes". login required
router.put("/updatenotes/:id", fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;
  try {
    const newNotes = {};

    if (title) {
      newNotes.title = title;
    }
    if (description) {
      newNotes.description = description;
    }
    if (tag) {
      newNotes.tag = tag;
    }
    //find the notes and update using findbyid and update
    let notes = await Notes.findById(req.params.id);
    if (!notes) {
      return res.status(404).send("Not Found");
    }
    if (notes.user.toString() !== req.user.id) {
      return res.status(401).send("not allowed");
    }
    notes = await Notes.findByIdAndUpdate(
      req.params.id,
      { $set: newNotes },
      { new: true }
    );
    res.json({ notes });
  } catch (error) {
    // handle the error
    console.error(error);
    res.status(500).send("Server error");
  }
});
//ROUTE 4: deleting updating notes using: DELETE "/api/auth/deletenotes". login required
router.delete("/deletenotes/:id", fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;
  try {
    //find the notes and update using findbyid and delete it
    let notes = await Notes.findById(req.params.id);
    if (!notes) {
      return res.status(404).send("Not Found");
    }
    // verify the user who ownes the file to be deleted
    if (notes.user.toString() !== req.user.id) {
      return res.status(401).send("not allowed");
    }
    notes = await Notes.findByIdAndDelete(req.params.id);
    res.json({ Success: "Note has been deleted", notes: notes });
  } catch (error) {
    // handle the error
    console.error(error);
    res.status(500).send("Server error");
  }
});

module.exports = router;
