import React, { Component } from 'react';
import '../../resources/bootstrap.min.css';
import { Link } from 'react-router-dom';
import firebase from '../../config/firebase';
import swal from 'sweetalert';
import { FacebookLoginButton, GoogleLoginButton } from "react-social-login-buttons";


class Header extends Component {
    constructor() {
        super()
        this.state = {
            user: sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')) : false,
            email: '',
            DropdownIsVisible: false,
            password: '',
            phoneNumber: '',
            disable: false,
            obj: {
                fName: '',
                lName: '',
                email: '',
                phoneNumber: '',
                password: '',
                confirmPassword: '',
                accountType: '',
                paymentType: '',
                numberType: ''
            },
            obj2: {
                fName: '',
                lName: '',
                email: '',
                phoneNumber: '',
                accountType: '',
                paymentType: '',
                numberType: ''
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

    logout() {
        sessionStorage.removeItem('user')
        window.location.href = '/'
    }

    async login() {
        const { email, password } = this.state

        if (email === '' || password === '') {
            swal('Enter both textfield(s)')
        }
        else if (email != email || password != password) {
            swal('Please Enter correct Email or Password')
        }
        else {
            this.setState({
                disable: false
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
                    swal('something went wrong' + error)

                });
        }
    }

    signUp() {
        const { obj } = this.state

        if (obj.email == '' || obj.password == '' || obj.fName == '' || obj.lName == '' || obj.email == '' || obj.password == '' || obj.phoneNumber == '' || obj.confirmPassword == '' || obj.accountType == '') {
            swal('Fill All textfield(s)')
        }
        else if (obj.accountType == 2) {
            if (obj.paymentType == '' || obj.numberType == '') {
                swal('Fill')
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
                        accountType: '',
                        paymentType: '',
                        numberType: ''
                    }
                    console.log(res)
                    console.log("***")
                    firebase.database().ref('users').child(`${res.user.uid}/`).set(obj)
                        .then(() => {
                            sessionStorage.setItem('user', JSON.stringify(obj))
                            this.setState({ obj: obj1, disable: false })
                            swal('Signup successfull');
                            window.$('#signupModalCenter').modal('hide');
                            window.location.href = '/OwnerDashboard'
                        })
                })
                    .catch((error) => {
                        swal('something went wrong' + error);
                    });
            }
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
                    accountType: '',
                    paymentType: '',
                    numberType: ''
                }
                console.log(res)
                console.log("***")
                firebase.database().ref('users').child(`${res.user.uid}/`).set(obj)
                    .then(() => {
                        sessionStorage.setItem('user', JSON.stringify(obj))
                        this.setState({ obj: obj1, disable: false })
                        swal('Signup successfull');
                        window.$('#signupModalCenter').modal('hide');
                        window.location.href = '/userDashboard'
                    })

            })
                .catch((error) => {
                    swal('something went wrong' + error);
                });
        }
    }

    updateLogin() {
        const { obj2 } = this.state

        if (obj2.email == '' || obj2.email == '' || obj2.phoneNumber == '' || obj2.accountType == '') {
            swal('Fill All textfield(s)')
        }
        else if (obj2.accountType == 2) {
            if (obj2.paymentType == '' || obj2.numberType == '') {
                swal('Fill')
            }
            else {
                this.setState({
                    disable: true
                })
                var obj1 = {
                    fName: '',
                    lName: '',
                    email: '',
                    phoneNumber: '',
                    accountType: '',
                    paymentType: '',
                    numberType: ''
                }
                firebase.database().ref('users').child(`${obj2.uid}/`).set(obj2)
                    .then(() => {
                        sessionStorage.setItem('user', JSON.stringify(obj2))
                        this.setState({ obj2: obj1, disable: false })
                        swal('Signup successfull');
                        window.$('#AdditionalInfo').modal('hide');
                        window.location.href = '/OwnerDashboard'
                    })
            }
        }
        else {
            this.setState({
                disable: true
            })
            var obj1 = {
                fName: '',
                lName: '',
                email: '',
                phoneNumber: '',
                accountType: '',
                paymentType: '',
                numberType: ''
            }
            firebase.database().ref('users').child(`${obj2.uid}/`).set(obj2)
                .then(() => {
                    sessionStorage.setItem('user', JSON.stringify(obj2))
                    this.setState({ obj2: obj1, disable: false })
                    swal('Signup successfull');
                    window.$('#AdditionalInfo').modal('hide');
                    window.location.href = '/userDashboard'
                })
        }
    }

    updateData(e) {
        const { name, value } = e;
        if (value == 2 && name === "accountType") {
            this.setState({ DropdownIsVisible: true })
        }
        else if (value == 1 && name === "accountType") {
            this.setState({ DropdownIsVisible: false })
        }

        this.setState({
            obj: {
                ...this.state.obj,
                [name]: value
            },

        })
    }

    updateData1(e) {
        const { name, value } = e;
        if (value == 2 && name === "accountType") {
            this.setState({ DropdownIsVisible: true })
        }
        else if (value == 1 && name === "accountType") {
            this.setState({ DropdownIsVisible: false })
        }

        this.setState({
            obj2: {
                ...this.state.obj2,
                [name]: value
            },

        })
    }

    facebookLogin() {
        var provider = new firebase.auth.FacebookAuthProvider();

        firebase.auth().signInWithPopup(provider)
            .then((result) => {
                if (result.additionalUserInfo.isNewUser) {
                    this.setState({
                        obj2: {
                            fName: result.additionalUserInfo.profile.first_name,
                            lName: result.additionalUserInfo.profile.last_name,
                            email: result.user.email,
                            uid: result.user.uid,
                        },
                        email: result.user.email,
                        phoneNumber: result.user.phoneNumber
                    }, () => {
                        window.$('#exampleModalCenter').modal('hide');
                        window.$('#AdditionalInfo').modal('show');
                    })
                }
                else {
                    firebase.database().ref('users').child(`${result.user.uid}`).once('value', (value) => {
                        var val1 = value.val()
                        val1['key'] = value.key
                        sessionStorage.setItem('user', JSON.stringify(val1))
                        swal('login successfull')
                        window.$('#exampleModalCenter').modal('hide');
                        if (val1.accountType === "1") {
                            window.location.href = '/userDashboard'
                        }
                        else {
                            window.location.href = '/OwnerDashboard'
                        }
                    })
                }
            })
            .catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                swal(errorMessage)
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
                if (result.additionalUserInfo.isNewUser) {
                    this.setState({
                        obj2: {
                            fName: result.additionalUserInfo.profile.given_name,
                            lName: result.additionalUserInfo.profile.family_name,
                            email: result.user.email,
                            uid: result.user.uid,
                        },
                        email: result.user.email,
                        phoneNumber: result.user.phoneNumber
                    }, () => {
                        window.$('#exampleModalCenter').modal('hide');
                        window.$('#AdditionalInfo').modal('show');
                    })
                }
                else {
                    firebase.database().ref('users').child(`${result.user.uid}`).once('value', (value) => {
                        var val1 = value.val()
                        val1['key'] = value.key
                        sessionStorage.setItem('user', JSON.stringify(val1))
                        swal('login successfull')
                        window.$('#exampleModalCenter').modal('hide');
                        if (val1.accountType === "1") {
                            window.location.href = '/userDashboard'
                        }
                        else {
                            window.location.href = '/OwnerDashboard'
                        }
                    })
                }
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                swal(errorMessage)
                var email = error.email;
                var credential = error.credential;
            });
    }

    render() {
        const { obj, email, password, disable, user, obj2, DropdownIsVisible, phoneNumber } = this.state
        return (

            <div>
                <nav className="navbar navbar-expand-lg navbar-light bck_black fixed-top">

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
                            <li>   <button onClick={() => window.location.href = "/PrivacyPolicy"} style={{ background: 'none', border: 'none', color: '#ffffff', margin: '10px' }}>PRIVACY POLICY</button></li>
                            {user ? <li>  <button style={{ background: 'none', border: 'none', color: '#ffffff', margin: '10px' }}>{user.fName}</button></li> : <li>  <button style={{ background: 'none', border: 'none', color: '#ffffff', margin: '10px' }} data-toggle="modal" data-target="#exampleModalCenter">LOGIN / SIGNUP</button></li>}
                            {user && <li>  <button style={{ background: 'none', border: 'none', color: '#ffffff', margin: '10px' }} onClick={() => this.logout()} >Logout</button></li>}
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
                                    <br /><br />
                                    {DropdownIsVisible &&
                                        <div>
                                            <select className="custom-select mr-sm-2" id="inlineFormCustomSelect" name="paymentType" value={obj.paymentType} onChange={(e) => this.updateData(e.target)}>
                                                <option selected>Select Payment Method...</option>
                                                <option value="3">Jazz Cash</option>
                                                <option value="4">Easy Paisa</option>
                                            </select><br /><br />
                                            <div className="form-group">
                                                <input type="number" name="numberType" value={obj.numberType} onChange={(e) => this.updateData(e.target)} className="form-control" id="numberType1" placeholder="Enter Your Account phone number (0300xxxxxxx)" />
                                            </div>
                                        </div>
                                    }
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