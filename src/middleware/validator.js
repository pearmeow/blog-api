import { body, param } from "express-validator";

export const idParamFactory = (fieldName) => {
    return param(fieldName)
        .isInt({ min: 1 })
        .withMessage("Id must be an integer");
};

export const textBodyFactory = (fieldName, actualName, min, max) => {
    return body(fieldName)
        .isString({ min, max })
        .withMessage(
            `${actualName} must have between ${min} and ${max} characters`,
        );
};

export const date = body("date").isDate().withMessage("Date must be a date");

export const published = body("published")
    .isBoolean({ strict: true })
    .withMessage("Published must be true or false");

export username = body("username").custom()

export const validateResults = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors.array());
    }
};
