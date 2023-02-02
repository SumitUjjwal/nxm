const jwt = require("jsonwebtoken");
const fs = require("fs");


const authenticate = (req, res, next) => {
       const token = req.headers.authorization
       if (token) {
              const blacklisted = JSON.parse(fs.readFileSync("./blacklist.json", "utf8"));
              if (blacklisted.includes(token)) {
                     res.json({ "msg": "Please Login Again" });
              }
              else {
                     const decoded_token = jwt.verify(token, "masai")
                     if (decoded_token) {
                            console.log(decoded_token)
                            next();
                     }
                     else {
                            res.json({ "msg": "User not Authorized" });
                     }
              }
       }
       else {
              res.json({ "msg": "Please Login Again" });
       }
}

module.exports = {
       authenticate
}