import db from "../models/index.js";
import { hashPassword } from "../utils/authenticate.js";

export const get = async (req, res) => {
    res.json(await db.readUser());
};

export const getId = async (req, res) => {
    const { id } = req.body;
    res.json(await db.readUser(id));
};

export const post = async (req, res) => {
    const { username, password } = req.body;
    res.json(await db.createUser(username, await hashPassword(password)));
};

export const putId = async (req, res) => {
    const { id, password, isAuthor, isAdmin } = req.body;
    res.json(await db.updateUser(id, password, isAuthor, isAdmin));
};

export const delId = async (req, res) => {
    const { id } = req.body;
    res.json(await db.deleteUser(id));
};
