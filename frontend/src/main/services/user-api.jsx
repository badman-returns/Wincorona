import { baseAPIURL } from '../../config/index'
import AuthenticationService from '../../services/authentication-services'

const getUserContribution = async () => {
    try {
        const response = await AuthenticationService.getAuthorizationClient().get(`${baseAPIURL}/user/contribution`);
        return (response || []);
    }
    catch (error) {
        console.log(error);
        return [];
    }
}

const updateContributionPostById = async (formData,id) => {
    try {
        const response = await AuthenticationService.getAuthorizationClient().post(`${baseAPIURL}/user/contribution/${id}`, formData);
        return response;
    } catch (error) {
        console.log(error);
        return error
    }
}
const deleteContributionPostById = async (id) => {
    try {
        const response = await AuthenticationService.getAuthorizationClient().delete(`${baseAPIURL}/user/contribution/${id}`);
        return response;
    } catch (error) {
        console.log(error);
        return error
    }
}

export {
    getUserContribution,
    updateContributionPostById,
    deleteContributionPostById
}
