import React, {useState, useEffect} from "react";
import AuthenticationService from "../services/AuthenticationService";
import FileUploadService from "../services/FileUploadService";
import UserService from "../services/UserService";

function MySubmissions() {

    const [submissionList, setSubmissionsList] = useState([]);
    const [userId, setUserId] = useState("");
    const [usersList, setUsersList] = useState([]);

    useEffect(()=>{
        AuthenticationService.authUser().then((res)=>{
            if(res.data.role != 2){
                window.location.href = '/Login'
            } else {
                setUserId(res.data.id)
                getSentSubmissions(res.data.id);
                getAllUsers();
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

    function nameFinder(id){
        for(const u of usersList){
            if(id == u._id ){
                return u.name;
            }
        }
    }

    return (  
        <div>
            <div className="card bg-dark p-3 text-light" style={{opacity:'90%'}} >
            <h4 className="mb-4 p-4 card-header title-bg ">My Submissions</h4>



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
                                        <td><a href={s.fileData} className="btn btn-primary btn-sm" >View</a></td>
                                    </tr>
                                )                                             
                            }
                        </tbody>
                    </table> 


                      

                    </div>
                </div>
                
            </div>
        </div>
    );
}

export default MySubmissions;