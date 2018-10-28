"use strict";
/**
 * Module Dependencies
 */
const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

let userSchema = new Schema({
  codeId: {
    type: String,
    default: "0",
    index: true,
    unique: true
  },
  title: {
    type: String,
    default: ""
  },
  code: {
    type: String,
    default: ""
  },
  author: {
    type: String,
    default: "Anurag"
  },
  createdOn: {
    type: Date,
    default: ""
  },
  lastModified: {
    type: Date,
    default: ""
  }
});

mongoose.model("User", userSchema);
