import { baseAPIURL } from '../../config/index';
import AuthenticationService from '../../services/super-admin-authentication-services';

const getAdminContributiontData = async () => {
    try {
        const res = await AuthenticationService.getAuthorizationClient().get(`${baseAPIURL}/admin/contribution`);
        return (res.data.ResponseData);
    } catch (error) {
        console.log(error);
        return (error);
    }
}

const deleteContributionPostById = async (id) => {
    try {
        const response = await AuthenticationService.getAuthorizationClient().delete(`${baseAPIURL}/admin/contribution/${id}`);
        return response;
    } catch (error) {
        console.log(error);
        return error
    }
}


export { getAdminContributiontData,deleteContributionPostById };