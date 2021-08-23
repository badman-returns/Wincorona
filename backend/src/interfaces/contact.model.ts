import { Document } from 'mongoose';

interface Contact extends Document {
    id: number,
    name: string,
    email: string,
    phone: string | number,
    message: string,
    createdOn: Date,
}

export {
    Contact,
}