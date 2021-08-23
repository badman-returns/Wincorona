import axios from 'axios';
import {baseAPIURL} from '../../config/index'

const contactPost = async (formData) => {
    try{
        const response = await axios.post(`${baseAPIURL}/contact`, formData);
        return (response);
    }
    catch(error){
        console.log(error);
        return [];
    }
}

export {
    contactPost,
}
