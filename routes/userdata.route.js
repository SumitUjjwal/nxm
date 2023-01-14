
const express = require("express");
const { UserModel } = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
// const regex = require("regex");
const dataRouter = express.Router();
dataRouter.use(express.json());

dataRouter.get("/users", async (req, res) => {
       const query = req.query;
       const searchTerm = query.q;
       const page = query.page;
       const limit = query.limit;
       try {
              if (searchTerm) {
                     // const user = await UserModel.find({ $or: [{ username: { $regex: searchTerm, $options: "i" } }, { email: { $regex: searchTerm, $options: "i" } }, { role: { $regex: searchTerm, $options: "i" } }, { location: { $regex: searchTerm, $options: "i" } }, { phone: { $regex: searchTerm, $options: "i" } }] });
                     const user = await UserModel.find({ username: { $regex: searchTerm, $options: "i"  }});
                     res.json(user);
              }
              else if(page){
                     const user = await UserModel.find().skip((page-1)*limit).limit(limit);
                     res.json(user);
              }
              else {
                     const user = await UserModel.find(query);
                     console.log(user);
                     res.json(user);
              }

       } catch (error) {
              console.log(error);
              res.json({ "msg": "Error in getting Users" });

       }
})

dataRouter.patch("/update/:id", async (req, res) => {
       const payload = req.body;
       const id = req.params.id;
       try {
              await UserModel.findByIdAndUpdate({ _id: id }, payload);
              res.json({ "msg": `User updated successfully with id : ${id}` });
       } catch (error) {
              console.log(error);
              res.json({ "msg": "Error in updating data" });
       }
})

dataRouter.delete("/delete/:id", async (req, res) => {
       const id = req.params.id;
       try {
              await UserModel.findByIdAndDelete({ _id: id });
              res.json({"msg":`User deleted successfully with id : ${id}`});
       } catch (error) {
              console.log(error);
              res.json({ "msg": "Error in deleting data" });
       }
})

module.exports = {
       dataRouter
}