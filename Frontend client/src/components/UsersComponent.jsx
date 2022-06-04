// import { toUnitless } from "@mui/material/styles/cssUtils";
import React, {useState, useEffect} from "react";
import AuthenticationService from "../services/AuthenticationService";
import UserService from "../services/UserService";


function UsersComponent() {

    const [users, setUsers] = useState([]);
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState();
    const [password, setPassword] = useState("");
    const [uid, setUID] = useState("");
    const [subRole, setSubRole] = useState();

    //Users Lists
    const [students, setStudents] = useState([]);
    const [staff, setStaff] = useState([]);
    const [admins, setAdmins] = useState([]);

    const [btnRole, setButtonRole] = useState("Staff")
    

    useEffect(()=>{

        AuthenticationService.authUser().then((res)=>{
            if(res.data.role != 0){
                window.location.href = '/Login'
            }
        })

        function getUsers(){

            let tempAdmin = [];
            let tempStudents = [];
            let tempStaff = [];

            UserService.getUsers().then((res)=>{
                // setUsers(res.data);
                for(const u of res.data){
                    if(u.role == 0){
                        tempAdmin.push(u);
                    } else if(u.role == 1){
                        tempStaff.push(u)
                    } else if(u.role == 2){
                        tempStudents.push(u);
                    }
                }

                setAdmins(tempAdmin);
                setStaff(tempStaff);
                setStudents(tempStudents);

                setUsers(tempStaff);
                


            }).catch((err)=>{
                alert(err.message);
            }); 
        }

        getUsers();
    }, []);


    //updateUser
    function updateUser(e){

        const user = {id, name, email, password, role, subRole}
        UserService.updateUser(uid,user).then(()=>{
            alert("User updated");
            window.location.reload(false);
        }).catch((err)=>{
            alert(err);
        })
    }

    //deleteUser
    function deleteUser(e){
        UserService.deleteUser(uid).then(()=>{
            alert("User deleted");
            window.location.reload(false);
        }).catch((err)=>{
            alert(err);
        })
    }

    function getUser(userID){
        for(const u of users){
            if(userID == u._id){              
                setId(u.id);
                setName(u.name);
                setRole(u.role);
                setEmail(u.email);
                setPassword(u.password);
                setUID(u._id);
                setSubRole(u.subRole);
            }
        }
    }



    return (  
        <div>
            <div className="card bg-dark p-3" style={{opacity:'90%'}} >
            <h4 className="mb-4 p-4 card-header title-bg ">System Users</h4>
            <div class="btn-group" >
              
            </div>
                <div className="card-body mb-5">
                    
                <button type="button" className=" btn-secondary dropdown-toggle btn-sm" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    {btnRole}
                </button>
                <div class="dropdown-menu">
                    <a class="dropdown-item " href="#" onClick={(e)=>{setUsers(students); setButtonRole("Students")}} >Students</a>
                    <a class="dropdown-item " href="#" onClick={(e)=>{setUsers(staff); setButtonRole("Staff")}}>Staff</a>
                    <a class="dropdown-item" href="#" onClick={(e)=>{setUsers(admins); setButtonRole("Admin")}}>Admin</a>
                </div>
                    <table className="table table-hover table-dark ">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Role</th>
                                <th scope="col">SubRole</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.map(
                                    user =>
                                    <tr key={user.id}>
                                        <td>{user.id}</td>        
                                        <td>{user.name}</td>  
                                        <td>{user.email}</td>  
                                        <td>{user.role}</td>
                                        <td>{user.subRole == 0 && "Supervisor"}{user.subRole == 1 && "Co-Supervisor"}{user.subRole == 2 && "Panel Member"}</td>
                                        <td>
                                            <button className="btn btn-light btn-sm" data-toggle="modal" data-target="#editUser" onClick={(e)=>getUser(user._id)}>Edit</button>
                                            <span> </span>
                                            <button className="btn btn-outline-light btn-sm" data-toggle="modal" data-target="#deleteUser" onClick={(e)=>getUser(user._id)} >Delete</button>
                                        </td>  
                                    </tr>
                                )                                             
                            }
                        </tbody>
                    </table>
            </div>    
            
            </div>
            


            {/* Modal Edit */}
            <div className="modal fade text-light" id="editUser" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content  bg-dark">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLongTitle">Edit User</h5>
                    
                </div>
                <div className="modal-body">
                    <form className="p-3">
                        <div class="form-group p-3 ">
                            <label style={{fontWeight: "bold"}}>ID</label>
                            <input type="text" class="form-control  bg-dark text-light" value={id} onChange={(e)=>setId(e.target.value)} />
                        </div>

                        <div class="form-group p-3">
                            <label style={{fontWeight: "bold"}}>Name</label>
                            <input type="email" class="form-control bg-dark text-light" value={name} onChange={(e)=>setName(e.target.value)}/>
                        </div>

                        <div class="form-group p-3">
                            <label style={{fontWeight: "bold"}}>Email</label>
                            <input type="text" class="form-control bg-dark text-light" value={email} onChange={(e)=>setEmail(e.target.value)} />
                        </div>

                        <div class="form-group p-3">
                            <label style={{fontWeight: "bold"}}>Role</label>
                            {/* <input type="text" class="form-control"/> */}
                            <select class="form-select bg-dark text-light" aria-label="Default select example" value={role} onChange={(e)=>setRole(e.target.value)} >
                                <option value="0">Admin</option>
                                <option value="1">Staff</option>
                                <option value="2">Student</option>
                            </select>
                        </div> 
                        {role == 1 &&
                            <div class="form-group p-3">
                            <label style={{fontWeight: "bold"}}>Sub-Role</label>
                            {/* <input type="text" class="form-control"/> */}
                            <select class="form-select bg-dark text-light" aria-label="Default select example" value={subRole} onChange={(e)=>setSubRole(e.target.value)} >
                                <option value="0">Supervisor</option>
                                <option value="1">Co-Supervisor</option>
                                <option value="2">Panel  Member</option>
                            </select>
                        </div> 
                        }                 
                    </form>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-primary" onClick={updateUser}>Save changes</button>
                </div>
                </div>
            </div>
            </div>



            {/* Delete modal */}
          
            <div class="modal fade" id="deleteUser" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content bg-dark text-light">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalCenterTitle">Delete User</h5>
                </div>
                <div class="modal-body">
                    <h6>Do you want to delete ' <span style={{color: "red"}}>{name}</span> ' ?</h6>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-danger" onClick={deleteUser}>Delete</button>
                </div>
                </div>
            </div>
            </div>
                
        </div>
    );
}

export default UsersComponent;