import db from "../models";

const get = async (req, res) => {
    res.send(await db.readPost());
};
const getId = async (req, res) => {};
const post = async (req, res) => {};
const postId = async (req, res) => {};
const put = async (req, res) => {};
const putId = async (req, res) => {};
const del = async (req, res) => {};
const delId = async (req, res) => {};

export default {
    get,
    getId,
    post,
    postId,
    put,
    putId,
    del,
    delId,
};
