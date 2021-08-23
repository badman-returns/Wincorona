import { Document } from 'mongoose';

interface User extends Document {
    id: number,
    name: string,
    email: string,
    phone: string | number,
    password: string,
    role: string,
    createdOn: Date,
}

export {
    User,
}