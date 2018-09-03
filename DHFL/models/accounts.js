var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

var accountSchema = new mongoose.Schema({
username:String,
password:String
});




accountSchema.plugin(passportLocalMongoose);

var Account=mongoose.model("Account",accountSchema);


module.exports=Account;