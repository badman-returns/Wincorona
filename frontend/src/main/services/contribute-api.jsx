import axios from 'axios';
import {baseAPIURL} from '../../config/index'
import AuthenticationService from '../../services/authentication-services'
const searchContributionPost = async (formDra) => {
    try {
        const response = await axios.post(`${baseAPIURL}/search`,formDra);
        return (response);
    }
    catch (error) {
        console.log(error);
        return [];
    }
}

const postContribution =async (formData) =>{
    try {
        const response = await AuthenticationService.getAuthorizationClient().post(`${baseAPIURL}/user/contribution`,formData);
        return response
    } catch (error) {
        console.log(error);
        return error;
    }
}
export {
    postContribution,
    searchContributionPost
}
