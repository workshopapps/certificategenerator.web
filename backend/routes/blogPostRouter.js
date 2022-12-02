const express = require('express');

const { updateBlogPost, deleteBlogPostById, addBlogPost, getAllBlogPosts, getOneBlogPost } = require('../controllers/blogPostController')
const blogPostRouter = express.Router();

blogPostRouter.post('/', addBlogPost)
blogPostRouter.get('/', getAllBlogPosts)
blogPostRouter.get('/:id', getOneBlogPost)
blogPostRouter.put('/:id', updateBlogPost)
blogPostRouter.delete('/:id', deleteBlogPostById)

module.exports = blogPostRouter



