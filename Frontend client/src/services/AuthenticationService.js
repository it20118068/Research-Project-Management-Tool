import axios from "axios";

const USER_BASE_URL = "https://projectmanagement-tool.herokuapp.com/user/auth";

class AuthenticationService {
    authUser(){
        const token = localStorage.getItem('token');
        return axios({
            method: "post",
            url: USER_BASE_URL+"/",
            headers: { "x-access-token": token }      
        });
    }
}
 
export default new AuthenticationService();