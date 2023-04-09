const express = require("express")
const app = express();
const exphbs = require("express-handlebars")
const list = require("./restaurant.json")

app.engine("handlebars", exphbs({defaultLayout:"main"}))
app.set("view engine", "handlebars")
app.use(express.static("public"))

app.get("/", (req,res) => {
    
    res.render("index",{lists:list.results})
})

app.get("/restaurants/:id",(req,res)=>{
    const choice = list.results.find(res => res.id.toString() === req.params.id) 
    res.render("show",{choice})
})

app.get("/search/", (req,res)=>{
    const keyword = req.query.keyword
    const lists = list.results.filter(list=>{
        return list.category.includes(keyword) || list.name.includes(keyword)
    })
    console.log(lists.length)
    if (keyword.trim() === "" || lists.length === 0){
        res.render("empty")
    }else{
    
    res.render("index", {lists,keyword})
}
})

app.listen(3000,()=>{
    console.log("listening")
})