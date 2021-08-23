import { Response } from 'express';
import { ContributorPost } from '../../../models/contribution';
import { AuthenticatedRequest, Contact, Contribution, Help, ResponseObject, User } from "../../../interfaces";
import { Users } from '../../../models/users';
import { GetHelpPost } from '../../../models/getHelpPost';
import { Contacts } from '../../../models/contact';
import { UserRole } from '../../../configs/user.config';

class AdminMasterController {

    constructor() {

    }

    public static getUsers = async (req: AuthenticatedRequest, res: Response) => {
        let response: ResponseObject<User | User[]>;
        try {
            const users = await Users.find({ role: UserRole.USER });
            response = {
                ResponseData: users,
                ResponseMessage: 'Users fetched',
            }
            return res.send(response);
        } catch (error) {
            console.log(error);
            res.send(500).end();
        }
    }

    public static deleteUserById = async (req: AuthenticatedRequest, res: Response) => {
        const user = req.user;
        const userId = req.params.id;

        let response: ResponseObject<any>;

        if (user.role != UserRole.ADMIN) {
            return res.status(401).send({ msg: 'You do not have permission for this operation' });       }
        else {
            try {
                await Users.deleteOne({ _id: userId });
                response = {
                    ResponseData: null,
                    ResponseMessage: 'User deleted successfully',
                }
                return res.send(response);
            } catch (error) {
                console.log(error);
                res.send(500).end();
            }
        }
    }

    public static getContributions = async (req: AuthenticatedRequest, res: Response) => {
        let response: ResponseObject<Contribution | Contribution[]>;
        try {
            const contribution = await ContributorPost.find();
            response = {
                ResponseData: contribution,
                ResponseMessage: 'Contribution list fetched',
            }
            return res.send(response);
        } catch (error) {
            console.log(error);
            res.status(500).end();
        }
    }

    public static deleteContributionById = async (req: AuthenticatedRequest, res: Response) => {
        const user = req.user;
        const contributionId = req.params.id;

        let response: ResponseObject<any>;

        if (user.role != UserRole.ADMIN) {
            return res.status(401).send({ msg: 'You do not have permission for this operation' });;
        }
        else {
            try {
                await ContributorPost.deleteOne({ _id: contributionId });
                response = {
                    ResponseData: null,
                    ResponseMessage: 'Contribution deleted successfully',
                }
                return res.send(response);
            } catch (error) {
                console.log(error);
                res.send(500).end();
            }
        }
    }

    public static getHelp = async (req: AuthenticatedRequest, res: Response) => {
        let response: ResponseObject<Help | Help[]>;
        try {
            const help = await GetHelpPost.find();
            response = {
                ResponseData: help,
                ResponseMessage: 'Help list fetched',
            }
            return res.send(response);
        } catch (error) {
            console.log(error);
            res.status(500).end();
        }
    }

    public static deleteHelpById = async (req: AuthenticatedRequest, res: Response) => {
        const user = req.user;
        const helpId = req.params.id;

        let response: ResponseObject<any>;

        if (user.role != UserRole.ADMIN) {
            return res.status(401).send({ msg: 'You do not have permission for this operation' });;
        }
        else {
            try {
                await GetHelpPost.deleteOne({ _id: helpId });
                response = {
                    ResponseData: null,
                    ResponseMessage: 'Help deleted successfully',
                }
                return res.send(response);
            } catch (error) {
                console.log(error);
                res.send(500).end();
            }
        }
    }

    public static getContact = async (req: AuthenticatedRequest, res: Response) => {
        let response: ResponseObject<Contact | Contact[]>;
        try {
            const contacts = await Contacts.find();
            response = {
                ResponseData: contacts,
                ResponseMessage: 'Contact list fetched',
            }
            return res.send(response);
        } catch (error) {
            console.log(error);
            res.status(500).end();
        }
    }

    public static deleteContactById = async (req: AuthenticatedRequest, res: Response) => {
        const user = req.user;
        const contactId = req.params.id;

        let response: ResponseObject<any>;

        if (user.role != UserRole.ADMIN) {
            return res.status(401).send({ msg: 'You do not have permission for this operation' });;
        }
        else {
            try {
                await Contacts.deleteOne({ _id: contactId });
                response = {
                    ResponseData: null,
                    ResponseMessage: 'Contact deleted successfully',
                }
                return res.send(response);
            } catch (error) {
                console.log(error);
                res.send(500).end();
            }
        }
    }

}

const GetUsers = AdminMasterController.getUsers;
const DeleteUser = AdminMasterController.deleteUserById;
const GetContributions = AdminMasterController.getContributions;
const DeleteContributionById = AdminMasterController.deleteContributionById;
const GetHelp = AdminMasterController.getHelp;
const DeleteHelpById = AdminMasterController.deleteHelpById;
const GetContact = AdminMasterController.getContact;
const DeleteContactById = AdminMasterController.deleteContactById;

export {
    GetUsers,
    DeleteUser,
    GetContributions,
    DeleteContributionById,
    GetHelp,
    DeleteHelpById,
    GetContact,
    DeleteContactById,
}
