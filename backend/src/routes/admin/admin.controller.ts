import { Encryption } from "../../utility";
import { Response } from "express";
import { AuthenticatedRequest, User } from "../../interfaces";
import { Users } from "../../models/users";
import { UserRole } from '../../configs/user.config';


class AdminController {
    constructor() {

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
            
            if (!user || user.role != UserRole.ADMIN) {
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
                delete user.phone;
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

const LoginByEmailAndPassword = AdminController.loginByEmailAndPassword;

export {
    LoginByEmailAndPassword,
}