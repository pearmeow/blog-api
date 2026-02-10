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

export const readPostProtected = async () => {
    return await client.post.findMany({
        include: {
            comments: true,
            author: {
                omit: {
                    password: true,
                },
            },
        },
        where: {
            published: true,
        },
        orderBy: {
            date: "desc",
        },
    });
};

export const readPost = async () => {
    return await client.post.findMany({
        include: {
            comments: true,
            author: {
                omit: {
                    password: true,
                },
            },
        },
        orderBy: {
            date: "desc",
        },
    });
};

export const readPostById = async (id) => {
    return await client.post.findUnique({
        where: {
            id,
        },
        include: {
            comments: {
                select: {
                    id: true,
                    text: true,
                    author: {
                        select: {
                            username: true,
                            id: true,
                        },
                    },
                },
            },
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
            date: published ? new Date() : undefined,
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
            author: {
                omit: {
                    password: true,
                },
            },
        },
    });
};

export const readCommentById = async (id) => {
    return await client.comment.findUnique({
        where: {
            id,
        },
        include: {
            author: {
                omit: {
                    password: true,
                },
            },
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
        omit: {
            password: true,
        },
    });
};

export const readAuthor = async () => {
    return await client.author.findMany();
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
        omit: {
            password: true,
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
        omit: {
            password: true,
        },
    });
};

export const deleteAuthor = async (id) => {
    return await client.author.delete({
        where: {
            id,
        },
        omit: {
            password: true,
        },
    });
};

export const createUser = async (username, password) => {
    return await client.user.create({
        data: {
            username,
            password,
        },
        omit: {
            password: true,
        },
    });
};

export const readUserFromUsername = async (username) => {
    return await client.user.findUnique({
        where: {
            username,
        },
        omit: {
            password: true,
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
        omit: {
            password: true,
        },
    });
};

export const readUserById = async (id) => {
    return await client.user.findUnique({
        where: {
            id,
        },
        omit: {
            password: true,
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
        omit: {
            password: true,
        },
    });
};

export const deleteUser = async (id) => {
    return await client.user.delete({
        where: {
            id,
        },
        omit: {
            password: true,
        },
    });
};
