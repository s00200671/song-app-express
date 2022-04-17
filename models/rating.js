const Joi = require("joi");

const RatingSchema = Joi.object({
    uid: Joi.string().min(1).max(300).required(),
    albumid: Joi.string().min(1).max(300),
    rating: Joi.number().min(0.5).max(5).required()
});

function validateRating(rating) {
    return RatingSchema.validate(rating);
}

exports.validateRating = validateRating;