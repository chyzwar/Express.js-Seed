//User Models
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt   = require('bcrypt');

var UserSchema = new Schema({
    id: String,
    password: String,
    email: String,
    firstName: String,
    lastName: String,
    authority: {
        role: String,
        name: String,
    }
});

UserSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

UserSchema.methods.isValidPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

UserSchema.statics.findByEmailOrQuery = function(email, query, callback) {
    this.findOne({
        $or: [{
            email: email
        }, query]
    }, callback);
};
module.exports = mongoose.model('User', UserSchema);
