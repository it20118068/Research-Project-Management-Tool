import React from "react";

function AdminNav() {
    return (  
        <div>
            <ul className="navbar-nav mr-auto">
            <li className="nav-item">
                <a className="nav-link" href="/Users" style={{fontSize: "17px"}}>Users</a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="/allocate/panel" style={{fontSize: "17px"}} >Allocate Panel Members</a>
            </li>
            </ul>
        </div>

    );
}

export default AdminNav;