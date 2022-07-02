const axios = require("axios");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

app.post("/events", async (req, res) => {
  const { type, data } = req.body;

  if (type === "CommentCreated") {
    const status = data.content.includes("orange") ? "rejected" : "approved";

    await axios
      .post("http://event-bus-srv:4005/events", {
        type: "CommentUpdated",
        data: { ...data, status },
      })
      .catch((e) => console.log(e));
  }
});

app.listen(4003, () => {
  console.log("Running on 4003");
});
