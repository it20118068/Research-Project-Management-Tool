import React,{useEffect, useState} from "react";
import AuthenticationService from "../services/AuthenticationService";
import RequestService from "../services/RequestService";
import StudentGroupService from "../services/StudentGroupService";
import UserService from "../services/UserService";

function StaffRequests() {

    const[requestsList, setRequestsList] = useState([]);
    const[topicRequests, setTopicRequests] = useState([]);
    const [userId, setUserId] = useState("");
    const [isVisible, setIsVisible] = useState(true);
    const [subRole, setSubRole] = useState(null);
    // const [grpId, setGroupId] = useState("");

    useEffect(()=> {
        AuthenticationService.authUser().then((res)=>{
            if(res.data.role != 1){
                window.location.href = '/Login'
            } else {
                getReceivedRequests(res.data.id);
                setUserId(res.data.id)
                setSubRole(res.data.subRole);
            }
        })
    },[])

    function getReceivedRequests(id){

        let tempReqList = [];
        let tempTopicReqList = []; 

        RequestService.getReceivedRequests(id).then((res)=>{
            
            for(const req of res.data.requests ){
                if(req.type == 1 || req.type == 2){
                    
                    tempReqList.push(req);
                }else if(req.type == 0){
                    tempTopicReqList.push(req);
                }
            }

            setRequestsList(tempReqList);
            setTopicRequests(tempTopicReqList);

        }).catch((err)=>{
            console.log(err);
        })
    }

    function updateRequest(id, status, grpId,topic){
        RequestService.updateRequest(id, status).then((res)=>{
            
        }).catch((err)=>{
            console.log(err);
        })

        if(status == "Accepted"){
            if(subRole == 0){
                StudentGroupService.setSupervisor(grpId, userId).then((res)=>{
                    console.log(res.data);
                    window.location.reload(false);
                }).catch((err)=>{
                    console.log(err);
                })
            } else if(subRole == 1){
                StudentGroupService.setCo_Supervisor(grpId, userId).then((res)=>{
                    console.log(res);
                    window.location.reload(false);
                }).catch((err)=>{
                    console.log(err);
                })
            }
        }else if(status == "Topic Accepted"){
            StudentGroupService.setTopic(grpId, topic).then((res)=>{
                console.log(res.data);
                window.location.reload(false);
            }).catch((err)=>{
                console.log(err);
            })
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
                <table className="table table-hover table-dark mb-5">
                    <thead>
                        <tr>
                            <th scope="col">Group ID</th>
                            <th scope="col">Status</th>
                            <th scope="col">Action</th>
                          
                        </tr>
                    </thead>
                    <tbody>
                        {
                            requestsList.map(
                                req =>
                                <tr key={req._id}>
                                    <td>{req.grpId}</td>        
                                    <td>{req.status}</td>  
                                    <td>
                                        <button type="button" className="btn btn-primary btn-sm" onClick={(e)=>{updateRequest(req._id, "Accepted",req.grpId, req.content)}} >Accept</button><span> </span>
                                        <button type="button" className="btn btn-danger btn-sm" onClick={(e)=>{updateRequest(req._id, "Rejected",req.grpId, req.content)}}>Reject</button>
                                    </td>
                                    
                                </tr>
                            )                                             
                        }
                    </tbody>
                </table> 
                }    


                {isVisible != true &&
                <table className="table table-hover table-dark mb-5">
                    <thead>
                        <tr>
                            <th scope="col">Group ID</th>
                            <th scope="col">Topic</th>
                            <th scope="col">Status</th>
                            <th scope="col">Action</th>
                          
                        </tr>
                    </thead>
                    <tbody>
                        {
                            topicRequests.map(
                                req =>
                                <tr key={req._id}>
                                    <td>{req.grpId}</td>        
                                    <td>{req.content}</td>  
                                    <td>{req.status}</td> 
                                    <td>
                                        <button type="button" className="btn btn-primary btn-sm" onClick={(e)=>{updateRequest(req._id, "Topic Accepted", req.grpId, req.content)}} >Accept</button><span> </span>
                                        <button type="button" className="btn btn-danger btn-sm" onClick={(e)=>{updateRequest(req._id, "Rejected", req.grpId, req.content)}}>Reject</button>
                                    </td>
                                    
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

export default StaffRequests;