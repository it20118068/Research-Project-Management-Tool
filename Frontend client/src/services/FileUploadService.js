import axios from "axios";

const BASE_URL = "https://projectmanagement-tool.herokuapp.com/file/";

class FileUploadService {


    uploadFile(formData){
        return axios({
            method: "post",
            url: BASE_URL+"uploadFile",
            data: formData,
            headers: { "Content-Type": "multipart/form-data" }      
        });
    }


    getSentSubmissions(id){
        return axios.get(BASE_URL+id);
    }

    getRecievedSubmissions(id){
        return axios.get(BASE_URL+ "group/"+id);
    }

    updateSubmission(id, sub){
        return axios.put(BASE_URL + "update/"+id,sub);
    }
}
 
export default new FileUploadService();