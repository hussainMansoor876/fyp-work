import React, { Component } from 'react';
import Slide from 'react-reveal/Slide';
import '../../resources/bootstrap.min.css';
import { FacebookLoginButton, GoogleLoginButton } from "react-social-login-buttons";
import firebase from '../../config/firebase';
import swal from 'sweetalert'


class Search extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showLogin1: true,
            showSignup1: false,
            drawerOpen: false,
            headerShow: false,
            email: '',
            password: '',
            disable: false,
            obj: {
                fName: '',
                lName: '',
                email: '',
                phoneNumber: '',
                password: '',
                confirmPassword: '',
                accountType: ''
            }
        }
    }

    showSignup1() {
        window.$('#exampleModalCenter1').modal('hide');
        window.$('#signupModalCenter1').modal('show');
    }

    showLogin11() {
        window.$('#signupModalCenter1').modal('hide');
        window.$('#exampleModalCenter1').modal('show');
    }

    async login() {
        const { email, password } = this.state

        if (email == '' || password == '') {
            swal('Enter both textfield(s)')
        }
        else {
            this.setState({
                disable: true
            })
            await firebase.auth().signInWithEmailAndPassword(email, password)
                .then((res) => {
                    console.log(res)
                    firebase.database().ref('users').child(`${res.user.uid}`).once('value', (value) => {
                        console.log(value.val())
                        var val1 = value.val()
                        val1['key'] = value.key
                        sessionStorage.setItem('user', JSON.stringify(val1))
                        swal('login successfull')
                        window.$('#exampleModalCenter').modal('hide');
                    })
                    this.setState({
                        email: '',
                        password: '',
                        disable: false
                    })
                })
                .catch((error) => {
                    alert('something went wrong' + error);
                });
        }
    }

    signUp() {
        const { obj } = this.state

        if (obj.email == '' || obj.password == '' || obj.fName == '' || obj.lName == '' || obj.email == '' || obj.password == '' || obj.phoneNumber == '' || obj.confirmPassword == '' || obj.accountType == '') {
            swal('Fill All textfield(s)')
        }
        else if (obj.password !== obj.confirmPassword) {
            swal("Password did not match")
        }
        else {
            this.setState({
                disable: true
            })
            firebase.auth().createUserWithEmailAndPassword(obj.email, obj.password).then((res) => {
                obj['uid'] = res.user.uid
                delete obj.password
                delete obj.confirmPassword
                var obj1 = {
                    fName: '',
                    lName: '',
                    email: '',
                    phoneNumber: '',
                    password: '',
                    confirmPassword: '',
                    accountType: ''
                }
                console.log(res)
                firebase.database().ref('users').child(`${res.user.uid}/`).set(obj)
                sessionStorage.setItem('user', JSON.stringify(obj))
                this.setState({ obj: obj1, disable: false })
                swal('Signup successfull' + res);
                window.$('#signupModalCenter').modal('hide');
            })
                .catch((error) => {
                    alert('something went wrong' + error);
                });
        }
    }


    searchVenue(){
        const user = sessionStorage.getItem('user')
        if(user){
            console.log('Mil gya')
        }
        else{
            console.log("Nahi Mila")
            this.showLogin11()
        }
    }

    render() {
        const { obj, email, password } = this.state;

        return (
            <Slide left delay={1000}>

                <div className="countdown_wrapper" style={{ textAlign: 'center', margin: '2px 15%', marginBottom: '1%' }}>
                    <div className="countdown_bottom" >
                        <div className="countdown_item">
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-4">
                                        <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="Search by: Venue Name" style={{
                                            width: '250px',
                                            borderTopColor: '#ffffff',
                                            borderLeftColor: '#ffffff',
                                            borderRightColor: '#ffffff'

                                        }} />

                                    </div>

                                    <div className="col-md-4">
                                        <select className="form-control" id="exampleFormControlSelect1" style={{
                                            width: '250px',
                                            borderTopColor: '#ffffff',
                                            borderLeftColor: '#ffffff',
                                            borderRightColor: '#ffffff'

                                        }} >
                                            <option selected>Select Venue Type</option>
                                            <option>Hall</option>
                                            <option>banquet</option>
                                        </select>
                                    </div>

                                    <div className="col-md-4">
                                        <select className="form-control" id="exampleFormControlSelect1" style={{
                                            width: '250px',
                                            borderTopColor: '#ffffff',
                                            borderLeftColor: '#ffffff',
                                            borderRightColor: '#ffffff'
                                        }} >
                                            <option selected>Select Venue Location</option>
                                            <option>Gulshan-e-Iqbal</option>
                                            <option>Nazimabad</option>
                                            <option>North Nazimabad</option>
                                            <option>Defense</option>
                                        </select>
                                    </div>

                                </div>
                            </div>

                        </div>
                        <button type="button" className="btn btn-success" onClick={() => this.searchVenue()} >Search</button>

                    </div>


                </div>

                <div>

                    <div className="modal fade" id="exampleModalCenter1" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered" role="document">
                            <div className="modal-content">
                                <div className="modal-header">



                                    <div className="d-flex justify-content-center" style={{ width: '100%' }}>
                                        <h5 style={{ color: 'black' }} className="modal-title" id="exampleModalLongTitle">
                                            You must Login to register Venuu
                                        </h5>

                                    </div>

                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>


                                <div className="modal-body" style={{ textAlign: 'center' }}>
                                    <img style={{ width: '100px', height: '100px' }} src={require('../../resources/images/final.png')} />
                                    <br /><br />
                                    <FacebookLoginButton />
                                    <GoogleLoginButton />

                                    <br />

                                    <p style={{ color: 'black' }}>OR</p>

                                    <div className="form-group">
                                        <input type="email" className="form-control" id="email" value={email} onChange={(e) => this.setState({ email: e.target.value })} aria-describedby="emailHelp" placeholder="Enter email" />
                                    </div>

                                    <div className="form-group">
                                        <input type="password" className="form-control" id="password" placeholder="Password" value={password} onChange={(e) => this.setState({ password: e.target.value })} />
                                    </div>


                                    <div className="d-flex justify-content-end">
                                        <a style={{ color: 'blue' }}>forgot password?</a>
                                    </div>

                                </div>

                                <div className="modal-footer d-flex justify-content-center" style={{ textAlign: 'center' }}>
                                    <div>
                                        <br />
                                        <button type="button" disabled={this.state.disable} className="btn btn-success" onClick={() => this.login()}>Login</button>
                                        <br />
                                        <br />
                                        <p style={{ color: 'black' }}>Don't have an account? <a style={{ color: 'blue' }} onClick={() => { this.showSignup1() }} data-toggle="modal" >Sign up</a>
                                        </p>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>




                    <div className="modal fade" style={{ overflow: 'scroll' }} id="signupModalCenter1" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered" role="document">
                            <div className="modal-content">
                                <div className="modal-header">



                                    <div className="d-flex justify-content-center" style={{ width: '100%' }}>
                                        <h5 style={{ color: 'black' }} className="modal-title" id="exampleModalLongTitle">Signup page</h5>

                                    </div>

                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>


                                <div className="modal-body" style={{ textAlign: 'center' }}>
                                    <br /><br />
                                    <FacebookLoginButton />
                                    <GoogleLoginButton />

                                    <br />

                                    <p style={{ color: 'black' }}>OR</p>


                                    <div className="form-group">
                                        <input className="form-control" id="f_name" name="fName" value={obj.fName} onChange={(e) => this.updateData(e.target)} aria-describedby="emailHelp" placeholder="First name" />
                                    </div>

                                    <div className="form-group">
                                        <input name="lName" value={obj.lName} onChange={(e) => this.updateData(e.target)} className="form-control" id="l_name" aria-describedby="emailHelp" placeholder="Last name" />
                                    </div>

                                    <div className="form-group">
                                        <input type="email" className="form-control" name="email" value={obj.email} onChange={(e) => this.updateData(e.target)} id="email1" aria-describedby="emailHelp" placeholder="Enter email" />
                                    </div>

                                    <div className="form-group">
                                        <input type="number" name="phoneNumber" value={obj.phoneNumber} onChange={(e) => this.updateData(e.target)} className="form-control" id="phone" placeholder="Phone #" />
                                    </div>

                                    <div className="form-group">
                                        <input type="password" name="password" value={obj.password} onChange={(e) => this.updateData(e.target)} className="form-control" id="password1" placeholder="Password" />
                                    </div>

                                    <div className="form-group">
                                        <input type="password" name="confirmPassword" value={obj.confirmPassword} onChange={(e) => this.updateData(e.target)} className="form-control" id="confirm_pwd" placeholder="Confirm Password" />
                                    </div>

                                    <select className="custom-select mr-sm-2" id="inlineFormCustomSelect" name="accountType" value={obj.accountType} onChange={(e) => this.updateData(e.target)}>
                                        <option selected>Select Account Type...</option>
                                        <option value="1">User</option>
                                        <option value="2">Hall Owner</option>
                                    </select>

                                </div>

                                <div className="modal-footer d-flex justify-content-center" style={{ textAlign: 'center' }}>
                                    <br />
                                    <div>

                                        <p style={{ color: 'grey' }}>
                                            By signing up, I agree to Venue Club's Terms of Service, Privacy Policy, Guest Refund Policy, and Host Guarantee Terms.
                            </p>

                                        <br />

                                        <button disabled={this.state.disable} type="button" className="btn btn-success" onClick={() => this.signUp()}>Sign Up</button>
                                        <br />
                                        <br />
                                        <p style={{ color: 'black' }}>Already have an account? <a style={{ color: 'blue' }} onClick={() => { this.showLogin1() }} data-toggle="modal" >Login</a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>



            </Slide>
        );
    }
}

export default Search;