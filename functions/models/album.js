const Joi = require("joi");

const SongSchema = Joi.object({
    title: Joi.string().min(1).max(300),
    length: Joi.number().min(0).max(10000)
});

const AlbumSchema = Joi.object({
    title: Joi.string().min(1).max(300).required(),
    description: Joi.string().max(3000),
    year: Joi.number().min(1900).max(10000),
    artists: Joi.array().items(Joi.string().min(1).max(100)),
    songs: Joi.array().items(SongSchema),
    genres: Joi.array().items(Joi.string().min(1).max(100))
});

function validateAlbum(album) {
    return AlbumSchema.validate(album);
}

exports.validateAlbum = validateAlbum;