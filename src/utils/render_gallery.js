const fs = require("fs")
const cheerio = require("cheerio")
const GalleryPath = "./views/Gallery/index.html"
const $ = cheerio.load(fs.readFileSync(GalleryPath).toString())
const {valid_asset_Files} = require("./fetchFiles");

const images_list = [...valid_asset_Files["jpeg"],...valid_asset_Files["jpg"],...valid_asset_Files["png"]].filter((v)=>{
    if(typeof v != 'string') return false;
    if(String(v).includes("810_")) return true;

    return false
})
console.log(images_list)
const root = $("#root")
console.log($?"Gallery loaded":"Gallery not loaded")

images_list.forEach((v)=>{
    root.append(`<img src="/${v}" class="gallery-image" alt="" />`)
})

console.log(root.text())
module.exports = {
    getGallery :()=> $.html()  
}