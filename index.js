const express = require("express");
const {connect} = require("./config/db");
const {userRouter} = require("./routes/user.route");
const {aboutRouter} = require("./routes/about.route");
const { dataRouter } = require("./routes/userdata.route")
const { authenticate } = require("./middlewares/authenticate.middleware");
const cors = require("cors");
require('dotenv').config() 

const app = express();
app.use(cors());

app.get("/", async(req,res)=>{
       res.send("Welcome to Sumit Ujjwal Photography");
})

app.use("/user", userRouter);
app.use(authenticate);
app.use("/about", aboutRouter);
app.use("/data", dataRouter);

const port = process.env.port

app.listen(port, async ()=>{
       try {
              await connect;
              console.log("Connected to database");
       } catch (error) {
              console.log(error);
              console.log("Failed to connect to database");
       }
       console.log(`Listening on port: ${port}`);
})