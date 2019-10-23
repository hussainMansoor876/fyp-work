import React, { Component } from 'react';
import '../../resources/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { scroller } from 'react-scroll';
import { FacebookLoginButton, GoogleLoginButton } from "react-social-login-buttons";
// import $ from 'jquery';
import firebase from '../../config/firebase';
import swal from 'sweetalert'

class Header extends Component {


    constructor() {
        super();
        this.state = {
            showLogin: true,
            showSignup: false,
            drawerOpen: false,
            headerShow: false,
            email: '',
            password: '',
            disable: false,
            user: sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')) : false,
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

    showSignup() {
        window.$('#exampleModalCenter').modal('hide');
        window.$('#signupModalCenter').modal('show');
    }

    showLogin() {
        window.$('#signupModalCenter').modal('hide');
        window.$('#exampleModalCenter').modal('show');
    }

    async login() {
        const { email, password } = this.state

        if (email === '' || password === '') {
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
                        console.log("Hello")
                        if (val1.accountType === "1") {
                            window.location.href = '/userDashboard'
                        }
                        else {
                            window.location.href = '/OwnerDashboard'
                        }
                    })
                    this.setState({
                        email: '',
                        password: '',
                        disable: false
                    })
                })
                .catch((error) => {
                    swal('something went wrong' + error);
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
                swal('Signup successfull');
                window.$('#signupModalCenter').modal('hide');
                if (obj1.accountType === "1") {
                    window.location.href = '/userDashboard'
                }
                else {
                    window.location.href = '/OwnerDashboard'
                }
            })
                .catch((error) => {
                    swal('something went wrong' + error);
                });
        }
    }

    scrollToElement = (element) => {
        scroller.scrollTo(element, {
            duration: 1500,
            delay: 100,
            smooth: true,
            offset: -150
        })
    }
    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
    }

    handleScroll = () => {
        if (window.scrollY > 0) {
            this.setState({
                headerShow: true
            })
        } else {
            this.setState({
                headerShow: false
            })
        }
    }

    updateData(e) {
        const { name, value } = e
        this.setState({
            obj: {
                ...this.state.obj,
                [name]: value
            }
        })
    }

    logout() {
        sessionStorage.removeItem('user')
        window.location.reload()
    }

    facebookLogin() {
        var provider = new firebase.auth.FacebookAuthProvider();

        firebase.auth().signInWithPopup(provider)
            .then((result) => {
                var token = result.credential.accessToken;
                var user = result.user;
                console.log(user)
                console.log(result)
                console.log(result.additionalUserInfo.isNewUser)
            })
            .catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // The email of the user's account used.
                var email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                var credential = error.credential;
                // ...
            });
    }

    googleLogin() {
        var provider = new firebase.auth.GoogleAuthProvider();

        firebase.auth().signInWithPopup(provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                var token = result.credential.accessToken;
                // The signed-in user info.
                var user = result.user;
                console.log(result)
                // ...
            })
            .catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // The email of the user's account used.
                var email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                var credential = error.credential;
                // ...
            });
    }

    render() {
        const { obj, email, password } = this.state;
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bck_black fixed-top"

                    style={{
                        backgroundColor: this.state.headerShow ? '#2f2f2f' : 'transparent',
                        boxShadow: 'none'
                    }}>

                    <img style={{ width: '90px', height: '90px' }} src={require('../../resources/images/final.png')} />
                    <div className="header_logo">
                        <div className="font_righteous header_logo_venue" style={{ color: 'white', fontSize: '30px' }}>Venue Club</div>
                        <div className="header_logo_title" style={{ color: 'white' }}>Design Your Perfect Event</div>
                    </div>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav head_ul" style={{ marginLeft: '35%' }}>
                            <li>  <button style={{ background: 'none', border: 'none', color: '#ffffff', margin: '10px' }} onClick={() => this.scrollToElement('Home')}>HOME</button> </li>
                            <li>  <button style={{ background: 'none', border: 'none', color: '#ffffff', margin: '10px' }} onClick={() => this.scrollToElement('Categories')}>CATEGORIES</button></li>
                            <li>   <button style={{ background: 'none', border: 'none', color: '#ffffff', margin: '10px' }} onClick={() => this.scrollToElement('AboutUs')}>ABOUT US</button></li>
                            <li>  <Link to="/PrivacyPolicy">   <button style={{ background: 'none', border: 'none', color: '#ffffff', margin: '10px' }}>PRIVACY POLICY</button></Link></li>
                            {!this.state.user ? <li>  <button type="button" style={{ background: 'none', border: 'none', color: '#ffffff', margin: '10px' }} data-toggle="modal" data-target="#exampleModalCenter" >LOGIN / SIGNUP</button></li> :
                                <li>  <button type="button" style={{ background: 'none', border: 'none', color: '#ffffff', margin: '10px' }} onClick={() => this.logout()} >Logout</button></li>}
                            {/* <li>  <Link to="/OwnerDashboard"> <button style={{ background: 'none', border: 'none', color: '#ffffff', margin: '10px' }}>Owner</button></Link></li>
                            <li>  <Link to="/AdminDashboard"><button style={{ background: 'none', border: 'none', color: '#ffffff', margin: '10px' }} >Admin</button></Link></li> */}

                        </ul>
                    </div>
                </nav>

                <div>

                    <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered" role="document">
                            <div className="modal-content">
                                <div className="modal-header">



                                    <div className="d-flex justify-content-center" style={{ width: '100%' }}>
                                        <h5 style={{ color: 'black' }} className="modal-title" id="exampleModalLongTitle">Welcome to login page</h5>

                                    </div>

                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>


                                <div className="modal-body" style={{ textAlign: 'center' }}>
                                    <img style={{ width: '100px', height: '100px' }} src={require('../../resources/images/final.png')} />
                                    <br /><br />
                                    <FacebookLoginButton onClick={() => this.facebookLogin()} />
                                    <GoogleLoginButton onClick={() => this.googleLogin()} />

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
                                        <p style={{ color: 'black' }}>Don't have an account? <a style={{ color: 'blue' }} onClick={() => { this.showSignup() }} data-toggle="modal" >Sign up</a>
                                        </p>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>




                    <div className="modal fade" style={{ overflow: 'scroll' }} id="signupModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
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
                                        <p style={{ color: 'black' }}>Already have an account? <a style={{ color: 'blue' }} onClick={() => { this.showLogin() }} data-toggle="modal" >Login</a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        );
    }
}

export default Header;