import * as express from "express";
import multer from "multer";
import { LoadAuthorization, LoadAuthorizedUser, ValidateBasicAuth, ValidateBearerToken } from "../../middleware/common.middleware";
import { LoginByEmailAndPassword } from "./admin.controller";
import { DeleteContributionById, DeleteContactById, DeleteHelpById, DeleteUser, GetContact, GetContributions, GetHelp, GetUsers } from "./controllers/admin.master.controller";

class AdminRouting {
    public router: express.Router;
    private upload = multer();
    constructor() {
        this.router = express.Router();
        this.configRoutes();
    }

    public configRoutes() {

        // Login Routes
        this.router.get('/authentication', [...ValidateBasicAuth, ...LoadAuthorization], LoginByEmailAndPassword);

        // User Routes
        this.router.get('/users', [...ValidateBearerToken, ...LoadAuthorization, ...LoadAuthorizedUser], GetUsers);
        this.router.delete('/user/:id', [...ValidateBearerToken, ...LoadAuthorization, ...LoadAuthorizedUser], DeleteUser);

        // Contribution Routes
        this.router.get('/contribution', [...ValidateBearerToken, ...LoadAuthorization, ...LoadAuthorizedUser], GetContributions);
        this.router.delete('/contribution/:id', [...ValidateBearerToken, ...LoadAuthorization, ...LoadAuthorizedUser], DeleteContributionById)

        // Help Routes
        this.router.get('/help', [...ValidateBearerToken, ...LoadAuthorization, ...LoadAuthorizedUser], GetHelp);
        this.router.delete('/help/:id', [...ValidateBearerToken, ...LoadAuthorization, ...LoadAuthorizedUser], DeleteHelpById);

        // Contact Routes
        this.router.get('/contact', [...ValidateBearerToken, ...LoadAuthorization, ...LoadAuthorizedUser], GetContact);
        this.router.delete('/contact/:id', [...ValidateBearerToken, ...LoadAuthorization, ...LoadAuthorizedUser], DeleteContactById);


    }
}

const AdminRouter = new AdminRouting().router;

export {
    AdminRouter,
}