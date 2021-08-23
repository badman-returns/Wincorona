import { Document } from 'mongoose';

interface Help extends Document {
    name: string,
    email: string,
    phoneNo: string | number,
    pincode: string | number,
    district: string,
    region: string,
    division: string,
    state: string,
}

export { Help };