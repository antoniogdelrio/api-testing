const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    _id: Schema.Types.ObjectId,
    userName: String,
})

module.exports = mongoose.model('User', userSchema);