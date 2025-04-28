import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
const Schema = mongoose.Schema;


export const userschema = new Schema({


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
userschema.methods.comparePassword = function (candidatePassword: string): Promise<boolean> {
    return bcrypt.compare(candidatePassword, this.password);
  };

export default mongoose.model('User', userschema);

