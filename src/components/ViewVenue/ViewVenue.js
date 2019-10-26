import React, { Component } from 'react';
import clsx from 'clsx';
import '../../resources/bootstrap.min.css'
import Footer from '../header-footer/Footer';
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
import 'antd/dist/antd.css';
import { Element } from 'react-scroll';
import Carrousel from '../featured/Carrousel'
import Search from '../featured/Search';
import 'antd/dist/antd.css';
import firebase from '../../config/firebase'
import { Card, Skeleton, Table, Button as Btn, Form, Modal, Input, DatePicker } from 'antd';
import swal from 'sweetalert';
import { FacebookLoginButton, GoogleLoginButton } from "react-social-login-buttons";
import './style.css'

const { Meta } = Card

const { Column } = Table;



class ViewVenue extends Component {
    constructor(props) {
        super(props)

        this.state = {
            view: sessionStorage.getItem('view') ? JSON.parse(sessionStorage.getItem('view')) : false,
            userData: '',
            visible: false,
            confirmLoading: false,
            allHallData: [],
            selectedHall: '',
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
            },
            images: [],
            currentIndex: 0,
            translateValue: 0,
            data: [],
            showDescription: false
        }
    }

    async componentWillMount() {
        const { data, view } = this.state
        await firebase.database().ref('users').child(`${view.userUid}`).once('value', (value) => {
            var i = 1
            var val1 = value.val()
            val1['key'] = value.key
            for (var key in view) {
                if (key === "picture" || key === "userUid" || key === "key" || key === "description") {
                    continue
                }
                else {
                    data.push({
                        key: i,
                        name: key,
                        value: view[key]
                    })
                    i++;
                }
            }
            for (var key1 in val1) {
                if (key1 === "email") {
                    data.push({
                        key: i,
                        name: "email",
                        value: val1[key1]
                    })
                    i++;
                }
                else if (key1 === "fName") {
                    data.push({
                        key: i,
                        name: "name",
                        value: val1[key1]
                    })
                    i++;
                }
                else if (key1 === "phoneNumber") {
                    data.push({
                        key: i,
                        name: "number",
                        value: val1[key1]
                    })
                    i++;
                }
            }
            this.setState({ userData: val1, data })
        })
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

    handleSubmit = (e) => {
        const { selectedHall, user } = this.state
        e.preventDefault();
        this.props.form.validateFields((err, fieldsValue) => {
            if (err) {
                return;
            }
            fieldsValue['date-time-picker'] = fieldsValue['date-time-picker'].format('YYYY-MM-DD HH:mm:ss')
            fieldsValue['hallData'] = selectedHall
            fieldsValue['customerUid'] = user.uid
            fieldsValue['advance'] = selectedHall.price / 10
            fieldsValue['status'] = 'pending'

            firebase.database().ref('users').child(`${user.uid}/sentBooking/`).push(fieldsValue)
                .then((snap) => {
                    this.setState({ visible: false })
                    swal({
                        title: "successfully!",
                        text: "Send the Booking Request",
                        icon: "success",
                        // button: "OK",
                    });
                    this.props.form.resetFields()
                    firebase.database().ref('users').child(`${selectedHall.userUid}/recBooking/${snap.key}`).set(fieldsValue)
                })
        })
    }

    logout() {
        sessionStorage.clear('user')
        sessionStorage.clear('search')
        window.location.href = '/'
    }

    venueBooking(v) {
        const { user } = this.state
        if (user) {
            this.setState({ visible: true, selectedHall: v }, () => {
                this.props.form.setFieldsValue({
                    hallName: v.hallName,
                    name: user.fName
                })
            })
        }
        else {
            this.setState({ selectedHall: v }, () => {
                this.props.form.setFieldsValue({
                    hallName: v.hallName
                })
                this.showLogin()
            })
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
                        if (val1.accountType === "2") {
                            window.location.href = '/OwnerDashboard'
                        }
                        else {
                            this.props.form.setFieldsValue({
                                name: val1.fName
                            })

                            this.setState({
                                user: val1,
                                visible: true
                            })
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

        if (obj.email === '' || obj.password === '' || obj.fName === '' || obj.lName === '' || obj.email === '' || obj.password === '' || obj.phoneNumber === '' || obj.confirmPassword === '' || obj.accountType === '') {
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
                swal('Signup successfull');
                window.$('#signupModalCenter').modal('hide');
                if (obj.accountType === "2") {
                    window.location.href = '/OwnerDashboard'
                }
                else {
                    this.props.form.setFieldsValue({
                        name: obj1.fName
                    })
                    this.setState({ user: obj1, visible: true })
                }
            })
                .catch((error) => {
                    swal('something went wrong' + error);
                });
        }
    }

    viewVenue(v) {
        sessionStorage.setItem('view', JSON.stringify(v))
        window.location.href = '/viewVenue'
    }

    goToPrevSlide = () => {
        if (this.state.currentIndex === 0)
            return;

        this.setState(prevState => ({
            currentIndex: prevState.currentIndex - 1,
            translateValue: prevState.translateValue + this.slideWidth()
        }))
    }

    goToNextSlide = () => {
        // Exiting the method early if we are at the end of the images array.
        // We also want to reset currentIndex and translateValue, so we return
        // to the first image in the array.
        if (this.state.currentIndex === this.state.view.picture.length - 1) {
            return this.setState({
                currentIndex: 0,
                translateValue: 0
            })
        }

        // This will not run if we met the if condition above
        this.setState(prevState => ({
            currentIndex: prevState.currentIndex + 1,
            translateValue: prevState.translateValue + -(this.slideWidth())
        }));
    }

    slideWidth = () => {
        return document.querySelector('.slide').clientWidth
    }

    venueBooking() {
        const { user, view } = this.state
        if (user) {
            this.setState({ visible: true }, () => {
                this.props.form.setFieldsValue({
                    hallName: view.hallName,
                    name: user.fName
                })
            })
        }
        else {
            this.props.form.setFieldsValue({
                hallName: view.hallName
            })
            this.showLogin()
        }
    }


    render() {
        const { data, userData, obj, email, password, user, showDescription, view, visible } = this.state
        const { getFieldDecorator } = this.props.form;

        return (
            <div>
                <Element name="Home">
                    <AppBar style={{ background: '#3c3c3c' }} position="fixed">
                        <Toolbar>
                            <Typography component="h1" variant="h6" color="inherit" >
                                {user ? "User Dashboard" : "Venue Club"}
                            </Typography>
                            <div style={{ marginLeft: 'auto', marginRight: '-12px' }}>
                                {user ? <div>
                                    <Button style={{ color: 'white' }} onClick={() => window.location.href = '/userDashboard'} >Home</Button>
                                    {/* <Button style={{ color: 'white' }}>Manage Venues</Button> */}
                                    <Button style={{ color: 'white' }} onClick={() => this.logout()}>Logout</Button>

                                    {/* <IconButton style={{ color: '#ffffff' }} title="Message">
                                    <Message />
                                </IconButton> */}

                                    <Button style={{ color: 'white' }}>
                                        {user.fName}
                                        <IconButton color="inherit" title="Profile">
                                            <UserIcon />
                                        </IconButton>
                                    </Button>
                                </div>
                                    : <div>
                                        <Button style={{ color: 'white' }} onClick={() => window.location.href = '/privacyPolicy'}>
                                            Privacy Policy
                                    </Button>
                                        <Button style={{ color: 'white' }} data-toggle="modal" data-target="#exampleModalCenter">
                                            Login/SignUp
                                    </Button>
                                    </div>
                                }

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

                        </Toolbar>
                    </AppBar>

                </Element>

                {userData ? <div>
                    <div style={{ display: 'flex', flexDirection: 'row', marginTop: 45, marginBottom: 10, flex: 1 }}>
                        <div className="slider" style={{ flex: 5, marginRight: 10, marginTop: 50 }} >

                            <div className="slider-wrapper"
                                style={{
                                    transform: `translateX(${this.state.translateValue}px)`,
                                    transition: 'transform ease-out 0.45s'
                                }}>
                                {
                                    this.state.view.picture.map((image, i) => (
                                        <Slide key={i} image={image} />
                                    ))
                                }
                            </div>

                            <LeftArrow
                                goToPrevSlide={this.goToPrevSlide}
                            />

                            <RightArrow
                                goToNextSlide={this.goToNextSlide}
                            />
                        </div>
                        <div style={{ flex: 3, marginRight: 10 }}>
                            <Table pagination={false} dataSource={data} style={{ display: 'inline', width: '30%' }}>
                                <Column title="" dataIndex="name" key="firstName" />
                                <Column title="" dataIndex="value" key="lastName" />
                            </Table>
                        </div>
                    </div>
                    <div style={{ display: 'flex', flex: 1, flexDirection: 'row', marginRight: 10, marginLeft: 10 }}>
                        <div style={{ flex: 3 }}>
                            <div className="card1" onClick={() => this.setState({ showDescription: !showDescription })}>
                                <p className="title"><i className="fa fa-list-ul"></i> &nbsp; Description</p>
                            </div>
                            {showDescription && <div className="card2">
                                <p className="title">{view.description}
                                </p>
                            </div>}
                        </div>
                        <div style={{ flex: 1, marginTop: 50, marginLeft: 10 }}>
                            <Btn type="primary" onClick={() => this.venueBooking()} block>
                                Register this Venue
                                        </Btn>
                        </div>
                    </div>
                </div>
                    : <div style={{ marginTop: 85 }}><Skeleton /></div>}
                < Footer />

                <Modal
                    visible={visible}
                    title="Create a new collection"
                    okText="Submit"
                    onCancel={() => this.setState({ visible: false })}
                    onOk={this.handleSubmit}
                >
                    <Form layout="vertical">
                        <Form.Item label="Name">
                            {getFieldDecorator('name', {
                                rules: [{ required: true, message: 'Please input the title of collection!' }],
                            })(<Input placeholder="Enter your Name Here..." readOnly />)}
                        </Form.Item>
                        <Form.Item label="Phone Number">
                            {getFieldDecorator('number', {
                                rules: [{ required: true, message: 'Please input the title of collection!' }],
                            })(<Input type="number" placeholder="Enter your Number Here..." />)}
                        </Form.Item>
                        <Form.Item label="Hall Name">
                            {getFieldDecorator('hallName', {
                                rules: [{ required: true, message: 'Please input the title of collection!' }],
                            })(<Input placeholder="Enter your Number Here..." readOnly />)}
                        </Form.Item>
                        <Form.Item label="Date and Time">
                            {getFieldDecorator('date-time-picker', {
                                rules: [{ type: 'object', required: true, message: 'Please select time!' }]
                            })(
                                <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" block style={{ float: 'left' }} />
                            )}
                        </Form.Item>
                    </Form>
                </Modal>
            </div >


        );
    }
}

const Slide = ({ image }) => {
    const styles = {
        backgroundImage: `url(${image})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: '50% 60%'
    }
    return <div className="slide" style={styles}></div>
}


const LeftArrow = (props) => {
    return (
        <div className="backArrow arrow" onClick={props.goToPrevSlide}>
            <i className="fa fa-arrow-left fa-2x" aria-hidden="true"></i>
        </div>
    );
}


const RightArrow = (props) => {
    return (
        <div className="nextArrow arrow" onClick={props.goToNextSlide}>
            <i className="fa fa-arrow-right fa-2x" aria-hidden="true"></i>
        </div>
    );
}

const SearchResultForm = Form.create({ name: 'form_in_modal' })(ViewVenue);

export default SearchResultForm;