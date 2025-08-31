import db from "../models/index.js";

export const get = async (req, res) => {
    res.json(await db.readPost());
};

export const getId = async (req, res) => {
    res.json(await db.readPost(req.params.id));
};

export const post = async (req, res) => {
    const { authorId, title, text, date, published } = req.body;
    res.json(await db.createPost(authorId, title, text, date, published));
};

export const putId = async (req, res) => {
    const { id, title, text, date, published } = req.body;
    res.json(await db.updatePost(id, title, text, date, published));
};

export const delId = async (req, res) => {
    const { id } = req.body;
    res.json(await db.deletePost(id));
};
