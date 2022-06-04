import React,{useEffect, useState} from "react";
import AuthenticationService from "../services/AuthenticationService";
import RequestService from "../services/RequestService";
import UserService from "../services/UserService";

function StudentRequest() {

    const[requestsList, setRequestsList] = useState([]);
    const[topicRequests, setTopicRequests] = useState([]);
    const [userId, setUserId] = useState("");
    const [isVisible, setIsVisible] = useState(true);
    const [usersList, setUsersList] = useState([]);

    useEffect(()=> {
        AuthenticationService.authUser().then((res)=>{
            if(res.data.role != 2){
                window.location.href = '/Login'
            } else {
                setUserId(res.data.id)
                getSentRequests(res.data.id);
            }
        })
    },[])

    function getSentRequests(id){

        let tempReqList = [];
        let tempTopicReqList = []; 

        RequestService.getSentRequests(id).then((res)=>{
            
            for(const req of res.data.requests ){
                if(req.type == 1 || req.type == 2){
                    
                    tempReqList.push(req);
                }else if(req.type == 0){
                    tempTopicReqList.push(req);
                }
            }

            setRequestsList(tempReqList);
            setTopicRequests(tempTopicReqList);
            getAllUsers();
        }).catch((err)=>{
            console.log(err);
        })
    }

    function getAllUsers(){
        UserService.getUsers().then((res)=>{
            setUsersList(res.data);
        }).catch((err)=>{
            console.log(err);
        })
    }

    function nameFinder(id){
        for(const u of usersList){
            if(id == u._id ){
                return u.name;
            }
        }
    }


    return (  
        <div>
            <div className="card bg-dark p-3" style={{opacity:'90%'}} >
            <h4 className="mb-4 p-4 card-header title-bg ">My Requests</h4>

       

        <div className="card-body">
        <ul class="nav nav-tabs justify-content-center">
                <li class="nav-item">
                    <button class="nav-link text-light" onClick={(e)=>{setIsVisible(true)}} >Supervisors / Co-Supervisors</button>
                </li>
                <li class="nav-item">
                    <button class="nav-link text-light" onClick={(e)=>{setIsVisible(false)}} >Topics</button>
                </li>

            </ul>
                <div className="col m-auto">

                {isVisible == true &&
                <table className="table table-hover table-dark mb-5 ">
                    <thead>
                        <tr>
                            <th scope="col">Group ID</th>
                            <th scope="col">Requested to</th>
                            <th scope="col">Status</th>
                          
                        </tr>
                    </thead>
                    <tbody>
                        {
                            requestsList.map(
                                req =>
                                <tr key={req._id}>
                                    <td>{req.grpId}</td>        
                                    <td>{nameFinder(req.receiverId)}</td>  
                                    <td>{req.status}</td>  

                                    
                                </tr>
                            )                                             
                        }
                    </tbody>
                </table> 
                }    


                {isVisible != true &&
                <table className="table table-hover table-dark mb-5  ">
                    <thead>
                        <tr>
                            <th scope="col">Group ID</th>
                            <th scope="col">Topic</th>
                            <th scope="col">Requested to</th>
                            <th scope="col">Status</th>
                          
                        </tr>
                    </thead>
                    <tbody>
                        {
                            topicRequests.map(
                                req =>
                                <tr key={req._id}>
                                    <td>{req.grpId}</td>        
                                    <td>{req.content}</td>  
                                    <td>{nameFinder(req.receiverId)}</td>  
                                    <td>{req.status}</td> 
                                    
                                </tr>
                            )                                             
                        }
                    </tbody>
                </table> 
                }      
                </div>
                
            </div>
        </div>
           
    </div>
    );
}

export default StudentRequest;