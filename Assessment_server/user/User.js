var mongoose = require('mongoose');  
var UserSchema = new mongoose.Schema({  
  username: String,
  email:String,
  password: String,
  displayName:String,
  firstName: String,
  lastName: String,
  nickname: String,
  website:String,
  bio: String,
  jabber: String,
  aol: String,
  yahoo: String
});
mongoose.model('User', UserSchema);

module.exports = mongoose.model('User');