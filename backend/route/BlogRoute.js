import express from 'express'
import mongoose from 'mongoose';
import { Blog } from '../model/Blog.js';
import { body } from 'express-validator';
import { validate } from '../middleware/validate.js';

const router = express.Router();

// Create post
router.post(
    '/',
    [
        body('title').notEmpty(),
        body('description').isLength({ min: 10 }).withMessage('Required mininum length 10'),
        validate
    ],
    async (req, res, next) => {
        try {
            const blog = new Blog({
                title: req.body.title,
                description: req.body.description
            })
            await blog.save();
            res.status(200).json({
                success: true,
                data: blog,
                error: null
            });
        } catch (err) {
            next(err);
        }
    })

// Read all posts
router.get('/', async (req, res) => {
    const blogs = await Blog.find();
    res.status(200).json({
        success: true,
        data: blogs,
        error: null
    });
})

// Search posts
router.get('/search', async (req, res) => {
    const { key = '' } = req.query;
    const regex = { $regex: new RegExp(key, 'i') }
    const filters = {
        $or: [
            { title: regex },
            { description: regex }
        ]
    }
    const blogs = await Blog.find(filters);
    res.status(200).json({
        success: true,
        data: blogs,
        error: null
    });
})

// View one post
router.get('/:id', async (req, res, next) => {
    try {
        const blog = await Blog.findById(req.params.id);
        res.status(200).json({
            success: true,
            data: blog,
            error: null
        });
    } catch (err) {
        next(new Error(`Blog id(${req.params.id}) not found`));
    }
})

// Update one post
router.put('/:id', async (req, res) => {
    const blog = await Blog.findById(req.params.id);
    if (!blog) throw new Error(`Blog id(${req.params.id}) not found`);

    Object.assign(blog, {
        description: req.body.description
    })
    await blog.save();
    res.status(200).json({
        success: true,
        data: blog,
        error: null
    });
})

// Delete one post
router.delete('/:id', async (req, res) => {
    const blog = await Blog.findById(req.params.id);
    if (!blog) throw new Error(`Blog id(${req.params.id}) not found`);

    await blog.deleteOne();
    res.status(200).json({
        success: true,
        data: blog,
        error: null
    });
})

export default router;