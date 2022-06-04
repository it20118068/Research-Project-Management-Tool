import axios from "axios";

const BASE_URL = "https://projectmanagement-tool.herokuapp.com/student-groups/";

class StudentGroupService {
    getGroups() {
        return axios.get(BASE_URL);
    }

    registerGroup(group) {
        return axios.post(BASE_URL + 'register', group);
    }

    addPanel(id, panelMembers) {
        return axios.put(BASE_URL + 'panel/' + id, panelMembers);
    }

    getGroupsById(id) {
        return axios.get(BASE_URL + 'staff/' + id);
    }

    setSupervisor(grpId, supervisor) {
        return axios.put(BASE_URL + 'supervisor/' + grpId, { supervisor: supervisor });
    }

    setCo_Supervisor(grpId, co_supervisor) {
        return axios.put(BASE_URL + 'co-supervisor/' + grpId, { co_supervisor: co_supervisor });
    }

    setTopic(grpId, topic) {
        return axios.put(BASE_URL + 'topic/' + grpId, { researchTopic: topic });
    }

    getStudentGroupById(id) {
        return axios.get(BASE_URL + "student/" + id);
    }

    getGroupListById(id) {
        return axios.get(BASE_URL + "staff/" + id);
    }

    // authUser(user){
    //     return axios.post(USER_BASE_URL + 'login', user);
    // }


    // updateUser(uid,user){
    //     return axios.put(USER_BASE_URL + 'updateUser/'+uid, user);
    // }


    // deleteUser(uid){
    //     return axios.delete(USER_BASE_URL + 'deleteUser/'+ uid);
    // }
}

export default new StudentGroupService();