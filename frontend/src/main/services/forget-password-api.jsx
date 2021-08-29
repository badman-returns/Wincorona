import axios from 'axios';
import { baseAPIURL } from '../../config/index'

const forgetPassword = async (email) => {
    try {
        const response = await axios.post(`${baseAPIURL}/user/forget-password`, { email: email });
        return (response);
    }
    catch (error) {
        console.log(error);
        return [];
    }
}

const verifyResetToken = async (data) => {
    try {
        const response = await axios.post(`${baseAPIURL}/password-reset/${data.userId}/${data.token}`);
        return (response);
    }
    catch (error) {
        console.log(error);
        return [];
    }
}

const resetPassword = async (data) => {
    try {
        const response = await axios.post(`${baseAPIURL}/user/update-password`, data);
        return (response);

    } catch (error) {
        console.log(error);
        return [];
    }
}

export {
    forgetPassword,
    verifyResetToken,
    resetPassword,
}
