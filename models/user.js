const Joi = require("joi");

const UserSchema = Joi.object({
    username: Joi.string().min(1).max(300).required(),
    email: Joi.string().min(1).max(300)
});

function validateUser(user) {
    return UserSchema.validate(user);
}

exports.validateUser = validateUser;