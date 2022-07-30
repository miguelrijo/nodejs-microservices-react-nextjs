const express = require("express");
const bodyparser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(bodyparser.json());

const events = [];

app.post("/events", (req, res) => {
  const event = req.body;
  console.log(new Date(), event);
  events.push(event);
  axios
    .post("http://post-clusterip-srv:4000/events", event)
    .catch((e) => console.log(JSON.stringify(e)));
  axios
    .post("http://comments-srv:4001/events", event)
    .catch((e) => console.log(JSON.stringify(e)));
  axios
    .post("http://query-srv:4002/events", event)
    .catch((e) => console.log(new Date(), JSON.stringify(e)));
  axios
    .post("http://moderation-clusterip-srv:4003/events", event)
    .catch((e) => console.log(new Date(), JSON.stringify(e)));

  res.send({ status: "OK" });
});

app.get("/events", (req, res) => {
  res.send(events);
});

app.listen(4005, () => {
  console.log("Listening on 4005");
});
