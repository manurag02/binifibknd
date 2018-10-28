const express = require("express");
const mongoose = require("mongoose");
const shortid = require("shortid");

//Importing the model here
const CodeModel = mongoose.model("User");

let getAllCodeTemp = (req, res) => {
  CodeModel.find()
    .select("-__v -_id")
    .lean()
    .exec((err, result) => {
      if (err) {
        console.log(err);
        res.send(err);
      } else if (result == undefined || result == null || result == "") {
        console.log("No Code Found");
        res.send("No Code Found");
      } else {
        res.send(result);
      }
    });
}; // end get all Code Templates

/**
 * function to read single Code template.
 */
let viewSingleTemp = (req, res) => {
  CodeModel.findOne({ codeId: req.params.codeId }, (err, result) => {
    if (err) {
      console.log(err);
      res.send(err);
    } else if (result == undefined || result == null || result == "") {
      console.log("No code Found");
      res.send("No code Found");
    } else {
      res.send(result);
    }
  });
};

/**
 * function to read codeTemplates by author.
 */
let viewByAuthor = (req, res) => {
  CodeModel.find({ author: req.params.author }, (err, result) => {
    if (err) {
      console.log(err);
      res.send(err);
    } else if (result == undefined || result == null || result == "") {
      console.log("No code Found");
      res.send("No code Found");
    } else {
      res.send(result);
    }
  });
};

/**
 * function to edit code template.
 */
let editCodeTemp = (req, res) => {
  let options = req.body;
  console.log(options);
  CodeModel.update({ codeId: req.params.codeId }, options, {
    multi: true
  }).exec((err, result) => {
    if (err) {
      console.log(err);
      res.send(err);
    } else if (result == undefined || result == null || result == "") {
      console.log("No code Found");
      res.send("No code Found");
    } else {
      res.send(result);
    }
  });
};

/**
 * function to delete the assignment collection.
 */
let deleteCodeTemp = (req, res) => {
  CodeModel.remove({ codeId: req.params.codeId }, (err, result) => {
    if (err) {
      console.log(err);
      res.send(err);
    } else if (result == undefined || result == null || result == "") {
      console.log("No code Found");
      res.send("No code Found");
    } else {
      res.send(result);
    }
  });
};

/**
 * function to create the code Template.
 */
let createCodeTemp = (req, res) => {
  var today = Date.now();
  let codeId = shortid.generate();
  console.log("codeId" + codeId);

  let newCode = new CodeModel({
    codeId: codeId,
    title: req.body.title,
    code: req.body.code,
    author: req.body.fullName,
    created: today,
    lastModified: today
  }); // end new code model

  newCode.save((err, result) => {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      res.send(result);
    }
  }); // end new code save
};

module.exports = {
  getAllCodeTemp: getAllCodeTemp,
  viewSingleTemp: viewSingleTemp,
  viewByAuthor: viewByAuthor,
  editCodeTemp: editCodeTemp,
  deleteCodeTemp: deleteCodeTemp,
  createCodeTemp: createCodeTemp
};
