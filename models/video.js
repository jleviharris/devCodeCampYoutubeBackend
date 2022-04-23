const mongoose = require("mongoose");
const Joi = require("joi");

const videoSchema = new mongoose.Schema({
    videoID: {type: String},
    comment: {type: String},
    dateAdded: {type: Date, default: Date.now()},
});

function validateVideo(video){
    const schema = Joi.object({
        videoID: Joi.string(),
        comment: Joi.string(),
     
    })
    return schema.validate(video);
}


const Video = mongoose.model('Video', videoSchema);

module.exports = {
    Video,
    validateVideo,
    videoSchema,
};