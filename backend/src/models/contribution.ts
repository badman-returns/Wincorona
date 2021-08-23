import mongoose, { Model } from 'mongoose';
import { Contribution } from '../interfaces';
const { Schema } = mongoose;

const ContributionSchema = new Schema({
    userId: {
        type: String,
        required: true,
    },
    userName: {
        type: String,
        required: true,
    },
    userEmail: {
        type: String,
        required: true,
    },
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
        required: true,
    },
    state: {
        type: String,
        required: true,
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
    },
    createdOn: {
        type: Date,
        default: Date.now,
    }
})

const ContributorPost: Model<Contribution> = mongoose.model('contributions', ContributionSchema);

export { ContributorPost };