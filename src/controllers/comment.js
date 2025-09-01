import db from "../models/index.js";
import * as validator from "../middleware/validator.js";
import passport from "passport";

// gets comments in a post, not all comments
export const get = [
    validator.idParamFactory("postId"),
    async (req, res) => {
        res.json(await db.readComment(null, Number(req.params.postId)));
    },
];

// gets specific comment from a post
export const getId = [
    validator.idParamFactory("commentId"),
    validator.validateResults,
    async (req, res) => {
        res.json(await db.readComment(Number(req.params.commentId)));
    },
];

// requires being at least a user
export const post = [
    passport.authenticate("jwt", { session: false }),
    validator.idParamFactory("postId"),
    validator.textBodyFactory("text", "Comment", 1, 500),
    validator.validateResults,
    async (req, res) => {
        // TODO: get authorid from req.user if authentication passed
        let authorId = 1;
        const { postId } = req.params;
        const { text } = req.body;
        res.json(
            await db.createComment(Number(postId), Number(authorId), text),
        );
    },
];

// TODO: validate user
// requires being at least a user
// user can only edit their own
export const putId = [
    validator.idParamFactory("commentId"),
    validator.textBodyFactory("text", "Comment", 1, 500),
    validator.date,
    validator.validateResults,
    async (req, res) => {
        // TODO: validate that user is editing their own comment
        const { commentId } = req.params;
        const { text, date } = req.body;
        res.json(await db.updateComment(Number(commentId), text, date));
    },
];

// TODO: validate user
// user can only delete their own messages
// an admin can delete any user's messages
export const delId = [
    validator.idParamFactory("commentId"),
    validator.validateResults,
    async (req, res) => {
        // TODO: validate that user is deleting their own comment
        // or that user is an admin
        const { commentId } = req.params;
        res.json(await db.deleteComment(Number(commentId)));
    },
];
