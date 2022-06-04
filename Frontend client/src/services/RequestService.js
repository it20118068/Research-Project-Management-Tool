import axios from "axios";

const REQUEST_BASE_URL = "https://projectmanagement-tool.herokuapp.com/request";

class RequestService {


    createRequest(request){
        return axios.post(REQUEST_BASE_URL + "/create", request);
    }

    getSentRequests(id){
        return axios.get(REQUEST_BASE_URL + "/sent/" +id);
    }

    getReceivedRequests(id){
        return axios.get(REQUEST_BASE_URL + "/receive/" +id);
    }

    updateRequest(id, status, subRole, grpId, userId){
        return axios.put(REQUEST_BASE_URL + "/update/"+ id, {status:status})
    }

   
}
 
export default new RequestService();