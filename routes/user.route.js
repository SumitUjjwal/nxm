const express = require("express");
const { UserModel } = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const fs = require("fs");

const userRouter = express.Router();
userRouter.use(express.json());

userRouter.post("/register", async (req, res) => {
       const { username, email, dob, role, location, password, confirmPassword, phone } = req.body;      

       if (password !== confirmPassword) {
              res.json({ "msg": "Password Mismatch" })
       }
       else {
              const checkExisting = await UserModel.findOne({ $or: [{ email: email }, { phone: phone }] });
              if (checkExisting) {
                     res.json({ "msg": "User already exists Please log in" });
              }
              else {
                     try {
                            bcrypt.hash(password, 5, async (err, hash) => {
                                   if (err) {
                                          console.log(err);
                                   }
                                   else {
                                          const user = new UserModel({ username, email, dob, role, location, password: hash, phone });
                                          await user.save();
                                          console.log(user);
                                          console.log(hash)
                                          res.json({ "msg": "Registered Successfully" });
                                   }
                            });

                     } catch (error) {
                            res.json({ "msg": "Error in registration" });
                            console.log(error);
                     }
              }
       }

})


userRouter.post("/login", async (req, res) => {
       const { email, password } = req.body;
       try {
              const user = await UserModel.findOne({ email });
              // console.log(user);
              if (user) {
                     bcrypt.compare(password, user["password"], async (err, result) => {
                            if (result) {
                                   const token = jwt.sign({ name: user.username }, 'masai', { expiresIn: 120000 });
                                   const refresh_token = jwt.sign({ name: user.username }, 'masai', { expiresIn: "7d" });
                                   res.cookie("token", token).cookie("refresh_token", refresh_token);
                                   res.json({ "msg": "Logged in Successfully", "token": token, "refresh_token": refresh_token });
                            }
                            else {
                                   console.log("wrong credentials");
                                   res.json({ "msg": "Invalid credentials" })
                            }
                     })
              }
              else {
                     res.json({ "msg": "Please Enter Credentials" });
              }
       } catch (error) {
              res.json({ "msg": "Error in login" });
              console.log(error);
       }
})

// userRouter.post("/newtoken", async (req, res) => {
//        const token = req.headers.authorization;
//        const refresh_token = req.headers.refresh_token;
//        const blacklisted = JSON.parse(fs.readFileSync("./blacklist.json", "utf8"));

//        if (refresh_token && blacklisted.includes(token)){
//               const token = jwt.sign({ name: user.username }, 'masai', { expiresIn: 120000 });
//               const refresh_token = jwt.sign({ name: user.username }, 'masai', { expiresIn: "7d" });
//               res.cookie("token", token).cookie("refresh_token", refresh_token);
//               res.json({ "msg": "Logged in Successfully", "token": token, "refresh_token": refresh_token });
//        }
// })

userRouter.get("/logout", (req, res) => {
       const token = req.headers.authorization;
       const blacklisted = JSON.parse(fs.readFileSync("./blacklist.json", "utf8"));

       if (token) {
              blacklisted.push(token);
              fs.writeFileSync("./blacklist.json", JSON.stringify(blacklisted))
              res.json({ "msg": "Logged out Successfully" });
       }
});



module.exports = {
       userRouter
}