const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");
const mongoose = require("mongoose");
const CollectionModel = require("./mongodb");

const templatePath = path.join(__dirname, "../templates");

app.use(express.json());
app.set("view engine", "hbs");
app.set("views", templatePath);
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.render("login");
});

app.get("/signup", (req, res) => {
  res.render("signup");
});

app.post("/signup", async (req, res) => {
  const data = {
    name: req.body.name,
    password: req.body.password,
  };

  try {
    await CollectionModel.create(data); // Use create instead of insertMany
    res.render("home");
  } catch (error) {
    console.error("Error while creating user:", error);
    res.render("error"); // You should handle errors gracefully
  }
});

app.post("/login", async (req, res) => {
  try {
    const user = await CollectionModel.findOne({ name: req.body.name });
    if (user && user.password === req.body.password) {
      // Check if user exists and the password matches
      res.render("home");
    } else {
      res.render("login", { error: "Invalid username or password" });
    }
  } catch (error) {
    console.error("Error while logging in:", error);
    res.render("error"); // Handle errors gracefully
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
