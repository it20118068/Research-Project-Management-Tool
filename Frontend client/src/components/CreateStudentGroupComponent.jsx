import React,{ useState } from "react";
import StudentGroupService from "../services/StudentGroupService";

function CreateStudentGroupComponent() {

    const [leaderName, setLeaderName] = useState("");
    const [leaderId, setLeaderId] = useState("");
    const [member1_Name, setMember1_Name] = useState("");
    const [member1_Id, setMember1_Id] = useState("");
    const [member2_Name, setMember2_Name] = useState("");
    const [member2_Id, setMember2_Id] = useState("");
    const [member3_Name, setMember3_Name] = useState("");
    const [member3_Id, setMember3_Id] = useState("");

    const [alertClass, setAlertClass] = useState("");
    const [alertMessage, setAlertMessage] = useState("");


    function submitGroup(){
        const leader = {leaderName, leaderId}
        const member_1 = {member1_Name, member1_Id}
        const member_2 = {member2_Name, member2_Id}
        const member_3 = {member3_Name, member3_Id}

        const group = {leader, member_1, member_2, member_3}

        StudentGroupService.registerGroup(group).then(()=>{
            setAlertClass("alert alert-success mt-2");
            setAlertMessage("Group has created successfully!!!");
        }).catch((err)=>{
            setAlertClass("alert alert-danger mt-2");
            setAlertMessage("Failed to create the group :(");
        })
    }

    return (  
        <div>
            <div className="card bg-dark p-3 mt-3" style={{opacity:'90%'}} >
            <h4 className="mb-4 p-4 card-header title-bg ">Create Student Group</h4>
                <div className="card-body">
                    <form className="text-light">
                        <div className="row">
                            <div className="form-group col">
                                <label>Member 1 Name (Leader)</label>
                                <input type="text" className="form-control bg-dark text-light" placeholder="Enter name" onChange={(e)=>setLeaderName(e.target.value)} />
                            </div>
                            <div className="form-group col">
                                <label>ID</label>
                                <input type="text" className="form-control bg-dark text-light mb-2"  placeholder="Enter student ID" onChange={(e)=>setLeaderId(e.target.value)} />
                            </div>
                        </div>

                        <div className="row mt-3">
                            <div className="form-group col">
                                <label>Member 2 Name</label>
                                <input type="text" className="form-control bg-dark text-light mb-2"  placeholder="Enter name" onChange={(e)=>setMember1_Name(e.target.value)} />
                            </div>
                            <div className="form-group col">
                                <label>ID</label>
                                <input type="text" className="form-control bg-dark text-light mb-2"  placeholder="Enter student ID" onChange={(e)=>setMember1_Id(e.target.value)} />
                            </div>
                        </div>

                        <div className="row mt-3">
                            <div className="form-group col">
                                <label>Member 3 Name</label>
                                <input type="text" className="form-control bg-dark text-light mb-2"  placeholder="Enter name" onChange={(e)=>setMember2_Name(e.target.value)} />
                            </div>
                            <div className="form-group col" >
                                <label>ID</label>
                                <input type="text" className="form-control bg-dark text-light mb-2"  placeholder="Enter student ID" onChange={(e)=>setMember2_Id(e.target.value)} />
                            </div>
                        </div>

                        <div className="row mt-3">
                            <div className="form-group col">
                                <label>Member 4 Name</label>
                                <input type="text" className="form-control bg-dark text-light mb-2" placeholder="Enter name" onChange={(e)=>setMember3_Name(e.target.value)} />
                            </div>
                            <div className="form-group col">
                                <label>ID</label>
                                <input type="text" className="form-control bg-dark text-light mb-2" placeholder="Enter student ID" onChange={(e)=>setMember3_Id(e.target.value)} />
                            </div>
                        </div>
                        
                        <div class={alertClass} role="alert">
                            {alertMessage}
                        </div>
                       
                        <button type="button" class="btn btn-secondary mt-4" onClick={submitGroup}  >Create Group</button>
                    </form>
                    
                </div>
                
            </div>
        </div>
    );
}

export default CreateStudentGroupComponent;