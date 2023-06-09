const router = require("./import");
const fs = require("fs");
const express = require("express");
const images = require("../../images_list");
const { blogList } = require("./blogs_list");
const bodyParser = require("body-parser");
const { LogPath } = require("../../settings");
const { valid_asset_Files } = require("../utils/fetchFiles");
const { MessageFormLog } = require("../process.handlers");

router.use(bodyParser.json(), bodyParser.urlencoded({ extended: true }));

router.get("/Blogs/blogs-list", (req, res) => res.send(blogList)); // blogList
router.get("/blogs/blogs-list", (req, res) => res.send(blogList)); // blogList
router.get("/images/images-list", (req, res) => {
  res.send({
    images_list: [
      ...valid_asset_Files["jpeg"],
      ...valid_asset_Files["jpg"],
      ...valid_asset_Files["png"],
    ].filter((v) => {
      if (typeof v != "string") return false;
      if (String(v).includes("810_") && String(v).includes("Fotor"))
        return true;

      return false;
    }),
  });
});
router.get("/images/:id", (req, res) => {
  const { id } = req.params;

  res.redirect(images[id]);
});

const LogMessage = (message) => {};

//  http://localhost:8080/api/message
router.post("/messages", (req, res) => {
  const { body, file, files } = req;
  if (body && body.name && body.email && body.message)
    MessageFormLog({
      name: body.name,
      email: body.email,
      type: "message",
      message: body.message,
    });
  res.send({ success: true });
});

//  http://localhost:8080/api/newsletter
router.post("/newsletter", (req, res) => {
  const { body, file, files } = req;

  if (body && body.name && body.email)
    MessageFormLog({ name: body.name, email: body.email, type: "newsletter" });
  res.send({ success: true });
});
module.exports = router;
