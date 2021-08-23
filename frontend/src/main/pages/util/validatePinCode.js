import axios from 'axios'
const isValidPinCode = async (pinCode) =>{
    try {
        const res = await axios.get(`https://api.postalpincode.in/pincode/${pinCode}`);
        return res.data[0].Status === "Success"
    } catch (error) {
        return false
    }
}

export default isValidPinCode

