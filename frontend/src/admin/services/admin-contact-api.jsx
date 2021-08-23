import { baseAPIURL } from '../../config/index';
import AuthenticationService from '../../services/super-admin-authentication-services';

const getAdminContactData = async () => {
    try {
        const res = await AuthenticationService.getAuthorizationClient().get(`${baseAPIURL}/admin/contact`);
        return (res.data.ResponseData);
    } catch (error) {
        console.log(error);
        return (error);
    }
}

const deleteAdminContactDataById = async (id) => {
    try {
        const res = await AuthenticationService.getAuthorizationClient().delete(`${baseAPIURL}/admin/contact/${id}`);
        return (res);
    } catch (error) {
        console.log(error);
        return (error);
    }
}

export { getAdminContactData, deleteAdminContactDataById };