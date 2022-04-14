require("dotenv").config();
const connectDb = require("./startup/db");
const express = require("express");
const cors = require("cors");
const {google} = require("googleapis");
const comments = require("./routes/comments")
const app = express();
const apikey = "AIzaSyDAXtEJIM9IO2wD89wXhcRxmu72ryJGk2I";
const baseApiUrl = "https://www.googleapis.com/youtube/v3";
const youtube = google.youtube({
  version: "v3",
  auth: apikey,
});


app.get("/search-with-googleapis", async (req, res, next) => {
  try {
    const searchQuery = req.query.search_query;
    const response = await youtube.search.list({
      part: "snippet",
      q: searchQuery,
      type: "video",
    });
    const titles = response.data.items.map((item) => item.snippet.title);
    res.send(titles);
  } catch (error) {
    // return res.status(500).send(`Internal Server Error: ${error}`);
    next(err);
  }
});

connectDb();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/comments", comments);




const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running. Listening on PORT: ${PORT}`);
});
