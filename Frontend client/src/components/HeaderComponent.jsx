import React,{useEffect, useState} from "react";
import AuthenticationService from "../services/AuthenticationService";
import AdminNav from "./AdminNav";



function HeaderComponent() {
        // const navigate = useNavigate();
        const [userName, setUserName] = useState(null)
        const [role, setRole] = useState(0)
        // const [isLogged, setIsLogged] = useState("d-none");

         useEffect(()=>{
            // const name = localStorage.getItem('name');

            AuthenticationService.authUser().then((res)=>{
                console.log(res);
                setUserName(res.data.name);
                setRole(res.data.role);
            }).catch((err)=>{
                alert(err);
            })
         },[])


        function logout(){
            localStorage.clear();
            window.location.href = '/Login'
        }
 
        return (
            <div className=' custom-header p-4'>
     
                <nav className="navbar navbar-expand-lg navbar-dark p-3  container ">
                   
                    <h2 className='p-3'>
                        <a className="navbar-brand" href="#">Research Project Management</a>
                    </h2>
                    
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    {userName != null &&
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <a className="nav-link" href="/" style={{fontSize: "17px"}}>Home</a>
                            </li>
                            {role==0 && <AdminNav/>}
                            
                            
                            
                            {/* Supervisor/ Co-supervisor */}
                            {role==1 &&
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item">
                                    <a className="nav-link" href="/request/staff" style={{fontSize: "17px"}}>Request</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/file/submissions/students" style={{fontSize: "17px"}}>Submissions</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/chat" style={{fontSize: "17px"}}>Chat</a>
                                </li>
                            </ul>
                            }

                            {role==2 &&
                            <ul className="navbar-nav mr-auto"> 
                                <li className="nav-item">
                                    <a className="nav-link" href="/file/submissions/my" style={{fontSize: "17px"}}>Submissions</a>
                                </li>   
                                <li className="nav-item">
                                    <a className="nav-link" href="/chat" style={{fontSize: "17px"}}>Chat</a>
                                </li>                    
                                <li class="nav-item dropdown">
                                    <a class="nav-link dropdown-toggle" href="#"  style={{fontSize: "17px"}} id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Requests
                                    </a>
                                    <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <a class="dropdown-item" href="/request-supervisor">Supervisor/Co-Supervisor</a>
                                        <a class="dropdown-item" href="/request/topic">Topics</a>
                                        <a class="dropdown-item" href="/request/my">My Requests</a>
                                    </div>
                                </li>
                            </ul>  
                            }


                        </ul>  
                    </div>
                    }

                    {userName != null &&
                    <div>                  
                        <div class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle  text-light" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            {userName}
                            </a>
                            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                                <a class="dropdown-item" href="/userProfile">View Profile</a>
                                <a class="dropdown-item" href="#" onClick={logout}>Log Out</a>
                            </div>
                        </div>
                    </div>
                     }
                    {userName == null &&
                        <div>
                            <ul className="navbar-nav mr-auto">   
                                <li className="nav-item active">
                                    <a className="nav-link" href="/login">Login</a>
                                </li>
                                <li className="nav-item active">
                                    <a className="nav-link" href="/register">Sign Up</a>
                                </li>
                            </ul>
                        </div>
                     }
                </nav>
                    
            </div>
        );
    
}

export default HeaderComponent;