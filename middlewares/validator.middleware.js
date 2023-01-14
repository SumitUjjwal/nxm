const jwt = require("jsonwebtoken");


const validate = (req, res, next) => {
       const token = req.headers.authorization
       if (token) {
              const decoded_token = jwt.verify(token, "masai")
              if (decoded_token) {
                     next()
              }
              else {
                     res.send("Please Login First")
              }
       }
       else {
              res.send("Please Login First")
       }
}


module.exports = {
       validate
}