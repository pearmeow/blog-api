import { body, param, validationResult } from "express-validator";

export const idParamFactory = (fieldName) => {
    return param(fieldName)
        .isInt({ min: 1 })
        .withMessage("Id must be an integer greater than 1");
};

export const textBodyFactory = (fieldName, actualName, min, max) => {
    return body(fieldName)
        .isLength({ min, max })
        .withMessage(
            `${actualName} must have between ${min} and ${max} characters`,
        );
};

export const date = body("date").isDate().withMessage("Date must be a date");

export const boolParamFactory = (fieldName) => {
    return body(fieldName).toBoolean();
};

export const username = body("username")
    .custom((value) => {
        if (/ /.test(value)) {
            throw Error();
        }
        return true;
    })
    .withMessage("Username must not contain spaces")
    .isLength({ min: 1, max: 32 })
    .withMessage("Username must be from 8 to 32 characters long");

export const password = body("password")
    .custom((value) => {
        if (/ /.test(value)) {
            throw Error();
        }
        return true;
    })
    .withMessage("Password must not contain spaces")
    .isLength({ min: 8, max: 32 })
    .withMessage("Password must be from 8 to 32 characters long");

export const confirm = body("confirm")
    .custom((value, { req }) => {
        if (req.body.password !== value) {
            throw Error;
        }
        return true;
    })
    .withMessage("Passwords must match");

export const validateResults = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors.array());
    }
    next();
};

export const isAuthor = (req, res, next) => {
    if (req.user.type !== "author") {
        return res.status(401).end();
    }
    next();
};
