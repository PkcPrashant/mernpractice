import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
});

export const Blog = mongoose.model('Blog', BlogSchema);
