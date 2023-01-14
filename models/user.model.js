const mongoose  = require("mongoose");

const userSchema = mongoose.Schema({
       username: String,
       email: String,
       dob: String,
       role: String,
       location: String,
       password: String,
       phone: Number
})

function AllFieldsRequiredByDefautlt(schema) {
       for (var i in schema.paths) {
              var attribute = schema.paths[i]
              if (attribute.isRequired == undefined) {
                     attribute.required(true);
              }
       }
}

AllFieldsRequiredByDefautlt(userSchema);

const UserModel = mongoose.model("miniprojectusers", userSchema)

module.exports = {
       UserModel
}