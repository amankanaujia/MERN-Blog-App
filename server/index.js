const express = require("express");
const cors = require("cors");
require("./db/index.js");
const blogRouter = require("./route/blog-route.js");

const app = express();
app.use(
  cors({
    origin: [`https://mern-blog-app-ten.vercel.app/`],
    methods: ["POST", "GET"],
    credentials: true,
  })
);
app.use(express.json());

app.use("/api/blogs", blogRouter);
app.use("/", (req, res) => {
  res.send("hello");
});

app.listen("5000", () => {
  console.log("app is running");
});

module.exports = app;
