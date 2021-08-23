import { Users } from "../models/users";
import { UserRole } from "../configs/user.config";
import { Encryption } from "./encryption";
const dotenv = require('dotenv');
dotenv.config();


class DefaultAdminUser {

    constructor() {

    }

    public static createDefaultAdminUser = async () => {
        const name = process.env.SUPER_ADMIN_NAME;
        const email = process.env.SUPER_ADMIN_EMAIL;
        const phone = process.env.SUPER_ADMIN_PHONE;
        const role = UserRole.ADMIN;
        const password = Encryption.encryptPassword(process.env.SUPER_ADMIN_PASSWORD);

        try {
            const defaultUserAdmin = await Users.findOne({ email: email });
            if (!defaultUserAdmin) {
                await Users.create({
                    name, email, phone, role, password,
                });
            }
            else {
                return true;
            }
        }
        catch (error) {
            console.log(error);
        }
    }
}

export {
    DefaultAdminUser,
}
