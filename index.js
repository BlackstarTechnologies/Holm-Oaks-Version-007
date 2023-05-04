require("./src/process.handlers");
const express = require("express");
const cors = require("cors")
const fs = require("fs");
const { Log } = require("./src/process.handlers");
const app = express();

const port = process.env.PORT;

app.use(cors())
app.use(require("./src"));


app.use("/", express.static("views"));

app.get("/Blog*",express.static("views/build"))
// app.use("/", express.static("assets"));
app.get("/", (req, res) => res.redirect("/Home/"));

// app.use("*",(req,res,callNext)=>res.redirect("/404/"))
app.listen(port, () => Log(`listening on ${port}`));
