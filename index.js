const express = require("express");
const { connect } = require("./config/db");
const { userRouter } = require("./routes/user.route");
const { aboutRouter } = require("./routes/about.route");
const { dataRouter } = require("./routes/userdata.route")
const { authenticate } = require("./middlewares/authenticate.middleware");
const { newToken} = require("./middlewares/newToken.middleware");
const port = process.env.port;
const cors = require("cors");
require('dotenv').config()

const app = express();
app.use(cors());

app.get("/", async (req, res) => {
       res.send("Welcome to Sumit Ujjwal Photography");
})

app.use("/user", userRouter);
app.use(authenticate);
app.use(newToken);
app.use("/about", aboutRouter);
app.use("/data", dataRouter);



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