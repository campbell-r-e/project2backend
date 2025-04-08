const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const access_schema = new Schema({
    access: { type: String, required: true }
 
});

module.exports = mongoose.model('access', access_schema);
