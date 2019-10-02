import React, { Component } from 'react';
import clsx from 'clsx';
import '../../../resources/bootstrap.min.css';
import Footer from '../../header-footer/Footer';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import UserIcon from '@material-ui/icons/AccountCircle';
import { Button } from '@material-ui/core';
import RegisterIcon from '@material-ui/icons/AddCircle'
import Message from '@material-ui/icons/Message';
import { Link } from 'react-router-dom';

class Register extends Component {
  constructor(props){
    super(props)

    this.state = {
      user: JSON.parse(sessionStorage.getItem('user'))
    }
  }

  logout(){
    sessionStorage.removeItem('user')
    window.location.reload()
  }


        
  render() {
    const { user } = this.state
    console.log(user)
    return (
      <div>
         <AppBar style={{ background: '#3c3c3c' }} position="absolute">
        <Toolbar>
          <Typography component="h1" variant="h6" color="inherit" >
           Owner Dashboard
          </Typography>
          <div style={{marginLeft:'auto',marginRight:'-12px'}}>
          <Button style={{color:'white'}}>Browse Venue</Button>
          <Button style={{color:'white'}}>Manage Venues</Button>
          <Button style={{color:'white'}} onClick={() => this.logout()}>Logout</Button>
         
          <IconButton style={{color:'#ffffff'}} title="Message">
          <Message/>
          </IconButton>

        <Link to="/RegisterHall"> 
         <IconButton style={{color:'#ffffff'}} title="Register Hall">
          <RegisterIcon/>
          </IconButton>
          </Link>

        
          <IconButton color="inherit" title="Profile">
          <UserIcon/>
          </IconButton>
          </div>

        </Toolbar>
      </AppBar>
        
      <div> 
          
      <div style={{marginTop:'100px',marginBottom:'10px',marginLeft:'25%',marginRight:'25%',borderStyle:'ridge',borderWidth:'1px'}}>
        <div style={{marginLeft:'40px',marginRight:'40px',marginTop:'40px',marginBottom:'40px'}}> <h2>Edit contact information</h2><hr/>
          <div className="form-row mt-3">
          <div className="col">
           <label for="inputName">First name</label>
            <input type="text" value={user.fName} className="form-control" id="inputName" />
           </div>
          

          <div className="col">
            <label for="inputName">Last name</label>
            <input type="text" value={user.lName} className="form-control" id="inputName" />
          </div>
          </div>

          <div className="form-row mt-2">
            <div className="col">
            <label for="inputCapacity">Email</label>
            <input type="email" value={user.email} className="form-control" />
            </div>

          <div className="col">
          <label for="inputPrice">Phone</label>
            <input type="text" value={user.phone} className="form-control"  />
          </div>
          </div>

          <br />
          
          <div>
            <button type="submit" className="btn btn-success">Update</button>
          </div>

          </div></div>
        
          <div className="form-row mt-2" style={{marginLeft:'25%',marginRight:'25%',marginBottom:'40px'}}>
            <div className="col" style={{marginRight:'20px',borderStyle:'ridge',borderWidth:'1px'}}>
              <div style={{marginLeft:'40px',marginRight:'40px',marginTop:'40px',marginBottom:'40px'}}>
                <h2>Change Password</h2>
                <hr/>
                <label for="inputPassword">Current password</label>
                <input type="password" className="form-control" />

                <label for="inputPassword">New password</label>
                <input type="password" className="form-control" />
        
                <label for="inputPassword">Confirm password</label>
                <input type="password" className="form-control"/>
                <br/>
                
                <button type="submit" className="btn btn-success">Change Password</button>
         
        
           </div>
            </div>

            <div className="col" style={{borderStyle:'ridge',borderWidth:'1px'}}>
              <div style={{marginLeft:'40px',marginRight:'40px',marginTop:'40px',marginBottom:'40px'}}>
                <h2>Delete Account</h2>
                <hr/>
                <br/>
                
                <button type="submit" className="btn btn-danger">Change Password</button><br/><br/>
                <p>This action can not be undone</p>
        
           </div>
            </div>
          </div>
          
          </div>
        <Footer />
      </div>


    );
  }
}

export default Register;