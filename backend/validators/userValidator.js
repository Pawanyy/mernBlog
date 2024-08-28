import Joi from "joi";

const userRegisterSchema = Joi.object({
    username: Joi.string().required().min(3).max(50),
    email: Joi.string().required().email().max(255),
    password: Joi.string().required().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).min(8).max(16),
});

const userLoginSchema = Joi.object({
    username: Joi.string().required().min(3).max(50),
    password: Joi.string().required().min(8).max(16).pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
});


export { userRegisterSchema, userLoginSchema };