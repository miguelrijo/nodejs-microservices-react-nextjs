const express = require("express");
const bodyparser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(bodyparser.json());

const events = [];

app.post("/events", (req, res) => {
  const event = req.body;
  events.push(event);
  axios
    .post("http://post-clusterip-srv:4000/events", event)
    .catch((e) => console.log(JSON.stringify(e)));
  // axios
  //   .post("http://localhost:4001/events", event)
  //   .catch((e) => console.log(JSON.stringify(e)));
  // axios
  //   .post("http://localhost:4002/events", event)
  //   .catch((e) => console.log(JSON.stringify(e)));
  // axios
  //   .post("http://localhost:4003/events", event)
  //   .catch((e) => console.log(JSON.stringify(e)));

  res.send({ status: "OK" });
});

app.get("/events", (req, res) => {
  res.send(events);
});

app.listen(4005, () => {
  console.log("Listening on 4005");
});
