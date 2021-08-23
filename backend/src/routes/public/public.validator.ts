import { checkSchema } from "express-validator";
import { ValidationResponder } from "../../middleware/validation.response";
class PublicValidator {

    constructor() {

    }

    public static validateBasicDetails() {
        return [
            ...checkSchema({
                name: {
                    in: ['body'],
                    isString: true,
                    exists: true,
                    errorMessage: 'Name is missing',
                },
                phone: {
                    in: ['body'],
                    isInt: true,
                    exists: true,
                    errorMessage: 'Phone is missing',
                },
                pincode: {
                    in: ['body'],
                    isInt: true,
                    exists: true,
                    errorMessage: 'Pincode is missing',
                },
                additionalDetails: {
                    in: ['body'],
                    isString: true,
                    exists: true,
                    errorMessage: 'Additional Message is missing',
                }
            }),
            ValidationResponder.fieldValidationResponder(),
        ]
    }
    public static validateContactPost() {
        return [
            ...checkSchema({
                name: {
                    in: ['body'],
                    isString: true,
                    exists: true,
                    errorMessage: 'Name is missing',
                },
                email: {
                    in: ['body'],
                    isEmail: true,
                    exists: true,
                    errorMessage: 'Email is missing',
                },
                phone: {
                    in: ['body'],
                    isInt: true,
                    exists: true,
                    errorMessage: 'Phone is missing',
                },
                message: {
                    in: ['body'],
                    isString: true,
                    exists: true,
                    errorMessage: 'Message is missing',
                },
            }),
            ValidationResponder.fieldValidationResponder(),
        ]
    }
    public static validateSearchDetails() {
        return [
            ...checkSchema({
                pincode: {
                    in: ['body'],
                    isNumeric: true,
                    exists: true,
                    errorMessage: 'Pincode is missing',
                },
            }),
            ValidationResponder.fieldValidationResponder(),
        ]
    }
}

const ValidateBasicDetails = PublicValidator.validateBasicDetails();
const ValidateContactPost = PublicValidator.validateContactPost();
const ValidateSearchDetails = PublicValidator.validateSearchDetails();

export {
    ValidateBasicDetails,
    ValidateContactPost,
    ValidateSearchDetails,
}
