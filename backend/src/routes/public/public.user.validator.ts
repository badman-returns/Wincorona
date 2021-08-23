import { checkSchema } from "express-validator";
import { Users } from "../../models/users";
import { User } from "../../interfaces";
import { ValidationResponder } from "../../middleware/validation.response";

class PublicUserValidator {

    constructor() {

    }

    public static validateRegistrationData() {
        return [
            ...checkSchema({
                name: {
                    in: ['body'],
                    exists: true,
                    isString: true,
                    errorMessage: 'Name is missing'
                },
                email: {
                    in: ['body'],
                    exists: true,
                    isEmail: true,
                    custom: {
                        options: (value: string) => {
                            if (value)
                                return new Promise(async (resolve, reject) => {
                                    const user: User = await Users.findOne({ email: value });
                                    if (user != null) {
                                        return reject(false);
                                    }
                                    else {
                                        return resolve(true)
                                    }
                                });
                        },
                        errorMessage: 'Email already exist',
                    },
                    errorMessage: 'Email is missing',
                },
                phone: {
                    in: ['body'],
                    exists: true,
                    custom: {
                        options: (value: string) => {
                            if (value)
                                return new Promise(async (resolve, reject) => {
                                    const user: User = await Users.findOne({ phone: value });
                                    if (user != null) {
                                        return reject(false);
                                    }
                                    else {
                                        return resolve(true);
                                    }
                                });
                        },
                        errorMessage: 'Phone Number already exist',
                    },
                    errorMessage: 'Phone is missing',
                },
                password: {
                    in: ['body'],
                    notEmpty: true,
                    exists: true,
                    errorMessage: 'Password is missing'
                }
            }),
            ValidationResponder.fieldValidationResponder(),
        ]
    }

}

const ValidateRegistrationData = PublicUserValidator.validateRegistrationData();

export {
    ValidateRegistrationData,
}
