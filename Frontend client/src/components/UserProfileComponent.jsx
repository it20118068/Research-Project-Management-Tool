import React,{useState, useEffect} from "react";
import AuthenticationService from "../services/AuthenticationService";
import UserService from "../services/UserService";

function UserProfileComponent() {

    const [user, setUser] = useState([]);


    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [uid, setUID] = useState("");
    const [researchArea, setResearchArea] = useState("");
    const [faculty, setFaculty] = useState("");
 


    useEffect(()=>{
        
        AuthenticationService.authUser().then((res)=>{
            if(res.data.role == null || res.data.role == undefined){
                window.location.href = '/Login'
            } else {
                setUser(res.data.user)
                setName(res.data.user.name);
                setEmail(res.data.user.email);
                setFaculty(res.data.user.faculty);
                setResearchArea(res.data.user.researchArea);
            }
        })
    },[])

    //updateUser
    function updateUser(e){
        const tempUser = {name, email, password, faculty, researchArea}
        UserService.updateUser(user._id,tempUser).then(()=>{
            alert("User updated");
            window.location.reload(false);
        }).catch((err)=>{
            alert(err);
        })
    }
    


    return (  
        <div>
            <div className="card bg-dark p-3" style={{opacity:'90%'}} >
            <h4 className="mb-4 p-4 card-header title-bg ">Welcome {user.name} !</h4>
            <div class="btn-group" >
              
            </div>
                <div className="card-body mb-5 text-light  p-5">
                    <div className="row mb-3">
                        <div className="col-3 " >
                            <h4  style={{fontWeight: 'lighter'}}>Name</h4>
                        </div>
                        <div className="col">
                            <h4  style={{fontWeight: 'lighter'}}>{user.name}</h4>
                        </div>
                    </div>   

                    <div className="row mb-3">
                        <div className="col-3">
                            <h4  style={{fontWeight: 'lighter'}}>Email</h4>
                        </div>
                        <div className="col">
                            <h4  style={{fontWeight: 'lighter'}}>{user.email}</h4>
                        </div>
                    </div>   

                    <div className="row mb-3">
                        <div className="col-3">
                            <h4  style={{fontWeight: 'lighter'}}>Faculty</h4>
                        </div>
                        <div className="col">
                            <h4  style={{fontWeight: 'lighter'}}>{user.faculty}</h4>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-3">
                            <h4  style={{fontWeight: 'lighter'}}>Research Area</h4>
                        </div>
                        <div className="col">
                            <h4  style={{fontWeight: 'lighter'}}>{user.researchArea}</h4>
                        </div>
                    </div>  
                    <div className="row mb-3">
                        <div className="col-3">
                            <h4  style={{fontWeight: 'lighter'}}>Career</h4>
                        </div>
                        <div className="col">
                            <h4  style={{fontWeight: 'lighter'}}>
                                {user.role == 0 && "Admin"}
                                {user.role == 1 && user.subRole == 0 && "Supervisor"}
                                {user.role == 1 && user.subRole == 2 && "Co-Supervisor"}
                                {user.role == 1 && user.subRole == 3 && "Panel Member"}
                                {user.role == 2 && "Student"}
                            </h4>
                        </div>
                    </div>       
                
                    <button className="btn btn-secondary btn-sm" data-toggle="modal" data-target="#editUser" style={{width:'10%'}}>Edit</button>
            </div>    
            
            </div>
            


 
            <div className="modal fade text-light" id="editUser" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content  bg-dark">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLongTitle">Edit User</h5>
                    
                </div>
                <div className="modal-body">
                    <form className="p-3">
                        

                        <div class="form-group p-3">
                            <label style={{fontWeight: "bold"}}>Name</label>
                            <input type="text" class="form-control bg-dark text-light" value={name} onChange={(e)=>setName(e.target.value)}/>
                        </div>

                        <div class="form-group p-3">
                            <label style={{fontWeight: "bold"}}>Email</label>
                            <input type="email" class="form-control bg-dark text-light" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                        </div>

                        <div class="form-group p-3">
                            <label style={{fontWeight: "bold"}}>Faculty</label>
                            <select class="form-control bg-dark text-light" value={faculty} onChange={(e)=>setFaculty(e.target.value)}>
                            <option>Select Faculty</option>
                            <option value="Faculty of Computing">Faculty of Computing</option>
                            <option value="Faculty of Engineering">Faculty of Engineering</option>
                            <option value="Faculty of Bussiness">Faculty of Bussiness</option>
                        </select>
                        </div>

                        

                        <div class="form-group p-3">
                            <label style={{fontWeight: "bold"}}>Research Area</label>
                            <input type="text" class="form-control bg-dark text-light" value={researchArea} onChange={(e)=>setResearchArea(e.target.value)}/>
                        </div>
                        <div class="form-group p-3">
                            <label style={{fontWeight: "bold"}}>Password</label>
                            <input type="password" class="form-control bg-dark text-light"  onChange={(e)=>setPassword(e.target.value)}/>
                        </div>

                        
                                       
                    </form>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-primary" onClick={updateUser}>Save changes</button>
                </div>
                </div>
            </div>
            </div>
            
        </div>
    );
}

export default UserProfileComponent;