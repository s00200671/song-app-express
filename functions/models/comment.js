const Joi = require("joi");

const CommentSchema = Joi.object({
    commentText: Joi.string().min(1).max(5000),
    postedBy: Joi.string().min(1).max(300),
    time: Joi.date(),
    parentComment: Joi.string().allow('', null)
});

function validateComment(comment) {
    return CommentSchema.validate(comment);
}

exports.validateComment = validateComment;