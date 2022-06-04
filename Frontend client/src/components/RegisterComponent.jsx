import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserService from "../services/UserService";

function RegisterComponent() {
  const navigate = useNavigate();

  const [role, setRole] = useState();
  const [faculty, setFaculty] = useState();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [id, setId] = useState();
  const [researchArea, setResearchArea] = useState();
  const [password, setPassword] = useState();
  

  function registerUser() {
    const user = { id, name, email, password, role, faculty, researchArea };
    UserService.registerUser(user)
      .then(() => {
        alert("User added");
        navigate("/login");
        // window.location.reload(false);
      })
      .catch((err) => {
        alert(err);
      });
  }

  return (
          <div>
            <form className='col-lg-6 m-auto card p-5 bg-dark text-white mt-4' style={{opacity:'90%'}} >
                <h3 className='text-center mb-3 display-6'>Register</h3>
                <div class="form-group">
                  <select class="form-control mb-3 bg-dark text-light bg-dark text-light" value={role} onChange={(e)=>setRole(e.target.value)} >
                    <option>Select Account Type</option>
                    <option value="1">Staff</option>
                    <option value="2">Student</option>
                  </select>
                </div>

                <div class="form-group">
                  <label>Faculty</label>
                  <select class="form-control mb-3 bg-dark text-light" value={faculty} onChange={(e)=>setFaculty(e.target.value)}>
                    <option>Select Faculty</option>
                    <option value="Faculty of Computing">Faculty of Computing</option>
                    <option value="Faculty of Engineering">Faculty of Engineering</option>
                    <option value="Faculty of Bussiness">Faculty of Bussiness</option>
                  </select>
                </div>

                <div class="form-group">
                  <label>Name</label>
                  <input type="text" class="form-control mb-3 bg-dark text-light" onChange={(e) => setName(e.target.value)} />
                </div>

                <div class="form-group">
                  <label>ID</label>
                  <input type="text" class="form-control mb-3 bg-dark text-light" onChange={(e) => setId(e.target.value)} />
                </div>

                <div class="form-group">
                  <label>Email</label>
                  <input type="text" class="form-control mb-3 bg-dark text-light" onChange={(e) => setEmail(e.target.value)}/>
                </div>

                <div class="form-group">
                  <label>Research Interesed Areas</label>
                  <input type="text" class="form-control mb-3 bg-dark text-light" onChange={(e) => setResearchArea(e.target.value)} />
                </div>

                <div class="form-group">
                  <label>Password</label>
                  <input type="password" class="form-control bg-dark text-light" onChange={(e) => setPassword(e.target.value)} />
                </div>

                <div className="text-center mt-4">
                  <button type="button" className="btn btn-secondary" onClick={registerUser}> Register</button>
                </div>
            </form>

        </div>





      // <div className="card bg-dark p-3" style={{opacity:'90%'}}  >
      //   <div className="card-body mb-5 p-4">
      //     <div className="row justify-content-center">
      //       <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center">
      //         <img
      //           src="https://static.vecteezy.com/ti/vetor-gratis/p1/3689228-online-registration-or-sign-up-login-for-account-on-smartphone-app-user-interface-with-secure-password-mobile-application-for-ui-web-banner-access-cartoon-people-ilustracaoial-vetor.jpg"
      //           className="img-fluid"
      //           alt="Sample image"
      //         />
      //       </div>

      //       <div className="col-md-10 col-lg-6 col-xl-5 ">
      //         <h3 className="text-center text-light">Sign Up</h3>

      //         <form className="mx-1 mx-md-4 text-light  p-4">

                // <div class="form-group">
                //   <select class="form-control mb-3 bg-dark text-light bg-dark text-light" value={role} onChange={(e)=>setRole(e.target.value)} >
                //     <option>Select Account Type</option>
                //     <option value="1">Staff</option>
                //     <option value="2">Student</option>
                //   </select>
                // </div>

                // <div class="form-group">
                //   <label>Faculty</label>
                //   <select class="form-control mb-2 bg-dark text-light" value={faculty} onChange={(e)=>setFaculty(e.target.value)}>
                //     <option>Select Faculty</option>
                //     <option value="Faculty of Computing">Faculty of Computing</option>
                //     <option value="Faculty of Engineering">Faculty of Engineering</option>
                //     <option value="aculty of Bussiness">Faculty of Bussiness</option>
                //   </select>
                // </div>

                // <div class="form-group">
                //   <label>Name</label>
                //   <input type="text" class="form-control mb-2 bg-dark text-light" onChange={(e) => setName(e.target.value)} />
                // </div>

                // <div class="form-group">
                //   <label>ID</label>
                //   <input type="text" class="form-control mb-2 bg-dark text-light" onChange={(e) => setId(e.target.value)} />
                // </div>

                // <div class="form-group">
                //   <label>Email</label>
                //   <input type="text" class="form-control mb-2 bg-dark text-light" onChange={(e) => setEmail(e.target.value)}/>
                // </div>

                // <div class="form-group">
                //   <label>Research Interesed Areas</label>
                //   <input type="text" class="form-control mb-2 bg-dark text-light" onChange={(e) => setResearchArea(e.target.value)} />
                // </div>

                // <div class="form-group">
                //   <label>Password</label>
                //   <input type="password" class="form-control mb-2 bg-dark text-light" onChange={(e) => setPassword(e.target.value)} />
                // </div>

                // <div className="text-center mt-4">
                //   <button type="button" className="btn btn-secondary" onClick={registerUser}> Register</button>
                // </div>

      //         </form>
      //       </div>
      //     </div>
      //   </div>
      // </div>
  );
}

export default RegisterComponent;
