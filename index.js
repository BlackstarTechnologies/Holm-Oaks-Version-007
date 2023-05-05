require("./src/process.handlers");
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const { Log } = require("./src/process.handlers");
const { blogList } = require("./src/api/blogs_list");
const app = express();

const port = process.env.PORT;

app.use(cors());
app.use(require("./src"));

app.use("/", express.static("views"));
blogList;
app.use("/static", express.static("views/Blog/static"));
app.get("/Blog/:id", (req, res) => {
  res.type("html");
  res.send(fs.readFileSync("./views/Blog/index.html"));
});
app.get("/", (req, res) => res.redirect("/Home/"));

// app.use("*",(req,res,callNext)=>res.redirect("/404/"))
app.listen(port, () => Log(`listening on ${port}`));
