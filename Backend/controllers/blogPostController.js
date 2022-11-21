const blogPostModel = require('../models/blogPostModel')


exports.addBlogPost = async (req, res) => {
    try {
        const { title, article, writtenBy, datePosted, imageUrl } = req.body;
        const blogPost = await blogPostModel.addBlogPost(title, article, writtenBy, datePosted, imageUrl);
        return res.status(200).json({
            success: true,
            blogPost
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error
        })
    }
}

exports.getAllBlogPosts = async (req, res) => {
    try {
        const blogPosts = await blogPostModel.getAllBlogPosts();
        return res.status(200).json(
            blogPosts
        )
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message })
    }
}

exports.getOneBlogPost = async (req, res) => {
    try {
        const blogPost = await blogPostModel.getOneBlogPost(req.params.id);
        return res.status(200).json(
            blogPost
        )
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message
        })
    }
}

exports.deleteBlogPostById = async (req, res) => {
    try {
        await blogPostModel.deleteBlogPostById(req.params.id)
        return res.status(200).json({
            success: true
        })
    } catch (error) {
        return res.status(500).json({
            error: error.message
        })
    }
}

exports.updateBlogPost = async (req, res) => {
    try {
        const { title, description, imageUrl } = req.body;
        const BlogPost = await blogPostModel.updateBlogPost(req.params.id, title, description, imageUrl);
        const updatedBlogPost = await blogPostModel.getBlogPostById(req.params.id)
        return res.status(200).json({
            success: true,
            updatedBlogPost
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message
        })
    }
}