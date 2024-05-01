const mongoose = require("mongoose");
const Blog = require("../models/Blog.js");

const fetchListOfBlogs = async (req, res) => {
  let blogList;
  try {
    blogList = await Blog.find();
  } catch (error) {
    console.log(error);
  }
  if (!blogList) {
    return res.status(404).json({ message: "no blogs found" });
  }
  return res.status(200).json({ blogList });
};

const addNewBlog = async (req, res) => {
  const { title, description } = req.body;
  const currentDate = new Date();

  const newlyCreateBlog = new Blog({
    title,
    description,
    date: currentDate,
  });

  try {
    await newlyCreateBlog.save();
  } catch (error) {
    console.log(error);
  }

  return res.status(200).json({ newlyCreateBlog });
};

const deleteABlog = async (req, res) => {
  const id = req.params.id;

  try {
    const findCurrentBlog = await Blog.findByIdAndDelete(id);
    if (!findCurrentBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    return res.status(200).json({ message: "deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "unable to delete " });
  }
};

const updateABlog = async (req, res) => {
  const id = req.params.id;
  const { title, description } = req.body;
  let currentBlogToUpdate;
  try {
    currentBlogToUpdate = await Blog.findByIdAndUpdate(id, {
      title,
      description,
    });
    if (!currentBlogToUpdate) {
      return res.status(404).json({ message: "Blog not found" });
    }

    return res.status(200).json({ message: "updated successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "unable to update." });
  }
};

module.exports = { fetchListOfBlogs, deleteABlog, updateABlog, addNewBlog };
