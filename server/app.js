require("dotenv").config();

const express = require("express");
const cors = require("cors");
const axios = require("axios");
const { generateAccessToken, authenticateToken } = require("./auth");

const app = express();
app.use(express.json());
app.use(cors({ origin: true }));

app.post("/signup", async (req, res) => {
  const { username, secret, email } = req.body;

  try {
    const response = await axios.post(
      "https://api.chatengine.io/users/",
      { username, secret, email },
      { headers: { "Private-Key": process.env.CHAT_ENGINE_PRIVATE_KEY } }
    );
    return res.status(response.status).json(response.data);
  } catch (error) {
    return res.status(error.response.status).json(error.response.data);
  }
});

app.post("/login", async (req, res) => {
  const { username, secret } = req.body;

  try {
    const response = await axios.get("https://api.chatengine.io/users/me/", {
      headers: {
        "Project-ID": process.env.CHAT_ENGINE_PROJECT_ID,
        "User-Name": username,
        "User-Secret": secret,
      },
    });


    const accessToken = generateAccessToken({ username });


    return res.status(response.status).json({
      ...response.data,
      accessToken,
    });
  } catch (error) {
    return res.status(error.response.status).json(error.response.data);
  }
});

app.get("/protected-route", authenticateToken, (req, res) => {
  res.json({ message: `Hello, ${req.user.username}` });
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
