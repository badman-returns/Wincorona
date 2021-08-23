import mongoose, { Model } from 'mongoose';
import { Help } from '../interfaces';
const { Schema } = mongoose;

const GetHelpPostSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
    },
    pincode: {
        type: Number,
        required: true,
    },
    district: {
        type: String,
    },
    region: {
        type: String,
    },
    state: {
        type: String,
    },
    bloodPlasma: {
        type: Boolean,
        default: false,
    },
    oxygen: {
        type: Boolean,
        default: false,
    },
    ambulance: {
        type: Boolean,
        default: false,
    },
    medicine: {
        type: Boolean,
        default: false,
    },
    beds: {
        type: Boolean,
        default: false,
    },
    icuBeds: {
        type: Boolean,
        default: false,
    },
    food: {
        type: Boolean,
        default: false,
    },
    others: {
        type: Boolean,
        default: false,
    },
    additionalDetails: {
        type: String,
        required: true,
    },
    createdOn: {
        type: Date,
        default: Date.now,
    }
})

const GetHelpPost: Model<Help> = mongoose.model('need-help', GetHelpPostSchema);

export { GetHelpPost };