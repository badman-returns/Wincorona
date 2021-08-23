import { baseAPIURL } from '../../config/index';
import AuthenticationService from '../../services/super-admin-authentication-services';

const getAdminHelptData = async () => {
    try {
        const res = await AuthenticationService.getAuthorizationClient().get(`${baseAPIURL}/admin/help`);
        return (res.data.ResponseData);
    } catch (error) {
        console.log(error);
        return (error);
    }
}

const deleteAdminHelpDataById = async (id) => {
    try {
        const res = await AuthenticationService.getAuthorizationClient().delete(`${baseAPIURL}/admin/help/${id}`);
        return (res);
    } catch (error) {
        console.log(error);
        return (error);
    }
}

export { getAdminHelptData, deleteAdminHelpDataById };