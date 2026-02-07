import passport from "passport";
import db from "../models/index.js";
import * as validator from "../middleware/validator.js";

export const get = [
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
        if (req.user.type === "author") {
            return res.json(await db.readPost());
        }
        return res.json(await db.readPostProtected());
    },
];

export const getId = [
    validator.idParamFactory("postId"),
    validator.validateResults,
    async (req, res) => {
        const post = await db.readPostById(Number(req.params.postId));
        if (!post) {
            return res.status(404).end();
        }
        delete post.author.password;
        res.json(post);
    },
];

export const post = [
    passport.authenticate("jwt", { session: false }),
    validator.isAuthor,
    validator.textBodyFactory("title", "Title", 1, 50),
    validator.textBodyFactory("text", "Post", 1),
    validator.boolParamFactory("published"),
    validator.validateResults,
    async (req, res) => {
        const { id: userId } = req.user;
        const { title, text, published } = req.body;
        res.json(await db.createPost(Number(userId), title, text, published));
    },
];

export const putId = [
    passport.authenticate("jwt", { session: false }),
    validator.isAuthor,
    validator.idParamFactory("postId"),
    validator.textBodyFactory("title", "Title", 1, 50),
    validator.textBodyFactory("text", "Post", 1),
    validator.boolParamFactory("published"),
    validator.validateResults,
    async (req, res) => {
        const { id: userId } = req.user;
        const { postId } = req.params;
        const post = await db.readPostById(Number(postId));
        if (!post) {
            return res.status(404).end();
        }
        if (post.authorId !== userId) {
            return res.status(401).end();
        }
        const { title, text, published } = req.body;
        res.json(
            await db.updatePost({
                id: Number(postId),
                title,
                text,
                published,
            }),
        );
    },
];

export const delId = [
    passport.authenticate("jwt", { session: false }),
    validator.isAuthor,
    validator.idParamFactory("postId"),
    validator.validateResults,
    async (req, res) => {
        const { id: userId } = req.user;
        const { postId } = req.params;
        const post = await db.readPostById(Number(postId));
        if (!post) {
            return res.status(404).end();
        }
        if (post.authorId !== userId) {
            return res.status(401).end();
        }
        res.json(await db.deletePost(Number(postId)));
    },
];
