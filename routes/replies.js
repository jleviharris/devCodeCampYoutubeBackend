const {Reply, validateReply} = require("../models/reply");
const express = require("express");
const router = express.Router();

// GET all replies
// http://localhost:3007/api/replies
router.get("/", async (req, res) => {
    try {
        let replies = await Reply.find();
        if (!replies) return res.status(400).send(`No reply in this collection!`);
        return res.status(200).send(replies);
    } catch (error) {
        return res.status(500).send(`Internal Server Error: ${error}`);
    }
});

//GET a reply by id
// http://localhost:3007/api/replies/:replyId
router.get("/:replyId", async (req,res) => {
    try {
        let reply = await Reply.findById(req.params.replyId)
        if (!reply)
            return res.status(400).send(`Reply with Id of ${req.params.replyId} does not exist!`);
        return res.status(200).send(reply);
    } catch (error) {
        return res.status(500).send(`Internal Server Error: ${error}`);
    }
})

//POST a new reply
// http://localhost:3007/api/replies

router.post("/", async (req, res) => {
    try {
        const {error} = validateReply(req.body)
        if (error) return res.status(400).send(error);
       
        let newReply = await new Reply(req.body)
        await newReply.save()
        
        return res.status(201).send(newReply)
    } catch (error) {
        return res.status(500).send(`Internal Server Error: ${error}`);
    }
});

//PUT an existing comment
// http://localhost:3007/api/replies/:replyId
router.put("/:replyId", async (req,res) => {
    try {
        const {error} = validateReply(req.body)
        if (error) return res.status(400).send(error);

        let reply = await Reply.findByIdAndUpdate(req.params.replyId, req.body, {new: true});
        if (!reply)
        return res.status(400).send(`Comment with Id of ${req.params.replyId} does not exist!`);

        return res.send(reply);
    } catch (error) {
        return res.status(500).send(`Internal Server Error: ${error}`);
    }
})


//DELETE an existing reply
// http://localhost:3007/api/replies/:replyId
router.delete("/:replyId", async (req, res) => {
    try {
        let reply = await Reply.findByIdAndDelete(req.params.replyId);
        if (!reply)
            return res.status(400).send(`Reply with Id of ${req.params.replyId} does not exist!`);
        return res.status(200).send(reply);
    } catch (error) {
        return res.status(500).send(`Internal Server Error: ${error}`);   
    }
});





module.exports = router;