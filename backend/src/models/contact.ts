import mongoose, { Model } from 'mongoose';
import { Contact } from '../interfaces';
const { Schema } = mongoose;

const ContactSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
    },
    message: {
        type: String,
        required: true
    },
    createdOn: {
        type: Date,
        default: Date.now,
    },
})

const Contacts: Model<Contact> = mongoose.model('contact', ContactSchema);

export { Contacts };
