import React from 'react';
import HeaderComponent from './components/HeaderComponent';
import { BrowserRouter as Router, Route, Routes  } from 'react-router-dom';
import LoginComponent from './components/LoginComponent';
import FooterComponent from './components/FooterComponent';
import UsersComponent from './components/UsersComponent';
import RegisterComponent from './components/RegisterComponent';
import FileUploadComponent from './components/FileUploadComponent';
import CreateStudentGroupComponent from './components/CreateStudentGroupComponent';
import HomeComponent from './components/HomeComponent';
import RequestSupervisor from './components/RequestSupervisor';
import UserProfileComponent from './components/UserProfileComponent';
import AllocatePanel from './components/AllocatePanel';
import RequestTopic from './components/RequestTopic';
import StudentRequest from './components/StudentRequest';
import StaffRequests from './components/StaffRequests';
import MySubmissions from './components/MySubmissions';
import StudentSubmissions from './components/StudentSubmissions';
import ChatRoom from './components/ChatRoom'; 

import './styles/custom-styles.css';


export default class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (

  
  
            <div className='body-img overflow-auto'>
      
              <HeaderComponent></HeaderComponent>
              
      
              <div className='container mt-2'> 
              
              <Router>
              
              <Routes>
                  {/* common */}
                  <Route exact path='/userProfile' element={<UserProfileComponent/>}/>
                  <Route exact path='/' element={<HomeComponent/>}/>
      
                  <Route exact path='/login' element={<LoginComponent/>}/>

                  
                  <Route exact path='/register' element={<RegisterComponent/>}/>
                  <Route exact path='/file' element={<FileUploadComponent/>}/>
                  <Route exact path='/chat' element={<ChatRoom/>}/>
      
                  {/* Student */}
                  <Route exact path='/CreateStudentGroups' element={<CreateStudentGroupComponent/>}/>
                  
                  <Route exact path='/request-supervisor' element={<RequestSupervisor/>}/>
                  <Route exact path='/request/topic' element={<RequestTopic/>}/>
                  <Route exact path='/request/my' element={<StudentRequest/>}/>
                  <Route exact path='/file/submissions/my' element={<MySubmissions/>}/>
      
      
                  {/* Supervisor */}
                  <Route exact path='/request/staff' element={<StaffRequests/>}/>
                  <Route exact path='/file/submissions/students' element={<StudentSubmissions/>}/>
      
                  {/* Admin */}
                  <Route exact path='/allocate/panel' element={<AllocatePanel/>}/>
                  <Route exact path='/Users' element={<UsersComponent/>}/>
      
      
      
              </Routes>
             
              </Router>
              </div>
      
              
              
              <FooterComponent></FooterComponent>
            </div>
            
      
        );
    }
}
