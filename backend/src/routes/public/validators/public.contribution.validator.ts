import { checkSchema } from "express-validator";
import { ValidationResponder } from "../../../middleware/validation.response";
import { ContributorPost } from "../../../models/contribution";

class PublicContributionValidator {

    constructor() {

    }

    public static validatePostContributionData() {
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
            }),
            ValidationResponder.fieldValidationResponder(),
        ]
    }

    public static validateUpdateContributionData() {
        return [
            ...checkSchema({
                id: {
                    in: ['params'],
                    exists: true,
                    custom: {
                        options: (value: string, { req }) => {
                            if (value)
                                return new Promise(async (resolve, reject) => {
                                    const contribution = await ContributorPost.findOne({ _id: value });
                                    if(!contribution){
                                        return reject(false);
                                    }
                                    const contributionUserId = contribution.userId;
                                    const user = req.user;
                                    if (user._id != contributionUserId) {
                                        return reject(false);
                                    }
                                    else {
                                        return resolve(true);
                                    }
                                })
                        },
                        errorMessage: 'Contribution Id not found in your account',
                    },
                    errorMessage: 'Id is missing',
                },
                phone: {
                    in: ['body'],
                    exists: true,
                    isMobilePhone: true,
                    errorMessage: 'Phone no is missing,'
                },
                name: {
                    in: ['body'],
                    exists: true,
                    isString: true,
                    errorMessage: 'Name is missing',
                },
            }),
            ValidationResponder.fieldValidationResponder(),
        ]
    }
    public static validateDeleteContributionData() {
        return [
            ...checkSchema({
                id: {
                    in: ['params'],
                    exists: true,
                    custom: {
                        options: (value: string, { req }) => {
                            if (value)
                                return new Promise(async (resolve, reject) => {
                                    const contribution = await ContributorPost.findOne({ _id: value });
                                    if(!contribution){
                                        return reject(false);
                                    }
                                    const contributionUserId = contribution.userId;
                                    const user = req.user;
                                    if (user._id != contributionUserId) {
                                        return reject(false);
                                    }
                                    else {
                                        return resolve(true);
                                    }
                                })
                        },
                        errorMessage: 'Contribution Id not found in your account',
                    },
                    errorMessage: 'Id is missing',
                },
            }),
            ValidationResponder.fieldValidationResponder(),
        ]
    }
}

const ValidatePostContributionData = PublicContributionValidator.validatePostContributionData();
const ValidateUpdateContributionData = PublicContributionValidator.validateUpdateContributionData();
const ValidateDeleteContributionData = PublicContributionValidator.validateDeleteContributionData();

export {
    ValidatePostContributionData,
    ValidateUpdateContributionData,
    ValidateDeleteContributionData
}