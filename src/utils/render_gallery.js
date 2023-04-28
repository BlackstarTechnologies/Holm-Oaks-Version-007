const fs = require("fs")
const cheerio = require("cheerio")
const BlogPath = "./views/Blog/index.html"
const $ = cheerio.load(fs.readFileSync(BlogPath).toString())

console.log($?"loaded":"not loaded")

$("")