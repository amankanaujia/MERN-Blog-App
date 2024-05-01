const express = require("express");
const cors = require("cors");
require("./db/index.js");
const blogRouter = require("./route/blog-route.js");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/blogs", blogRouter);
app.use("/", (req, res) => {
  res.send("heoo");
});

app.listen("5000", () => {
  console.log("app is running");
});
