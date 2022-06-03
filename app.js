const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

const app = express();

var items = [];
var workItems = [];

app.use(express.static("public"));

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  let day = date.getDate();

  res.render("list", { todaysDate: day, addNewItem: items });
});

app.post("/", function (req, res) {
  var item = req.body.addTodo;

  console.log(req.body.list);
  if (req.body.list === "Work") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }
});

app.get("/work", function (req, res) {
  res.render("list", { todaysDate: "Work List", addNewItem: workItems });
});

app.get("/about", function (req, res) {
  res.render("about");
});

app.listen(3000, function () {
  console.log("Server is running on port 3000.");
});
