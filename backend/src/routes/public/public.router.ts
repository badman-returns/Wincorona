import * as express from "express";
import multer from "multer";
import { LoadAuthorization, ValidateBearerToken, ValidateBasicAuth, LoadAuthorizedUser } from "../../middleware/common.middleware";
import { DeleteContributionById, GetContributionsByUserId, PostContributionByUserId, UpdateContributionById } from "./controller/public.user.contribution.controller";
import { PostHelp, PostContact, GetContribution, GetHelp } from "./public.controller";
import { ForgetPassword, LoginByEmailAndPassword, Register, ResetPassword, VerifyEmailAndActivateAccount, VerifyResetToken } from "./public.user.controller";
import { ValidateRegistrationData } from "./public.user.validator";
import { ValidateBasicDetails, ValidateContactPost, ValidateSearchDetails } from "./public.validator";
import { ValidateDeleteContributionData, ValidatePostContributionData, ValidateUpdateContributionData } from "./validators/public.contribution.validator";
import { ValidateEmail, ValidateUser } from "./validators/public.forgetAndResetPassword.validator";

class Public {
    public router: express.Router;
    private upload = multer();
    constructor() {
        this.router = express.Router();
        this.configRoutes();
    }

    public configRoutes() {

        // Registration Routes
        this.router.post('/user/register', [this.upload.none(), ...ValidateRegistrationData], Register);
        this.router.post('/verify-email/:userId/:token', VerifyEmailAndActivateAccount);

        // Login Routes
        this.router.get('/user/authentication', [...ValidateBasicAuth, ...LoadAuthorization], LoginByEmailAndPassword);

        // Forget Password Routes
        this.router.post('/user/forget-password', [ ...ValidateEmail], ForgetPassword);
        this.router.post('/password-reset/:userId/:token', [...ValidateUser], VerifyResetToken);
        this.router.post('/user/update-password', ResetPassword);

        // Contributor Routes 
        this.router.get('/user/contribution', [...ValidateBearerToken, ...LoadAuthorization, ...LoadAuthorizedUser], GetContributionsByUserId);
        this.router.post('/user/contribution', [...ValidateBearerToken, ...LoadAuthorization, ...LoadAuthorizedUser, this.upload.none(), ...ValidatePostContributionData], PostContributionByUserId);
        this.router.post('/user/contribution/:id', [...ValidateBearerToken, ...LoadAuthorization, ...LoadAuthorizedUser, this.upload.none(), ...ValidateUpdateContributionData], UpdateContributionById);
        this.router.delete('/user/contribution/:id', [...ValidateBearerToken, ...LoadAuthorization, ...LoadAuthorizedUser, this.upload.none(), ...ValidateDeleteContributionData], DeleteContributionById);

        // Search Route
        this.router.post('/search', [this.upload.none(), ...ValidateSearchDetails], GetContribution);

        // Help Route
        this.router.get('/help', GetHelp)
        this.router.post('/help', [this.upload.none(), ...ValidateBasicDetails], PostHelp);

        // Contact Route
        this.router.post('/contact', [this.upload.none(), ...ValidateContactPost], PostContact);
    }
}

const PublicRouter = new Public().router;
export { PublicRouter };
