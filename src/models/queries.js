import client from "./client.js";

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
    return await client.post.findMany({
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

const createComment = async (postId, authorId, text) => {
    return await client.comment.create({
        data: {
            postId,
            authorId,
            text,
        },
    });
};

const readComment = async (id) => {
    return await client.comment.findMany({
        where: {
            id,
        },
        include: {
            author: true,
        },
    });
};

const updateComment = async (id, text, date) => {
    return await client.comment.update({
        where: {
            id,
        },
        data: {
            text,
            date,
            edited: true,
        },
    });
};

const deleteComment = async (id) => {
    return await client.comment.delete({
        where: {
            id,
        },
    });
};

const createUser = async (username, password) => {
    return await client.user.create({
        data: {
            username,
            password,
        },
    });
};

const readUser = async (id) => {
    return await client.user.findMany({
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

export default {
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
