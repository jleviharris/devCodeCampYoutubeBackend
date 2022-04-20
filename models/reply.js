const mongoose = require("mongoose");
const Joi = require("joi");

const replySchema = new mongoose.Schema({
    reply: {type: String, required: true, minlength:1, maxlength:250},
    dateAdded: {type: Date, default: Date.now()},
});

function validateReply(reply){
    const schema = Joi.object({
        reply: Joi.string().min(2).max(250).required(),
    })
    return schema.validate(reply);
}


const Reply = mongoose.model('Reply', replySchema);

module.exports = {
    Reply,
    validateReply,
    replySchema,
};