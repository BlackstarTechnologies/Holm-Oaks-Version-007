const express = require("express");
const filesList = require("./utils/fetchFiles");
const { splitUrl } = require("./utils/001");
const fs = require("fs");
const { Log } = require("./process.handlers");
const { getGallery } = require("./utils/render_gallery");
const router = express.Router();

router.use("*", (req, res, callNext) => {
  const { method, ip, originalUrl } = req;

  res.on("finish", () => {
    const { statusCode } = res;
    Log(`${statusCode} ${method} ${originalUrl} ${ip}`);
  });
  callNext();
});

router.get("*", (req, res, callNext) => {
  const { originalUrl } = req;
  const split = splitUrl(originalUrl);
  if (split.ext == "css") console.log(split);
  if (split.ext == "js") console.log(split);
  if (!originalUrl.includes("index")) {
    let valid_files = filesList.valid_asset_Files[split.ext];
    if (valid_files) {
      for (let k of valid_files) {
        if (k.endsWith(split.last)) {
          if (split.ext == "css") console.log(`${split.last} found`);
          if (split.ext == "js") console.log(`${split.last} found`);
          res.setTimeout(1000 * 60 * 60 * 12);

          res.type(split.ext);
          res.send(fs.readFileSync(k));
          return;
        }
      }
    }
  }

  callNext();
});

router.get("/*", (req, res, callNext) => {
  const { originalUrl } = req;
  let a_001 = originalUrl
    .split("/")
    .filter((v) => v.length < 1)
    .map((v) => v.toLowerCase());
  let a_002 = 0;
  for (let url_ of a_001) {
    switch (url_) {
      case "home":
      case "api":
      case "blog":
      case "core-values":
      case "about-us":
      case "images":
      case "404":
      case "gallery":
        a_002++;
        break;
      default:
    }
  }
  if (a_002 > 2) {
    let a_003 = [];
    let i = 0;
    for (let k of a_001) {
      if (i < a_002 - 1) {
        a_003.push("..");
      } else {
        a_003.push(k);
      }
    }
    res.redirect(a_003.join("/"));
  } else {
    callNext();
  }
});

// router.get("/Gallery/", (req,res, callNext)=>{
//   res.setTimeout(1000*60*60)
//   res.type("html")
//     res.send(getGallery())
//     console.log("/Gallery/ called")

//   // callNext()
// })
router.use("/api", require("./api"));

module.exports = router;
