import axios from "axios";
const baseUrl = 'http://localhost:8081/api/v1/auth';

const home = () => {
    try {
        return axios.get(`${baseUrl}/home`, {});
    } catch (error) {
        console.log(error)
        return 'there was an error:' + error;
    }
}

      

const register = (email, username, password) => {
    return axios.post(`${baseUrl}/register`, { email, username, password })
}

const login = async (email, password) => {
    const res = await axios.post(`${baseUrl}/authenticate`, { email, password });
    console.log(res.data); //jwt token
    const token = res.data.token;
    if (token) {
        //save the token in local storage
        localStorage.setItem("token", token);
        localStorage.setItem("email",
            JSON.stringify({
                email, token
            })
        );
    }
    return res.data;
}
const logout = () => {
    //delete the token from localstorage:
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    //localStorage.clear()
}

export default { register, login, logout, home };