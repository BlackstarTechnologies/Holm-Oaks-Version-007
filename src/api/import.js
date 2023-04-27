const express = require("express");
const router = express.Router();

router.get("/helloworld", (req, res) =>
  res.send({ success: "true", message: "hello world" })
);

module.exports = router;
