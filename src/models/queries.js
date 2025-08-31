const client = require("./client");

const createPost = async (authorId, title, text, date, published) => {
    return await client.post.create({
        data: {
            authorId,
            title,
            text,
            date,
            published,
        },
    });
};

const readPost = async (id) => {
    return await client.post.findUnique({
        where: {
            id,
        },
        include: {
            comments: true,
            author: true,
        },
    });
};

const updatePost = async (id, title, text, date, published) => {
    return await client.post.update({
        where: {
            id,
        },
        data: {
            title,
            text,
            date,
            published,
        },
    });
};

const deletePost = async (id) => {
    return await client.post.delete({
        where: {
            id,
        },
    });
};

const createComment = async () => {};
const readComment = async () => {};
const updateComment = async () => {};
const deleteComment = async () => {};

const createUser = async (username, password) => {
    return await client.user.create({
        data: {
            username,
            password,
        },
    });
};

const readUser = async (id) => {
    return await client.user.findUnique({
        where: {
            id,
        },
        include: {
            posts: true,
            comments: true,
        },
    });
};

const updateUser = async (id, password, isAuthor, isAdmin) => {
    return await client.user.update({
        where: {
            id,
        },
        data: {
            password,
            isAuthor,
            isAdmin,
        },
    });
};

const deleteUser = async (id) => {
    return await client.user.delete({
        where: {
            id,
        },
    });
};

module.exports = {
    createPost,
    readPost,
    updatePost,
    deletePost,

    createComment,
    readComment,
    updateComment,
    deleteComment,

    createUser,
    readUser,
    updateUser,
    deleteUser,
};
