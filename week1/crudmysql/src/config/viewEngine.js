// configViewEngine.js
import express from "express";

const configViewEngine = (app) => {
  app.use(express.static("./src/public")); // thiết lập thư mục public (ảnh, css,...)
  app.set("view engine", "ejs");           // thiết lập view engine
  app.set("views", "./src/views");         // thư mục chứa views
};

export default configViewEngine;
