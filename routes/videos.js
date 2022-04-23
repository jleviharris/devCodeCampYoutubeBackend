const {Video, validateVideo} = require("../models/video");
const express = require("express");
const router = express.Router();


// GET all videos
// http://localhost:3007/api/videoss
router.get("/", async (req, res) => {
    try {
        let videos = await Video.find();
        if (!videos) return res.status(400).send(`No videos in this collection!`);
        return res.status(200).send(videos);
    } catch (error) {
        return res.status(500).send(`Internal Server Error: ${error}`);
    }
});



//GET a video by Videoid
// http://localhost:3007/api/videos/:VideoId
router.get("/:VideoID", async (req,res) => {
    try {
        let video = await Video.findById(req.params.VideoID)
        if (!video)
            return res.status(400).send(`Video with Id of ${req.params.VideoID} does not exist!`);
        return res.status(200).send(video);
    } catch (error) {
        return res.status(500).send(`Internal Server Error: ${error}`);
    }
})

//POST a new video
// http://localhost:3007/api/videos

router.post("/", async (req, res) => {
    try {
        const {error} = validateVideo(req.body)
        if (error) return res.status(400).send(error);
       
        let newVideo = await new Video(req.body)
        await newVideo.save()
        
        return res.status(201).send(newVideo)
    } catch (error) {
        return res.status(500).send(`Internal Server Error: ${error}`);
    }
});

module.exports = router;