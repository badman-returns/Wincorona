import { Encryption } from "../../utility";
import { UserRole } from '../../configs/user.config';
import { Response } from "express";
import { AuthenticatedRequest, ResponseObject, User } from "../../interfaces";
import { Users } from "../../models/users";

class PublicUserController {
    constructor() {

    }

    public static registerUser = async (req: AuthenticatedRequest, res: Response) => {
        const name = req.body.name;
        const email = req.body.email;
        const phone = req.body.phone;
        const password = Encryption.encryptPassword(req.body.password);
        const role = UserRole.USER;
        let response: ResponseObject<any>;
        try {
            const user = await Users.create({
                name,
                email,
                phone,
                role,
                password,
            });
            response = {
                ResponseData: user._id,
                ResponseMessage: 'User created',
            }
            return res.send(response);
        }
        catch (error) {
            console.log(error);
            return res.status(500).end();
        }
    }

    public static loginByEmailAndPassword = async (req: AuthenticatedRequest, res: Response) => {
        try {
            const buff = Buffer.from(req.token, 'base64');
            const credential = buff.toString().split(':');
            if (credential.length !== 2) {
                return res.status(400).send();
            }
            const email = credential[0];
            const password = credential[1];
            if (!email || !password) {
                return res.status(400).send();
            }

            const confirmUser: User = await Users.findOne({ email: email });
            let user: any = confirmUser;
            if (user) {
                user = confirmUser.toJSON();
            }
            if (!user) {
                res.status(403).send({
                    Message: `You don't have account with us`,
                    Data: null,
                });
            } else if (user && !Encryption.decryptPassword(password, user.password)) {
                res.status(401).send({
                    Message: `Incorrect password!`,
                    Data: null,
                });
            } else {
                delete user.password;
                delete user.createdOn;
                let token: any;
                try {
                    token = await Encryption.createToken(user);
                } catch (err) {
                    console.log(err);
                    return res.status(500).end();
                }
                res.setHeader('Access-Control-Expose-Headers', 'Authorization');
                res.setHeader('Authorization', token);
                res.send(user);
            }
        } catch (error) {
            console.log(error)
            return res.status(500).end();
        }
    }
}

const Register = PublicUserController.registerUser;
const LoginByEmailAndPassword = PublicUserController.loginByEmailAndPassword;

export {
    Register,
    LoginByEmailAndPassword,
}

// git status 