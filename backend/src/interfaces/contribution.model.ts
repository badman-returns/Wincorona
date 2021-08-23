import { Document } from 'mongoose';
import { User } from './user.model';

interface Contribution extends Document {
    userId: string,
    userName: string,
    userEmail: string,
    name: string,
    phone: string | number,
    pincode: string | number,
    district: string,
    state: string,
    bloodPlasma: boolean,
    oxygen: boolean,
    ambulance: boolean,
    medicine: boolean,
    beds: boolean,
    icuBeds: boolean,
    food: boolean,
    others: boolean,
    additionalDetails: string,  
}

export { Contribution };