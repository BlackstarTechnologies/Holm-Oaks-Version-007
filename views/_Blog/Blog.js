console.log("Hello World")

const root = $("#root")
// console.log(root?"root loaded":"root not loaded")

const newDiv = (classList = "")=>document.createElement("div").classList(...classList.split(" "))

fetch("/api/blogs/blogs-list").then(res=>res.json()).then((blogList)=>{
    console.log(blogList)    
    blogList.map((blog_item)=>{
        let item = newDiv("h-2 w-2 bg-blue m-2")
        return item
        
    }).forEach(element => {
        root.append(element)  
    });
})