const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth')

const Post = require('../models/Post')


// @router GET api/posts
// @desc Get posts
// @access Private
router.get('/', verifyToken, async (req, res) => {
    try {
        const posts = await Post.find({ user: req.userId }).populate('user', ['username'])
        //populate : lấy dữ liệu của thằng thằng user đăng xét
        return res.status(200).json({ success: true, posts })

    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Internal Server Error' })
    }
})


// @router POST api/posts
// @desc Get posts
// @access Private

router.post('/', verifyToken, async (req, res) => {
    const { title, description, url, status } = req.body

    // Simple Vaidate
    if (!title) {
        return res.status(400).json({ success: false, message: 'Title is require' })
    }

    try {
        const newPost = new Post({
            title,
            description,
            url: (url.startsWith('http://')) ? url : `https://${url}`,
            status: status || 'TO LREAN',
            user: req.userId
        })

        await newPost.save()

        return res.status(200).json({ success: true, message: 'Happy learning', post: newPost })

    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Internal Server Error' })
    }

})

// @router PUT api/posts
// @desc Update posts
// @access Private

router.put('/:id', verifyToken, async (req, res) => {
    const { title, description, url, status } = req.body

    // Simple Vaidate
    if (!title) {
        return res.status(400).json({ success: false, message: 'Title is require' })
    }

    try {
        let updatePost = {
            title,
            description: description || '',
            url: (url.startsWith('http://')) ? url : `https://${url}`,
            status: status || 'TO LREAN'
        }

        const postUpdateCondition = { _id: req.params.id, user: req.userId }

        updatePost = await Post.findOneAndUpdate(postUpdateCondition, updatePost, { new: true })


        //User not authorised to update post or post not found
        if (!updatePost) {
            return res.status(401).json({ success: false, message: 'Post not found or user not authorised' })

        }

        return res.status(200).json({ success: true, message: 'Excellent progress', post: updatePost })

    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Internal Server Error' })
    }
})


// @router DELETE api/posts
// @desc Delete posts
// @access Private

router.delete('/:id', verifyToken, async (req, res) => {
    try {
        const postDeleteCondition = { _id: req.params.id, user: req.userId };

        const deletePost = await Post.findOneAndDelete(postDeleteCondition)

        //User not authorised to update post or post not found
        if (!deletePost) {
            return res.status(401).json({ success: false, message: 'Post not found or user not authorised' })

        }

        return res.status(200).json({ success: true, message: 'Excellent progress', post: deletePost })

    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Internal Server Error' })
    }
})

module.exports = router
