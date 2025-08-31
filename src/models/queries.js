const client = require("./client");

const createPost = async (title, text, authorId, published = false) => {
    return await client.post.create({
        data: {
            title,
            text,
            authorId,
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

const updatePost = async (id, title, text, published) => {
    return await client.post.update({
        where: {
            id,
        },
        data: {
            title,
            text,
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

const createUser = async () => {};
const readUser = async () => {};
const updateUser = async () => {};
const deleteUser = async () => {};

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
