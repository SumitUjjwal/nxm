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
                     const decoded_token = jwt.verify(token, "nxm", (err, decoded) => {
                            if(err){
                                   res.json({"msg": "Invalid Normal Token - Please Login Again", "err": err.message});
                            }
                            else{
                                   const userrole = decoded.role;
                                   req.headers.userrole = userrole;
                                   console.log(userrole);
                                   next();
                            }
                     })
              }
       }
       else {
              res.json({ "msg": "Please Login Again" });
       }
}

module.exports = {
       authenticate
}