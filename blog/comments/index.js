const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const commentsByPostId = {};

app.get("/posts/:id/comments", (req, res) => {
  res
    .status(201)
    .send(
      commentsByPostId[req.params.id] ? commentsByPostId[req.params.id] : []
    );
});

app.post("/posts/:id/comments", async (req, res) => {
  const commentId = randomBytes(4).toString("hex");
  const { content } = req.body;
  const comments = commentsByPostId[req.params.id] || [];
  comments.push({ id: commentId, content, status: "pending" });
  commentsByPostId[req.params.id] = comments;
  console.log(new Date(), content);
  await axios
    .post("http://event-bus-srv:4005/events", {
      type: "CommentCreated",
      data: {
        postId: req.params.id,
        content,
        id: commentId,
        status: "pending",
      },
    })
    .catch((e) => console.log(JSON.stringify(e)));

  res.status(201).send(commentsByPostId);
});

app.post("/events", async (req, res) => {
  console.log(req.body);

  const { type, data } = req.body;

  if (type === "CommentModerated") {
    const { postId, id, status, content } = data;
    const comments = commentsByPostId[postId];
    let comment = comments.find((commentItem) => commentItem.id === id);
    comment.status = status;

    await axios
      .post("http://event-bus-srv:4005/events", {
        type: "CommentUdpated",
        data: {
          postId,
          content,
          id,
          status,
        },
      })
      .catch((e) => console.log(JSON.stringify(e)));
  }
  res.send({});
});

app.listen(4001, () => {
  console.log("Listening on the hill 4001");
});
