const mongoose = require(`mongoose`);
const Schema = mongoose.Schema;


const logbook = new Schema({


    email: {
        type: String,
        required: true

    },
    password: {
        type: String,
        required: true
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: 'email',
        required: true
    }
})
module.exports = mongoose.model('email', logbook);
