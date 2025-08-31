import db from "../models/index.js";
import * as validator from "../middleware/validator.js";

export const get = async (req, res) => {
    res.json(await db.readPost());
};

export const getId = [
    validator.idParamFactory("postId"),
    validator.validateResults,
    async (req, res) => {
        res.json(await db.readPost(Number(req.params.postId)));
    },
];

// TODO: validate author/admin status
export const post = [
    validator.textBodyFactory("title", "Title", 1, 50),
    validator.textBodyFactory("text", "Post", 1),
    validator.date,
    validator.published,
    validator.validateResults,
    async (req, res) => {
        // TODO: get userId from user and authorize (check author status)
        let userId = 1;
        const { title, text, date, published } = req.body;
        res.json(
            await db.createPost(Number(userId), title, text, date, published),
        );
    },
];

// TODO: validate user author status
export const putId = [
    validator.idParamFactory("postId"),
    validator.textBodyFactory("title", "Title", 1, 50),
    validator.textBodyFactory("text", "Post", 1),
    validator.date,
    validator.published,
    validator.validateResults,
    async (req, res) => {
        // TODO: check author status with userId and check post author to
        // see if they match up
        // authors can only edit their own posts
        const { postId } = req.params;
        const { title, text, date, published } = req.body;
        res.json(
            await db.updatePost(Number(postId), title, text, date, published),
        );
    },
];

// TODO: validate user author/admin status
export const delId = [
    validator.idParamFactory("postId"),
    validator.validateResults,
    async (req, res) => {
        // TODO: validate userId with post's author
        // or if user is an admin
        const { postId } = req.params;
        res.json(await db.deletePost(Number(postId)));
    },
];
