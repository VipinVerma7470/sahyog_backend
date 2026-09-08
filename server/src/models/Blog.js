import mongoose from "mongoose";

const tagSchema = new mongoose.Schema(
{
name: {
type: String,
trim: true,
},
slug: {
type: String,
trim: true,
},
},
{ _id: false }
);

const blogSchema = new mongoose.Schema(
{
title: {
type: String,
required: true,
trim: true,
},


slug: {
  type: String,
  required: true,
  unique: true,
  trim: true,
},

category: {
  type: String,
  required: true,
  trim: true,
},

tags: [tagSchema],

author: {
  type: String,
  required: true,
  trim: true,
},

content: {
  type: String,
  required: true,
},

image: {
  type: String,
  required: true,
},


},
{
timestamps: true,
}
);

const Blog = mongoose.model("Blog", blogSchema);

export default Blog;
