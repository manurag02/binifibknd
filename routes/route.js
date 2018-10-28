const express = require("express");
const codeController = require("./../controllers/codeController");
const appConfig = require("./../config/appConfig");

let setRouter = app => {
  let baseUrl = appConfig.apiVersion + "/codeTemp";

  app.get(baseUrl + "/all", codeController.getAllCodeTemp);

  app.get(baseUrl + "/view/:codeId", codeController.viewSingleTemp);

  app.get(baseUrl + "/view/by/author/:author", codeController.viewByAuthor);

  app.post(baseUrl + "/:codeId/delete", codeController.deleteCodeTemp);

  app.put(baseUrl + "/:codeId/edit", codeController.editCodeTemp);

  app.post(baseUrl + "/create", codeController.createCodeTemp);
}; // end setRouter function

module.exports = {
  setRouter: setRouter
};
