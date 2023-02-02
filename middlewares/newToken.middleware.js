const jwt = require("jsonwebtoken");
const fs = require("fs");

const newToken = (req,res,next) => {
       const token = req.headers.authorization;
       const refresh_token = req.headers.refresh_token;
       const blacklisted = JSON.parse(fs.readFileSync("./blacklist.json", "utf8"));

       if (refresh_token && blacklisted.includes(token)) {
              const token = jwt.sign({ name: user.username }, 'masai', { expiresIn: 120000 });
              const refresh_token = jwt.sign({ name: user.username }, 'masai', { expiresIn: "7d" });
              res.cookie("token", token).cookie("refresh_token", refresh_token);
              // res.json({ "msg": "Logged in Successfully", "token": token, "refresh_token": refresh_token });
              next();
       }else{
              // res.json({ "msg": "Please login again"});
              // next();
       }
}

module.exports = {
       newToken
}