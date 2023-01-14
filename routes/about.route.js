const express = require('express');
const jwt = require("jsonwebtoken");

const aboutRouter = express.Router();

aboutRouter.get("/", async (req, res) => {
       const token = req.headers.authorization;
       jwt.verify(token, "masai", async (error, decoded) => {
              if (decoded) {
                     const query = req.query;
                     res.send("accessing aboutRouter");
              }
              else {
                     res.send("Please Login First");
              }
       })
})

module.exports = {
       aboutRouter
}