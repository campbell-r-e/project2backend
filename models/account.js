const mongoose = require(`mongoose`);
const Schema = mongoose.Schema;


const userschema = new Schema({


    email: {
        type: String,
        required: true

    },
    password: {
        type: String,
        required: true
    },
    access:{
        type: Schema.Types.ObjectId,
        ref: 'access',
        required: true
    }
})
module.exports = mongoose.model('User', userschema);

