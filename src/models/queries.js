import client from "./client.js";

export const createPost = async (authorId, title, text, published) => {
    return await client.post.create({
        data: {
            authorId,
            title,
            text,
            date: new Date(),
            published,
        },
    });
};

export const readPost = async () => {
    return await client.post.findMany({
        include: {
            comments: true,
            author: true,
        },
    });
};

export const readPostById = async (id) => {
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

export const updatePost = async ({ id, title, text, published }) => {
    return await client.post.update({
        where: {
            id,
        },
        data: {
            title,
            text,
            date: new Date(),
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

export const readCommentById = async (id) => {
    return await client.comment.findUnique({
        where: {
            id,
        },
        include: {
            author: true,
        },
    });
};

export const updateComment = async (id, text) => {
    return await client.comment.update({
        where: {
            id,
        },
        data: {
            text,
            date: new Date(),
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

export const createAuthor = async (username, password) => {
    return await client.author.create({
        data: {
            username,
            password,
        },
    });
};

export const readAuthorFromUsername = async (username) => {
    return await client.author.findUnique({
        where: {
            username,
        },
    });
};

export const readAuthorFromId = async (id) => {
    return await client.author.findUnique({
        where: {
            id,
        },
        include: {
            posts: true,
        },
    });
};

export const updateAuthor = async (id, password) => {
    return await client.author.update({
        where: {
            id,
        },
        data: {
            password,
        },
    });
};

export const deleteAuthor = async (id) => {
    return await client.author.delete({
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
            comments: true,
        },
    });
};

export const readUserById = async (id) => {
    return await client.user.findUnique({
        where: {
            id,
        },
    });
};

export const updateUser = async (id, password) => {
    return await client.user.update({
        where: {
            id,
        },
        data: {
            password,
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
