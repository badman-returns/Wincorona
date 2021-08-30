import mongoose, { Model } from 'mongoose';
import { User } from '../interfaces';
const { Schema } = mongoose;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: Number,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
    active: {
        type: Boolean,
        default: false,
        required: true,
    },
    createdOn: {
        type: Date,
        default: Date.now,
    },
})

const Users: Model<User | any> = mongoose.model('users', UserSchema);

export { Users };
