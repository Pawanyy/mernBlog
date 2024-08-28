import jwt from "jsonwebtoken";

const createToken = (data, expiry) => {
    const token = jwt.sign(data, process.env.JWT_SECRET, { expiresIn: parseInt(expiry, 10) || expiry });
    return token;
}

const createLoginToken = (data) => {
    const accesToken = createToken(data, process.env.JWT_ACCESS_TIMEOUT);
    return { accesToken, tokenType: "Bearer" };
}

export { createLoginToken };