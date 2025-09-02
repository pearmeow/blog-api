import db from "../models/index.js";
import * as validator from "../middleware/validator.js";
import passport from "passport";

// gets comments in a post, not all comments
export const get = [
    validator.idParamFactory("postId"),
    async (req, res) => {
        const { postId } = req.params;
        res.json(await db.readComment(undefined, Number(postId)));
    },
];

// gets specific comment from a post
export const getId = [
    validator.idParamFactory("postId"),
    validator.idParamFactory("commentId"),
    validator.validateResults,
    async (req, res) => {
        const { commentId, postId } = req.params;
        const comment = await db.readComment(Number(commentId), Number(postId));
        if (comment.length === 0) {
            return res.status(404).end();
        }
        res.json(comment[0]);
    },
];

export const post = [
    passport.authenticate("jwt", { session: false }),
    validator.idParamFactory("postId"),
    validator.textBodyFactory("text", "Comment", 1, 500),
    validator.validateResults,
    async (req, res) => {
        const { id: authorId } = req.user;
        const { postId } = req.params;
        const post = await db.readPostById(Number(postId));
        if (!post) {
            return res.status(404).end();
        }
        const { text } = req.body;
        res.json(
            await db.createComment(Number(postId), Number(authorId), text),
        );
    },
];

export const putId = [
    passport.authenticate("jwt", { session: false }),
    validator.idParamFactory("postId"),
    validator.idParamFactory("commentId"),
    validator.textBodyFactory("text", "Comment", 1, 500),
    validator.validateResults,
    async (req, res) => {
        const { id: authorId } = req.user;
        const { postId, commentId } = req.params;
        const comment = await db.readComment(Number(commentId), Number(postId));
        if (comment.length === 0) {
            return res.status(404).end();
        }
        if (comment[0].authorId !== authorId) {
            return res.status(401).end();
        }
        const { text } = req.body;
        if (text === comment[0].text) {
            return res.json(comment[0]);
        }
        res.json(await db.updateComment(Number(commentId), text));
    },
];

export const delId = [
    passport.authenticate("jwt", { session: false }),
    validator.idParamFactory("commentId"),
    validator.validateResults,
    async (req, res) => {
        const { id: authorId, isAdmin } = req.user;
        const { postId, commentId } = req.params;
        const comment = await db.readComment(Number(commentId), Number(postId));
        if (comment.length === 0) {
            return res.status(404).end();
        }
        if (comment[0].authorId !== authorId && !isAdmin) {
            return res.status(401).end();
        }
        res.json(await db.deleteComment(Number(commentId)));
    },
];
