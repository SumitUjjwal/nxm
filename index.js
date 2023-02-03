const express = require("express");
const { connect } = require("./config/db");
const { userRouter } = require("./routes/user.route");
const { aboutRouter } = require("./routes/about.route");
const { dataRouter } = require("./routes/userdata.route")
const { authenticate } = require("./middlewares/authenticate.middleware");
const { newToken } = require("./middlewares/newToken.middleware");
const { authorize} = require("./middlewares/authorize.middleware");
const port = process.env.port;
const jwt = require("jsonwebtoken");
const cors = require("cors");
const { UserModel } = require("./models/user.model");
require('dotenv').config()

const app = express();
app.use(cors());

app.get("/", async (req, res) => {
       res.send("Welcome to Sumit Ujjwal Photography");
})

app.use("/user", userRouter);
app.use(authenticate);
// app.use(authorize);
app.use("/about", authorize(["explorer", "admin"]), aboutRouter);
app.use("/data", authorize(["admin"]), dataRouter);

// -------------------------------------------------------
// app.get("/buy", authorize(["explorer", "admin"]), async (req, res) => {
//        res.json({ "buyProducts": "here are the products" });
// });

// app.get("/edit", authorize(["admin"]), async (req, res) => {
//        res.json({ "editProducts": "here are your products" });
// });

// app.get("/review", authorize(["explorer"]), async (req, res) => {
//               res.json({ "reviewProducts": "products reviews" });
// });
// -------------------------------------------------------

app.listen(port, async () => {
       try {
              await connect;
              console.log("Connected to database");
              console.log(`Listening on port: ${port}`);
       } catch (error) {
              console.log(error);
              console.log("Failed to connect to database");
       }
})