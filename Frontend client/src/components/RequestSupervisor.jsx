import React,{useState, useEffect} from "react";
import AuthenticationService from "../services/AuthenticationService";
import RequestService from "../services/RequestService";
import UserService from "../services/UserService";

function RequestSupervisor() {

    const [supervisors, setSupervisors] = useState([]);
    const [co_superviors, setCo_Supervisors] = useState([]);
    const [tableController, setTableController] = useState(0);
    const [selectedUserName, setSelectedUserName] = useState("");
    const [selectedUserId, setSelectedUserId] = useState("");
    const [grpId, setGroupId] = useState("");
    const [selectedUser, setSelectedUser] = useState([]);
    const [userId, setUserId] = useState("");
    const [type, setType] = useState();


    const [alertClass, setAlertClass] = useState("");
    const [alertMessage, setAlertMessage] = useState("");



    useEffect(()=>{  
        
        AuthenticationService.authUser().then((res)=>{
            if(res.data.role != 2){
                window.location.href = '/Login'
            } else {
                setUserId(res.data.id)
                getSupervisors();
                getCoSupervisors();
            }
        })
        
        

        

    }, []);

    function getSupervisors(){
        UserService.getSupervisors().then((res)=>{
            setSupervisors(res.data);         
        }).catch((err)=>{
            alert(err.message);
        }); 
    }

    function getCoSupervisors(){
        UserService.getCoSupervisors().then((res)=>{
            setCo_Supervisors(res.data);
        }).catch((err)=>{
            alert(err.message);
        })
    }


    function getSelectedUser(userID){
        for(const u of supervisors){
            if(userID == u._id){              
                setSelectedUserId(u._id);
                setSelectedUserName(u.name);
            }
        }
    }


    function createRequest(){
        let request = {type, grpId, senderId:userId, receiverId:selectedUser._id}
        
        
        RequestService.createRequest(request).then(()=>{
            setAlertClass("alert alert-success mt-2");
            setAlertMessage("Request has successfully sent");
        }).catch((err)=>{
            setAlertClass("alert alert-danger mt-2");
            setAlertMessage("Failed to send the request :(");
        })
    }


    return (  
        <div>
            <div className="card bg-dark p-3" style={{opacity:'90%'}} >
            <h4 className="mb-4 p-4 card-header title-bg ">Request Supervisor/Co-Supervisor</h4>

            <ul class="nav nav-tabs justify-content-center ">
                <li class="nav-item">
                    <a class="nav-link  text-light" aria-current="page" href="#" onClick={(e)=> setTableController(0)}>Supervisors</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link  text-light" href="#" onClick={(e)=> setTableController(1)} >Co-Supervisors</a>
                </li>
                {/* <li class="nav-item">
                    <a class="nav-link  text-light" href="#" onClick={(e)=> setTableController(2)} >My Requests</a>
                </li> */}
            </ul>

            <div className="card-body">
                    <div className="col m-auto">
                    {tableController == 0 &&
                    <table className="table table-hover table-dark ">
                        <thead>
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Interest Areas</th>
                                <th scope="col">Action</th>
                              
                            </tr>
                        </thead>
                        <tbody>
                            {
                                supervisors.map(
                                    supervisor =>
                                    <tr key={supervisor._id}>       
                                        <td>{supervisor.name}</td>  
                                        <td>{supervisor.researchArea}</td>  
                                        <td>
                                            <button className="btn btn-primary btn-sm" data-toggle="modal" data-target="#requestModal" onClick={(e)=>{setSelectedUser(supervisor); setType(1)}} >Request</button>
                                        </td> 
                                    </tr>
                                )                                             
                            }
                        </tbody>
                    </table> }  


                    {tableController == 1 &&
                    <table className="table table-hover table-dark ">
                        <thead>
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Interest Areas</th>
                                <th scope="col">Action</th>
                              
                            </tr>
                        </thead>
                        <tbody>
                            {
                                co_superviors.map(
                                    co_supervior =>
                                    <tr key={co_supervior._id}>       
                                        <td>{co_supervior.name}</td>  
                                        <td>{co_supervior.researchArea}</td>  
                                        <td>
                                            <button className="btn btn-primary btn-sm" data-toggle="modal" data-target="#requestModal" onClick={(e)=>{setSelectedUser(co_supervior); setType(2)}}>Request</button>
                                        </td> 
                                    </tr>
                                )                                             
                            }
                        </tbody>
                    </table> }       

                    </div>
                    
                </div>
            </div>


            {/* Request Modal  */}
            <div class="modal fade" id="requestModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLongTitle">Request Supervisor/ Co-Supervisor</h5>
                </div>
                <div class="modal-body">
                    <form>
                        <div class="form-group p-3">
                            <label style={{fontWeight: "bold"}}>Supervisor/ Co-Supervisor Name </label>
                            <input type="text" class="form-control" value={selectedUser.name} readOnly />
                        </div>
                        <div class="form-group p-3">
                            <label style={{fontWeight: "bold"}}>Group ID </label>
                            <input type="text" class="form-control" onChange={(e)=>setGroupId(e.target.value)} />
                        </div>
                        {/* <div class="form-group p-3">
                            <div className="row">
                            <div className="col">
                            <label style={{fontWeight: "bold"}}>Leader Name</label>
                            <input type="text" class="form-control" />
                            </div>
                            <div className="col">
                            <label style={{fontWeight: "bold"}}>Leader ID</label>
                            <input type="text" class="form-control" />
                            </div>
                            </div>
                           
                        </div> */}
                    </form>
                    <div class={alertClass} role="alert">
                            {alertMessage}
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" onClick={createRequest}>Send Request</button>
                </div>
                </div>
            </div>
            </div>
            
        </div>
    );
}

export default RequestSupervisor;