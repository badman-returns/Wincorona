import axios from 'axios';
import {baseAPIURL} from '../../config/index'

const forgetPassword = async (email) => {
    try {
        const response = await axios.post(`${baseAPIURL}/user/forget-password`,{email: email});
        return (response);
    }
    catch (error) {
        console.log(error);
        return [];
    }
}


export {
    forgetPassword,
}
