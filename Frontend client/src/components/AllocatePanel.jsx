import React, {useState, useEffect} from "react";
import AuthenticationService from "../services/AuthenticationService";
import StudentGroupService from "../services/StudentGroupService";
import UserService from "../services/UserService";
function AllocatePanel() {


    const [groupList, setGroupList] = useState([]);
    const [panleMembers, setPanelMembers] = useState([]);
    const [selecetdGroup, setSelectedGroup] = useState([]);
    const [member1, setMember1]= useState([]);
    const [member2, setMember2]= useState([]);
    const [member3, setMember3]= useState([]);


    useEffect(()=>{
        AuthenticationService.authUser().then((res)=>{
            if(res.data.role != 0){
                window.location.href = '/Login'
            } else {
                getGroups();
                getPanel();
            }
        })
    }, []);



    function getGroups(){
        StudentGroupService.getGroups().then((res)=>{
            setGroupList(res.data);
        }).catch((err)=>{
            console.log(err);
        })
    }

    function getPanel(){
        UserService.getPanel().then((res)=>{
            setPanelMembers(res.data);
        }).catch((err)=>{
            console.log(err);
        })
    }

    function nameFinder(id){
        for(const p of panleMembers){
            if(id == p._id){
                return p.name;
            }
        }
    }

    function addPanel(){
        let panelMembers = {member1, member2, member3}

        console.log(panelMembers)

        StudentGroupService.addPanel(selecetdGroup._id, panelMembers).then((res)=>{
            window.location.reload(false);
        }).catch((err)=>{
            alert(err);
        })
    }



    
    return (  
        <div>
            <div className="card bg-dark p-3" style={{opacity:'90%'}}>
            <h4 className="mb-4 p-4 card-header title-bg ">Allocate Panel Members</h4>
          
                <div className="card-body mb-5">
                    <table className="table table-hover table-dark ">
                        <thead>
                            <tr>
                                <th scope="col">Group ID</th>
                                <th scope="col">Members</th>
                                <th scope="col">Panel</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                      

                            {
                                groupList.map(
                                    group =>
                                    <tr key={group._id}>
                                        <td>{group.grpId}</td>
                                        <td>
                                            {group.leader.leaderId}<br/>
                                            {group.member_1.member1_Id}<br/>
                                            {group.member_2.member2_Id}<br/>
                                            {group.member_3.member3_Id}
                                        </td>
                                        <td> 
                                            {group.panelMembers != null && nameFinder(group.panelMembers.member1)} <br/>
                                            {group.panelMembers != null && nameFinder(group.panelMembers.member2)} <br/>
                                            {group.panelMembers != null && nameFinder(group.panelMembers.member3)}
                                            
                                        </td>
                                        <td>
                                        <button className="btn btn-primary btn-sm" data-toggle="modal" data-target="#addPanel" onClick={(e)=>setSelectedGroup(group)} >Add Panel</button>
                                        </td>
                                    </tr>
                                )
                            }
                            
                        </tbody>
                        
                    </table>
            </div>    
            
            </div>


            {/* Modal Edit */}
            <div className="modal fade" id="addPanel" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content bg-dark text-light">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLongTitle">Add Panel</h5>
                    
                </div>
                <div className="modal-body">
                    <form className="p-3">
                        <div class="form-group mb-2">
                            <label style={{fontWeight: "bold"}}>Member 1</label>
                            <select class="form-select bg-dark text-light" aria-label="Default select example" onChange={(e)=>setMember1(e.target.value)}>
                            <option>Select Member 1</option>
                                {
                                    panleMembers.map(
                                        p_member => <option value={p_member._id} >{p_member.name}</option>

                                    )
                                }     
                            </select>
                        </div> 
                        <div class="form-group mb-2">
                            <label style={{fontWeight: "bold"}}>Member 2</label>
                            <select class="form-select bg-dark text-light" aria-label="Default select example" onChange={(e)=>setMember2(e.target.value)}>
                            <option>Select Member 2</option>
                                {
                                    panleMembers.map(
                                        p_member => <option value={p_member._id} >{p_member.name}</option>

                                    )
                                }     
                            </select>
                        </div> 
                        <div class="form-group mb-2">
                            <label style={{fontWeight: "bold"}}>Member 3</label>
                            <select class="form-select bg-dark text-light" aria-label="Default select example" onChange={(e)=>setMember3(e.target.value)}>
                            <option>Select Member 3</option>
                                {
                                    panleMembers.map(
                                        p_member => <option value={p_member._id} >{p_member.name}</option>

                                    )
                                }     
                            </select>
                        </div> 
                        

         
                    </form>
                </div>
                
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-primary" onClick={addPanel}>Add Panel</button>
                </div>
                </div>
            </div>
            </div>
            


         


                
        </div>
    );
}

export default AllocatePanel;