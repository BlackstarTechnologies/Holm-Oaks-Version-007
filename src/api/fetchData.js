const { blogList } = require("./blogs_list");
const router = require("./import");

router.get("/blogs-list", (req, res) => res.send(blogList));

module.exports = router;
