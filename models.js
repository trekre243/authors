const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    userName: {type: String, required: true, minlength: 4},
    password: {type: String, required: true}
});

const User = mongoose.model('User', UserSchema);

module.exports = {User: User};