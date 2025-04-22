import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const access_schema = new Schema({
    access: { type: String, required: true }
});

export default mongoose.model('access', access_schema);
