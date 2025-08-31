import db from "../models/index.js";

export const get = async (req, res) => {
    res.json(await db.readComment());
};

export const getId = async (req, res) => {
    res.json(await db.readComment(req.params.id));
};

export const post = async (req, res) => {
    const { postId, authorId, text } = req.body;
    res.json(await db.createComment(postId, authorId, text));
};

export const putId = async (req, res) => {
    const { id, text, date } = req.body;
    res.json(await db.updateComment(id, text, date));
};

export const delId = async (req, res) => {
    const { id } = req.body;
    res.json(await db.deleteComment(id));
};
