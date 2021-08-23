import { Response } from 'express';
import { ContributorPost } from '../../../models/contribution';
import { GetDetailsByPincode } from '../../../utility';
import { AuthenticatedRequest, Contribution, ResponseObject } from "../../../interfaces";

class PublicUserContributionController {

    constructor() {

    }

    public static postContributionByUserId = async (req: AuthenticatedRequest, res: Response) => {
        const userId = req.user._id;
        const userName = req.user.name;
        const userEmail = req.user.email;
        const name = req.body.name;
        const phone = req.body.phone;
        const pincode = req.body.pincode;
        const bloodPlasma = req.body.bloodPlasma;
        const oxygen = req.body.oxygen;
        const ambulance = req.body.ambulance;
        const medicine = req.body.medicine;
        const beds = req.body.beds;
        const icuBeds = req.body.icuBeds;
        const food = req.body.food;
        const others = req.body.others;
        const avaiable = req.body.available
        const additionalDetails = req.body.additionalDetails;

        let response: ResponseObject<Contribution>;

        try {
            const pincodeDetails = await GetDetailsByPincode(pincode);

            if (!pincodeDetails.ResponseData) {
                res.status(400).send({ msg: 'Invalid pincode' });
            }
            else {
                const district = pincodeDetails.ResponseData.District;
                const state = pincodeDetails.ResponseData.State;


                const contributor: Contribution = await ContributorPost.create({
                    userId,
                    userName,
                    userEmail,
                    name,
                    phone,
                    pincode,
                    district,
                    state,
                    bloodPlasma,
                    oxygen,
                    ambulance,
                    medicine,
                    beds,
                    icuBeds,
                    food,
                    others,
                    additionalDetails
                });
                response = {
                    ResponseData: contributor.id,
                    ResponseMessage: 'Contribution created',
                }
                return res.send(response);
            }
        } catch (error) {
            console.log(error);
            res.status(500).end();
        }
    }

    public static getContributionsByUserId = async (req: AuthenticatedRequest, res: Response) => {
        const userId = req.user._id;
        let response: ResponseObject<Contribution | Contribution[]>;

        try {
            const contributions = await ContributorPost.find({ userId: userId });
            response = {
                ResponseData: contributions,
                ResponseMessage: 'Contribution list fetched',
            }
            return res.send(response);
        } catch (error) {
            console.log(error);
            res.status(500).end();
        }
    }

    public static updateContributionById = async (req: AuthenticatedRequest, res: Response) => {
        const id = req.params.id;
        const name = req.body.name;
        const phone = req.body.phone;
        const pincode = req.body.pincode;
        const bloodPlasma = req.body.bloodPlasma;
        const oxygen = req.body.oxygen;
        const ambulance = req.body.ambulance;
        const medicine = req.body.medicine;
        const beds = req.body.beds;
        const icuBeds = req.body.icuBeds;
        const food = req.body.food;
        const others = req.body.others;
        const additionalDetails = req.body.additionalDetails;

        let response: ResponseObject<any>;

        try {
            const pincodeDetails = await GetDetailsByPincode(pincode);

            if (!pincodeDetails.ResponseData) {
                res.status(400).send({ msg: 'Invalid pincode' });
            }
            else {
                const district = pincodeDetails.ResponseData.District;
                const state = pincodeDetails.ResponseData.State;

                await ContributorPost.updateOne({ _id: id },
                    {
                        $set: {
                            name,
                            phone,
                            pincode,
                            district,
                            state,
                            bloodPlasma,
                            oxygen,
                            ambulance,
                            medicine,
                            beds,
                            icuBeds,
                            food,
                            others,
                            additionalDetails
                        }
                    });
                response = {
                    ResponseData: null,
                    ResponseMessage: 'Contribution updated'
                }
                return res.send(response);
            }
        } catch (error) {
            console.log(error);
            res.status(500).end();
        }
    }

    public static deleteContributionById = async (req: AuthenticatedRequest, res: Response) => {
        const contributionId = req.params.id;
        let response: ResponseObject<any>;

        try {
            await ContributorPost.deleteOne({ _id: contributionId });
            response = {
                ResponseData: null,
                ResponseMessage: 'Post deleted'
            }
            return res.send(response);
        } catch (error) {
            console.log(error);
            return res.status(500).end();
        }

    }
}

const PostContributionByUserId = PublicUserContributionController.postContributionByUserId;
const GetContributionsByUserId = PublicUserContributionController.getContributionsByUserId;
const UpdateContributionById = PublicUserContributionController.updateContributionById;
const DeleteContributionById = PublicUserContributionController.deleteContributionById;

export {
    PostContributionByUserId,
    GetContributionsByUserId,
    UpdateContributionById,
    DeleteContributionById,
}
