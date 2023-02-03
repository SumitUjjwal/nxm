const jwt = require("jsonwebtoken");
const fs = require("fs");


const newToken = (req, res, next) => {
       const refresh_token = req.headers.refresh_token
       if (refresh_token) {
              const decoded_token = jwt.verify(refresh_token, "masai", (err, decode)=>{
                     if(err){
                            res.json({ "msg": "Invalid Refresh Token - Please Login Again", "err": err.message });
                     }
                     else{
                            next();
                     }
              })
              // if (decoded_token) {
              //        console.log(decoded_token)
              //        next();
              // }
              // else {
              //        res.json({ "msg": "User not Authorized" });
              // }
       }
       else {
              res.json({ "msg": "Please Login Again" });
       }
}

module.exports = {
       newToken
}