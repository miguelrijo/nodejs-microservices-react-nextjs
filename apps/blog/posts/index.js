const express = require("express");
const { randomBytes } = require("crypto");
const bodyParser = require("body-parser");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};

app.get("/posts/create", (req, res) => {
  res.status(201).send(posts);
});

app.post("/posts/create", async (req, res) => {
  const id = randomBytes(4).toString("hex");
  const { title } = req.body;
  posts[id] = {
    id,
    title,
  };
  await axios
    .post("http://event-bus-srv:4005/events", {
      type: "PostCreated",
      data: {
        id,
        title,
      },
    })
    .catch((e) => console.log(new Date(), JSON.stringify(e)));
  res.status(201).send(posts[id]);
});

app.post("/events", (req, res) => {
  console.log(req.body);

  res.send({});
});

app.listen(4000, () => {
  console.log("v55 --------YAML---888-----");
  console.log("Listining on 4000");
});
