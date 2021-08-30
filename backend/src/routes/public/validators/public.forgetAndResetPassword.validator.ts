import { checkSchema } from "express-validator";
import { Users } from "../../../models/users";
import { ValidationResponder } from "../../../middleware/validation.response";

class PublicForgetAndResetPasswordValidator {

    constructor() {

    }

    public static validateEmail() {
        return [
            ...checkSchema({
                email: {
                    in: ['body'],
                    exists: true,
                    custom: {
                        options: (value: string) => {
                            if (value)
                                return new Promise(async (resolve, reject) => {
                                    const user = await Users.findOne({email: value});
                                    if(!user){
                                        return reject(false);
                                    }
                                    else{
                                        return resolve(true);
                                    }
                                })
                        },
                        errorMessage: 'User does not exist',
                    },
                    errorMessage: 'Email Id is missing',
                }
            }),
            ValidationResponder.fieldValidationResponder(),
        ]
    }

    public static validateUser() {
        return [
            ...checkSchema({
                userId: {
                    in: ['params'],
                    exists: true,
                    custom: {
                        options: (value: string) => {
                            if (value)
                                return new Promise(async (resolve, reject) => {
                                    const user = await Users.findOne({_id: value});
                                    if(!user){
                                        return reject(false);
                                    }
                                    else{
                                        return resolve(true);
                                    }
                                })
                        },
                        errorMessage: 'User does not exist',
                    },
                    errorMessage: 'User Id is missing',
                }
            }),
            ValidationResponder.fieldValidationResponder(),
        ]
    }

}

const ValidateEmail = PublicForgetAndResetPasswordValidator.validateEmail();
const ValidateUser = PublicForgetAndResetPasswordValidator.validateUser();

export {
    ValidateEmail,
    ValidateUser
}