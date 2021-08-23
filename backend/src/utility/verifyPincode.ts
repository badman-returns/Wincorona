import axios from "axios";
import { NextFunction, Response } from "express";

const dotenv = require('dotenv');
dotenv.config();

export class VerifyPincode {

    constructor() { }

    public static getDetailsByPincode = async (pincode: number) => {
        let response: any
        let res: Response
        try {
            const details: any = await axios.get(`https://api.postalpincode.in/pincode/${pincode}`);
            if (details.data[0].Status == 'Success') {
                response = {
                    ResponseData: details.data[0].PostOffice[0],
                    ResponseMessage: 'Pincode details Fetched'
                }
                return response;
            }
            else {
                response = {
                    ResponseData: false,
                    ResponseMessage: 'Invalid Pincode'
                }
                return response;
            }
        }
        catch (error) {
            console.log(error);
            return res.status(500).end();
        }
    }

}

const GetDetailsByPincode = VerifyPincode.getDetailsByPincode;
export {
    GetDetailsByPincode,
}