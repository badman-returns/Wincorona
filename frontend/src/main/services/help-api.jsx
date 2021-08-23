import axios from 'axios';
import { baseAPIURL } from '../../config/index'

const getHelpPost = async () => {
    try {
        const response = await axios.get(`${baseAPIURL}/help`);
        return (response.data.ResponseData || []);
    }
    catch (error) {
        console.log(error);
        return [];
    }
}

const postHelp = async (formData) => {
    try {
        const response = await axios.post(`${baseAPIURL}/help`, formData);
        return (response);
    } catch (error) {
        console.log(error);
        return (error)
    }
}

export {
    getHelpPost,
    postHelp,
}
