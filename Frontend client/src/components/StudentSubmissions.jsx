import React, {useState, useEffect} from "react";
import AuthenticationService from "../services/AuthenticationService";
import FileUploadService from "../services/FileUploadService";
import StudentGroupService from "../services/StudentGroupService";
import UserService from "../services/UserService";


function StudentSubmissions() {
    const [submissionList, setSubmissionsList] = useState([]);
    const [userId, setUserId] = useState("");
    const [usersList, setUsersList] = useState([]);
    const [selectedSumission, setSelectedSubmission] = useState([]);
    const [grpList, setGroupList] = useState([]);
    const [feedback, setFeedback] = useState("");


    useEffect(()=>{
        AuthenticationService.authUser().then((res)=>{
            if(res.data.role != 1){
                window.location.href = '/Login'
            } else {
                setUserId(res.data.id)
                getAllUsers();
                getRecievedRequests(res.data.id);
            }
        })
    },[])


    function getSentSubmissions(id){
        FileUploadService.getSentSubmissions(id).then((res)=>{
            setSubmissionsList(res.data.SubmittedFiles);
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

    async function getRecievedRequests(id){
        let groups = await new Promise(function(resolve, reject) {
            StudentGroupService.getGroupsById(id).then((res)=>{
                resolve(res.data);
            })  
          });

        let temp = [];  
        for(const grp of groups){

            await  FileUploadService.getRecievedSubmissions(grp).then((res)=>{
                for(const s of res.data.SubmittedFiles){
                    temp.push(s)
                }                
            })
        }  

        setSubmissionsList(temp)

    }

    function addFeedback(){
        let sub = {feedback, evaluatedBy:userId}
        FileUploadService.updateSubmission(selectedSumission._id, sub).then((res)=>{
            window.location.reload(false);
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
            <h4 className="mb-4 p-4 card-header title-bg ">Submisions</h4>




                <div className="card-body">
                    
                <div className="col m-auto">
   
                    <table className="table table-hover table-dark mb-5">
                        <thead>
                            <tr>
                                <th scope="col">GroupID</th>
                                <th scope="col">Submission</th>
                                <th scope="col">Feedback</th>
                                <th scope="col">Evaluated By</th>
                                <th scope="col"></th>
                              
                            </tr>
                        </thead>
                        <tbody>
                            {
                                submissionList.map(
                                    s =>
                                    <tr key={s._id}>       
                                        <td>{s.grpId}</td>  
                                        <td>{s.title}</td>  
                                        <td>{s.feedback}</td> 
                                        <td>{nameFinder(s.evaluatedBy)}</td> 
                                        <td>
                                            <a href={s.fileData} className="btn btn-secondary btn-sm" >View</a><span> </span>
                                            <button className="btn btn-primary btn-sm" data-toggle="modal" data-target="#evaluate" onClick={(e)=>{setSelectedSubmission(s)}} >Evaluate</button>               
                                        </td>
                                    </tr>
                                )                                             
                            }
                        </tbody>
                    </table> 


                      

                    </div>
                </div>
                
            </div>


            {/* Modal Evaluate */}
            <div className="modal fade" id="evaluate" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content bg-dark text-light">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLongTitle">Evaluate Submission</h5>
                    </div>
                    <div className="modal-body">
                        <form className="p-3">
                            <div class="form-group p-3">
                                <label className="mb-2">Feedback</label>
                                <textarea rows="5" type="text" class="form-control bg-dark text-light" onChange={(e)=>setFeedback(e.target.value)} />
                            </div>             
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary" onClick={addFeedback} >Save changes</button>
                    </div>
                    </div>
                </div>
            </div>
            
        </div>
    );
}

export default StudentSubmissions;