const mongoose = require("mongoose");

const NotesSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId, //kind of foreign key
    ref: "user",
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  tags: [{  // Changed from "tag" to "tags", and adjusted the structure
    type: String,
    default: "General",
    enum: ['Study', 'Research', 'Meeting', 'Ideas', 'Goals', 'Project', 'General']
  }],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("notes", NotesSchema);
