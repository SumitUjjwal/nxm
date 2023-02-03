const authorize = (role_array) => {
       return (req, res, next) => {
              const userrole = req.headers.userrole
              if (role_array.includes(userrole)) {
                     next()
              }
              else {
                     res.send("not authorised")
              }
       }
}

module.exports = {
       authorize
}