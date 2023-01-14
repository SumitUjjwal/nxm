const jwt = require("jsonwebtoken");


const authenticate = (req, res, next) => {
       // const token = req.headers.authorization || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb3Vyc2UiOiJiYWNrZW5kIiwiaWF0IjoxNjczNjM0Mjc5fQ.R4Tc5iPs-JLxM0pYpzQ1bami12wqiaDmi61hUv-eh3Y"
       const token = req.headers.authorization
       if (token) {
              const decoded_token = jwt.verify(token, "masai")
              if (decoded_token) {
                     next()
              }
              else {
                     res.json({ "msg": "Please Login First" })
              }
       }
       else {
              res.json({ "msg": "Please Login First" })
       }
}


module.exports = {
       authenticate
}