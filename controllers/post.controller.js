const postModel = require('../models/post.model');
const PostModel = require('../models/post.model');
const UserModel = require('../models/user.model');
const { uploadErrors } = require('../utils/errors.utils');
const ObjectID = require('mongoose').Types.ObjectId;
const fs = require('fs');
const { promisify } = require('util');

module.exports.readPost = async (req, res) => {
    try {
        const posts = await PostModel.find().sort({ createdAt: -1 });
        res.send(posts);
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
};

module.exports.createPost = async (req, res) => {

    let fileName;

    if (req.file !== null) {
        try {
            if (!/\.(jpg|jpeg|png)$/i.test(req.file.originalname)) {
                throw Error("invalid file");
            }

            if (req.file.size > 500000) throw Error("max size")
        } catch (err) {
            const errors = uploadErrors(err);
            return res.status(500).send({ errors });
        }

        console.log('req.file', req.file);
        // Get the file object from the request
        const file = req.file;
        fileName = req.body.posterId + Date.now() + '.jpg';

        // Create a write stream to save the file to the file system
        const stream = fs.createWriteStream(`${__dirname}/../client/public/uploads/posts/${fileName}`);
        const imageData = req.file.buffer;

        stream.write(imageData);
    }


    const newPost = new postModel({
        posterId: req.body.posterId,
        message: req.body.message,
        picture: req.file !== null ? "./uploads/posts/" + fileName : "",
        video: req.body.video,
        likers: [],
        comments: [],
    });

    try {
        const post = await newPost.save();
        return res.status(201).json(post);
    } catch (err) {
        return res.status(400).send(err);
    }
};

module.exports.updatePost = async (req, res) => {
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(400).send("ID unknown: " + req.params.id);
    }

    const updatedRecord = {
        message: req.body.message,
    };

    try {
        const updatedPost = await PostModel.findByIdAndUpdate(
            req.params.id,
            { $set: updatedRecord },
            { new: true }
        );
        res.send(updatedPost);
    } catch (err) {
        console.log("Update error: " + err);
        res.status(500).send("Internal server error");
    }
};

module.exports.deletePost = async (req, res) => {
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(400).send("ID unknown: " + req.params.id);
    }

    try {
        const deletedPost = await PostModel.findByIdAndRemove(req.params.id);
        res.send(deletedPost);
    } catch (err) {
        console.log("Delete error: " + err);
        res.status(500).send("Internal server error");
    }
};

module.exports.likePost = async (req, res) => {
    try {
        const postId = req.params.id;
        const userId = req.body.id;

        if (!ObjectID.isValid(postId)) {
            return res.status(400).send("Unknown ID: " + postId);
        }

        const post = await PostModel.findByIdAndUpdate(
            postId,
            {
                $addToSet: { likers: userId },
            },
            { new: true }
        );
        if (!post) {
            return res.status(404).send("Post not found with ID: " + postId);
        }

        const user = await UserModel.findByIdAndUpdate(
            userId,
            {
                $addToSet: { likes: postId },
            },
            { new: true }
        );
        if (!user) {
            return res.status(404).send("User not found with ID: " + userId);
        }

        res.send({ post, user });
    } catch (err) {
        console.error(err);
        return res.status(500).send("Internal server error");
    }
};

module.exports.unlikePost = async (req, res) => {
    try {
        const postId = req.params.id;
        const userId = req.body.id;

        if (!ObjectID.isValid(postId)) {
            return res.status(400).send("Unknown ID: " + postId);
        }

        const post = await PostModel.findByIdAndUpdate(
            postId,
            {
                $pull: { likers: userId },
            },
            { new: true }
        );
        if (!post) {
            return res.status(404).send("Post not found with ID: " + postId);
        }

        const user = await UserModel.findByIdAndUpdate(
            userId,
            {
                $pull: { likes: postId },
            },
            { new: true }
        );
        if (!user) {
            return res.status(404).send("User not found with ID: " + userId);
        }

        res.send({ post, user });
    } catch (err) {
        console.error(err);
        return res.status(500).send("Internal server error");
    }

}

module.exports.commentPost = async (req, res) => {
    try {
        const postId = req.params.id;

        if (!ObjectID.isValid(postId)) {
            return res.status(400).send("Invalid post ID: " + postId);
        }

        const comment = {
            commenterId: req.body.commenterId,
            commenterPseudo: req.body.commenterPseudo,
            text: req.body.text,
            timestamp: new Date().getTime(),
        };

        const post = await PostModel.findByIdAndUpdate(
            postId,
            {
                $push: { comments: comment },
            },
            { new: true }
        );
        if (!post) {
            return res.status(404).send("Post not found with ID: " + postId);
        }

        res.send(post);
    } catch (err) {
        console.error(err);
        return res.status(500).send("Internal server error");
    }
};

module.exports.editCommentPost = async (req, res) => {
    try {
        const postId = req.params.id;
        const commentId = req.body.commentId;
        const newText = req.body.text;

        if (!ObjectID.isValid(postId)) {
            return res.status(400).send("Invalid post ID: " + postId);
        }

        const post = await PostModel.findById(postId);
        if (!post) {
            return res.status(404).send("Post not found with ID: " + postId);
        }

        const comment = post.comments.id(commentId);
        if (!comment) {
            return res.status(404).send("Comment not found with ID: " + commentId);
        }

        comment.text = newText;
        await post.save();

        res.status(200).send(post);
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};

module.exports.deleteCommentPost = async (req, res) => {
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(400).send("ID unknown: " + req.params.id);
    }

    try {
        const docs = await PostModel.findByIdAndUpdate(
            req.params.id,
            {
                $pull: {
                    comments: {
                        _id: req.body.commentId,
                    },
                },
            },
            { new: true }
        ).exec();

        if (!docs) return res.status(404).send('Comment not found');

        return res.send(docs);
    } catch (err) {
        return res.status(400).send(err);
    }
}
