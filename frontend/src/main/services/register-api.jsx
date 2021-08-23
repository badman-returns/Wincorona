import axios from 'axios';
import { baseAPIURL } from '../../config/index'


const RegisterUser = async (formData) => {
    try {
        const response = await axios.post(`${baseAPIURL}/user/register`, formData);
        return (response);
    } catch (error) {
        console.log(error);
        return (error)
    }
}

export {
    RegisterUser,
}
