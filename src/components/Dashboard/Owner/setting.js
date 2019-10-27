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
import firebase from '../../../config/firebase'
import swal from 'sweetalert';

class Register extends Component {
  constructor(props) {
    super(props)

    this.state = {
      user: JSON.parse(sessionStorage.getItem('user')),
      disable: false,
      disable1: true,
      newPassword: '',
      confirm: ''
    }
  }

  componentWillMount() {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        console.log(user.phoneNumber)
        // User is signed in.
      } else {
        // No user is signed in.
      }
    });
  }

  logout() {
    sessionStorage.removeItem('user')
    window.location.reload()
  }

  updateData(e) {
    const { name, value } = e
    this.setState({
      user: {
        ...this.state.user,
        [name]: value
      }
    })
  }

  updateServer() {
    const { user } = this.state
    firebase.database().ref('users').child(`${user['key']}`).update(user)
  }

  changePassword() {
    const { newPassword, confirm } = this.state
    if (newPassword !== confirm) {
      swal({
        title: "Password did not match",
        icon: "warning",
        dangerMode: true,
      })
      return
    }
    this.setState({ disable1: true })
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        user.updatePassword(newPassword)
          .then(() => {
            this.setState({
              newPassword: '',
              confirm: ''
            })
            swal({
              title: "Password Updated Successfully",
              icon: "success"
            })
          }).catch((error) => {
            this.setState({
              newPassword: '',
              confirm: ''
            })
            swal({
              title: error,
              icon: "warning",
              dangerMode: true,
            })
          });
      }
    });
  }



  render() {
    const { user, newPassword, confirm } = this.state
    return (
      <div>
        <AppBar style={{ background: '#3c3c3c', marginTop: -100 }} position="absolute">
          <Toolbar>
            <Typography component="h1" variant="h6" color="inherit" >
              Owner Dashboard
          </Typography>
            <div style={{ marginLeft: 'auto', marginRight: '-12px' }}>
              <Button style={{ color: 'white' }}>Browse Venue</Button>
              <Button style={{ color: 'white' }}>Manage Venues</Button>
              <Button style={{ color: 'white' }} onClick={() => this.logout()}>Logout</Button>

              <IconButton style={{ color: '#ffffff' }} title="Message">
                <Message />
              </IconButton>

              <Link to="/RegisterHall">
                <IconButton style={{ color: '#ffffff' }} title="Register Hall">
                  <RegisterIcon />
                </IconButton>
              </Link>


              <IconButton color="inherit" title="Profile">
                <UserIcon />
              </IconButton>
            </div>

          </Toolbar>
        </AppBar>

        <div>

          <div style={{ marginTop: '100px', marginBottom: '10px', marginLeft: '25%', marginRight: '25%', borderStyle: 'ridge', borderWidth: '1px' }}>
            <div style={{ marginLeft: '40px', marginRight: '40px', marginTop: '40px', marginBottom: '40px' }}> <h2>Edit contact information</h2><hr />
              <div className="form-row mt-3">
                <div className="col">
                  <label for="inputName">First name</label>
                  <input type="text" name="fName" onChange={(e) => this.updateData(e.target)} value={user.fName} className="form-control" id="inputName" />
                </div>


                <div className="col">
                  <label for="inputName">Last name</label>
                  <input type="text" name="lName" onChange={(e) => this.updateData(e.target)} value={user.lName} className="form-control" id="inputName" />
                </div>
              </div>

              <div className="form-row mt-2">
                <div className="col">
                  <label for="inputCapacity">Email</label>
                  <input type="email" name="email" value={user.email} onChange={(e) => this.updateData(e.target)} className="form-control" />
                </div>

                <div className="col">
                  <label for="inputPrice">Phone</label>
                  <input type="number" name="phoneNumber" onChange={(e) => this.updateData(e.target)} value={user.phoneNumber} className="form-control" />
                </div>
              </div>

              <br />

              <div>
                <button type="submit" className="btn btn-success" disabled={this.state.disable} onClick={() => this.updateServer()} >Update</button>
              </div>

            </div></div>

          <div className="form-row mt-2" style={{ marginLeft: '25%', marginRight: '25%', marginBottom: '40px' }}>
            <div className="col" style={{ marginRight: '20px', borderStyle: 'ridge', borderWidth: '1px' }}>
              <div style={{ marginLeft: '40px', marginRight: '40px', marginTop: '40px', marginBottom: '40px' }}>
                <h2>Change Password</h2>
                <hr />
                {/* <label for="inputPassword">Current password</label>
                <input type="password" className="form-control" /> */}

                <label for="inputPassword">New password</label>
                <input type="password" className="form-control" name="newPassword" value={newPassword} onChange={(e) => this.setState({ newPassword: e.target.value }, () => {
                  if (this.state.newPassword.length && this.state.confirm.length) {
                    this.setState({ disable1: false })
                  }
                  else {
                    this.setState({ disable1: true })
                  }
                })} />

                <label for="inputPassword">Confirm password</label>
                <input type="password" className="form-control" name="confirm" value={confirm} onChange={(e) => this.setState({ confirm: e.target.value }, () => {
                  if (this.state.newPassword.length && this.state.confirm.length) {
                    this.setState({ disable1: false })
                  }
                  else {
                    this.setState({ disable1: true })
                  }
                })} />
                <br />

                <button type="submit" className="btn btn-success" disabled={this.state.disable1} onClick={() => this.changePassword()}>Change Password</button>


              </div>
            </div>

            <div className="col" style={{ borderStyle: 'ridge', borderWidth: '1px' }}>
              <div style={{ marginLeft: '40px', marginRight: '40px', marginTop: '40px', marginBottom: '40px' }}>
                <h2>Delete Account</h2>
                <hr />
                <br />

                <button type="submit" className="btn btn-danger">Change Password</button><br /><br />
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