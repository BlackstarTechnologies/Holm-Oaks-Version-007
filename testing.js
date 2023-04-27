const { store } = require("./src/utils/fetchFiles");

const fs = require("fs")

fs.writeFileSync(".tmp",JSON.stringify(store))