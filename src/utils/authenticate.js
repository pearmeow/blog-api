import bcrypt from "bcryptjs";

export const validPassword = async (givenPass, hashPass) => {
    return await bcrypt.compare(givenPass, hashPass);
};

export const hashPassword = async (pass) => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(pass, salt);
    return hash;
};
