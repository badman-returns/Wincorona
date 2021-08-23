import { baseAPIURL } from '../../config/index';
import AuthenticationService from '../../services/super-admin-authentication-services';

const getAdminUserData = async () => {
    try {
        const res = await AuthenticationService.getAuthorizationClient().get(`${baseAPIURL}/admin/users`);
        return (res.data.ResponseData);
    } catch (error) {
        console.log(error);
        return (error);
    }
}

const deleteUserById = async (id) => {
    try {
        const response = await AuthenticationService.getAuthorizationClient().delete(`${baseAPIURL}/admin/user/${id}`);
        return response;
    } catch (error) {
        console.log(error);
        return error
    }
}

export { getAdminUserData,deleteUserById };