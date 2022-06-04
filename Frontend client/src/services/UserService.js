import axios from "axios";

const USER_BASE_URL = "https://projectmanagement-tool.herokuapp.com/user/";

class UserService {
    getUsers(){
        return axios.get(USER_BASE_URL);
    }

    getSupervisors(){
        return axios.get(USER_BASE_URL + 'supervisors');
    }

    getCoSupervisors() {
        return axios.get(USER_BASE_URL + 'co-supervisors');
    }
    getPanel() {
        return axios.get(USER_BASE_URL + 'panel');
    }

    registerUser(user){
        return axios.post(USER_BASE_URL + 'addUser', user);
    }

    authUser(user){
        return axios.post(USER_BASE_URL + 'login', user);
    }


    updateUser(uid,user){
        return axios.put(USER_BASE_URL + 'updateUser/'+uid, user);
    }


    deleteUser(uid){
        return axios.delete(USER_BASE_URL + 'deleteUser/'+ uid);
    }
}
 
export default new UserService();