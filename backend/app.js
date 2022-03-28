// config environment variable
require("dotenv").config();

// connect to mongodb
require("colors");
require("./db/app");

const path = require("path");
const express = require("express");
const cookieParser = require("cookie-parser");

// require routes
const subscriberPhoneRoutes = require("./routes/subscriberPhone");
const userRoutes = require("./routes/user");
const ownerRoutes = require("./routes/owner");
const auth = require("./middlewares/auth");
const login = require("./controllers/login");

// config port
const PORT = process.env.PORT || 5000;
// init express app
const app = express();

app.use(express.json());
app.use(cookieParser({}));

// static page
app.use(express.static(path.join(__dirname, "../frontend/build")));

app.post("/api/login", login);

// get profile
app.get("/api/profile", auth, (req, res) => res.status(200).json(req.user));

app.use(subscriberPhoneRoutes);
app.use(userRoutes);
app.use(ownerRoutes);

// server static page
app.get("*", function (_, res) {
  res.sendFile(path.join(__dirname, "../frontend/build/index.html"), (err) => {
    if (err) return res.status(500).send(err);
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port:${PORT} `.green);
});
