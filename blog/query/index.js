const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/events", (req, resp) => {
  const { type, data } = req.body;
  processEvents(data, type);
  resp.status(200).send(posts);
});

const processEvents = (data, type) => {
  if (type === "PostCreated") {
    const { id, title, status } = data;
    posts[id] = { id, title, status, comments: [] };
  }
  if (type === "CommentCreated") {
    const { id, content, postId, status } = data;
    const post = posts[postId];
    post.comments.push({ id, content, status });
  }

  if (type === "CommentUpdated") {
    const { id, content, postId, status } = data;
    const post = posts[postId];
    const comment = post.comments.find((commentItem) => commentItem.id === id);
    comment.content = content;
    comment.status = status;
  }
};

app.listen("4002", async () => {
  console.log("Listening on 4002");

  const res = await axios
    .get("http://event-bus-srv:4005/events")
    .catch((e) => console.log(e));
  console.log(res.data);
  for (let event of res.data) {
    console.log("processing ", event.type, event);
    processEvents(event.data, event.type);
  }
});
