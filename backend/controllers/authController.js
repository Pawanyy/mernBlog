import userModel from "../models/userModel.js";
import { createLoginToken } from "../utils/token.js";
import { userRegisterSchema, userLoginSchema } from "../validators/userValidator.js";
import ApiError from './../utils/ApiError.js';

const register = async (req, res) => {

    const { error } = await userRegisterSchema.validate(req.body);
    if (error) {
        throw new ApiError(400, error.details[0].message);
    }

    const { username, email, password } = req.body;

    const searchUser = await userModel.findOne({
        $or: [
            { username: username.toLowerCase() },
            { email: email.toLowerCase() }
        ]
    });

    if (searchUser) {
        const errorResource = (searchUser.username === username.toLowerCase() ? "username" : "email");
        throw new ApiError(400, `${errorResource} already exists`);
    }

    const newUser = new userModel({ username, email, password });

    await newUser.save();

    const { password: passwordhash, ...restNewUser } = newUser._doc;

    return res.json({ message: "user registered successfully", data: { user: restNewUser } });

}

const login = async (req, res) => {
    const { error } = await userLoginSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    const { username, password } = req.body;

    const user = await userModel.findOne({
        $or: [
            { username: username.toLowerCase() },
            { email: username.toLowerCase() }
        ]
    });

    if (!user || !(await user.isPasswordMatch(password))) {
        throw new ApiError(401, "Invalid username or password");
    }

    const { password: passwordhash, ...restUser } = user._doc;

    const tokenInfo = createLoginToken({ id: user._id, username: user.username })

    return res.json({ message: "User Login Successfully", data: { tokenInfo, user: restUser } })
}

const google = async (req, res) => {
    const { email, displayName: name, photoURL } = req.body;

    const user = await userModel.findOne({ email: email.toLowerCase() });

    if (user) {
        const { password: passwordhash, ...restUser } = user._doc;

        const tokenInfo = createLoginToken({ id: user._id, username: user.username });

        return res.json({ message: "User Login Successfully", data: { tokenInfo, user: restUser } });
    } else {
        const randomPassword = Math.random().toString(36).slice(-8);

        const newUser = await new userModel({
            email: email.toLowerCase(),
            username: name.toLowerCase().split(" ").join("") + Math.random().toString(9).slice(-4),
            password: randomPassword,
            profilePicture: photoURL
        })

        await newUser.save();
        const { password: passwordhash, ...restUser } = newUser._doc;

        const tokenInfo = createLoginToken({ id: newUser._id, username: newUser.username });

        return res.json({ message: "User Login Successfully", data: { tokenInfo, user: restUser } });
    }
}

export { login, register, google };