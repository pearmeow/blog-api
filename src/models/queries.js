import client from "./client.js";

export const createPost = async (authorId, title, text, date, published) => {
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

export const readPost = async (id) => {
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

export const updatePost = async (id, title, text, date, published) => {
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

export const deletePost = async (id) => {
    return await client.post.delete({
        where: {
            id,
        },
    });
};

export const createComment = async (postId, authorId, text) => {
    return await client.comment.create({
        data: {
            postId,
            authorId,
            text,
        },
    });
};

export const readComment = async (id, postId) => {
    return await client.comment.findMany({
        where: {
            id,
            postId,
        },
        include: {
            author: true,
        },
    });
};

export const updateComment = async (id, text, date) => {
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

export const deleteComment = async (id) => {
    return await client.comment.delete({
        where: {
            id,
        },
    });
};

export const createUser = async (username, password) => {
    return await client.user.create({
        data: {
            username,
            password,
        },
    });
};

export const readUserFromUsername = async (username) => {
    return await client.user.findUnique({
        where: {
            username,
        },
    });
};

export const readUser = async (id) => {
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

export const updateUser = async (id, password, isAuthor, isAdmin) => {
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

export const deleteUser = async (id) => {
    return await client.user.delete({
        where: {
            id,
        },
    });
};
