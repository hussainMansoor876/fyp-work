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
import { Card, Col, Row, Skeleton, Button as Btn, Form, Modal, Input, DatePicker } from 'antd';
import swal from 'sweetalert';
import { FacebookLoginButton, GoogleLoginButton } from "react-social-login-buttons";

const { Meta } = Card




class SearchResult extends Component {
    constructor(props) {
        super(props)

        this.state = {
            search: sessionStorage.getItem('search') ? JSON.parse(sessionStorage.getItem('search')) : false,
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
            }
        }
    }


    componentWillMount() {
        const { search, allHallData } = this.state
        console.log('user', search)
        if (search) {
            firebase.database().ref('allHallData').on('child_added', (val) => {
                firebase.database().ref('allHallData').child(`${val.key}`).on('child_added', (val1) => {
                    var value = val1.val()
                    if (value.hallName.toLowerCase().indexOf(search.vName.toLowerCase()) !== -1 && value.venueLocation.toLowerCase().indexOf(search.vLocation.toLowerCase()) !== -1 && value.venueType.toLowerCase().indexOf(search.vType.toLowerCase()) !== -1) {
                        value['userUid'] = val.key
                        value['key'] = val1.key
                        allHallData.push(value)
                        this.setState({ allHallData })
                    }
                })
            })
        }
        else {
            firebase.database().ref('allHallData').on('child_added', (val) => {
                firebase.database().ref('allHallData').child(`${val.key}`).on('child_added', (val1) => {
                    var value = val1.val()
                    value['userUid'] = val.key
                    value['key'] = val1.key
                    allHallData.push(value)
                    this.setState({ allHallData })
                })
            })
        }
    }

    componentDidMount() {
        sessionStorage.removeItem('search')
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
        window.location.reload()
    }

    venueBooking(v) {
        const { user } = this.state
        if (user) {
            this.setState({ visible: true, selectedHall: v }, () => {
                this.props.form.setFieldsValue({
                    hallName: v.hallName
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
                swal('Signup successfull');
                window.$('#signupModalCenter').modal('hide');
                if (obj.accountType === "2") {
                    window.location.href = '/OwnerDashboard'
                }
                else {
                    this.setState({ user: obj1, visible: true })
                }
            })
                .catch((error) => {
                    swal('something went wrong' + error);
                });
        }
    }



    render() {
        const { allHallData, visible, search, user, obj, email, password } = this.state
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <Element name="Home">

                    <AppBar style={{ background: '#3c3c3c' }} position="fixed">
                        <Toolbar>
                            <Typography component="h1" variant="h6" color="inherit" >
                                User Dashboard
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
                    <div style={{ position: 'relative' }}>
                        <Carrousel />

                        <div className="artist_name">
                            <div className="wrapper">Let Us Help You Create</div>
                        </div>
                        <Search />
                    </div>
                </Element>
                {
                    search & allHallData.length ? <div>
                        <h1 style={{ textAlign: 'center', marginTop: 20 }}>Search Result</h1>
                        <div style={{ background: '#ECECEC', padding: '30px' }}>
                            <Row gutter={16}>
                                {allHallData.map((v, i) => {
                                    return <Col span={8} key={i}>
                                        <Card
                                            title={v.hallName}
                                            hoverable
                                            cover={<img alt="example" style={{ height: 260 }} src={'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQefCoQ8XaDsgV3HdlAjqap7esgqwmqB-Xd5AIL9STJIbsjFfII'} />}
                                        >
                                            <Meta title={`VenueType: ${v.venueType}`} />
                                            <br />
                                            <h3>Advance: {v.price / 10}</h3>
                                            <h1>{`Rs: ${v.price}`}</h1>
                                            <p>Address: {v.address}</p>
                                            <Btn type="primary" onClick={() => this.venueBooking(v)} block>
                                                Register
                                        </Btn>
                                        </Card>
                                    </Col>
                                })}
                            </Row>
                        </div>
                    </div> : allHallData.length ? <div>
                        <h1 style={{ textAlign: 'center', marginTop: 20 }}>Search Result</h1>
                        <div style={{ background: '#ECECEC', padding: '30px' }}>
                            <Row gutter={16}>
                                {allHallData.map((v, i) => {
                                    return <Col span={8} key={i}>
                                        <Card
                                            style={{ marginTop: 20 }}
                                            title={v.hallName}
                                            hoverable
                                            cover={<img alt="example" style={{ height: 260 }} src={'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQefCoQ8XaDsgV3HdlAjqap7esgqwmqB-Xd5AIL9STJIbsjFfII'} />}
                                        >
                                            <Meta title={`VenueType: ${v.venueType}`} />
                                            <br />
                                            <h3>Advance: {v.price / 10}</h3>
                                            <h1>{`Rs: ${v.price}`}</h1>
                                            <p>Address: {v.address}</p>
                                            <Btn type="primary" onClick={() => this.venueBooking(v)} block>
                                                Register
                                        </Btn>
                                        </Card>
                                    </Col>
                                })}
                            </Row>
                        </div>
                    </div> :
                            <Skeleton />
                }
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
                            })(<Input placeholder="Enter your Name Here..." />)}
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
                                <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" block />
                            )}
                        </Form.Item>
                    </Form>
                </Modal>



            </div >


        );
    }
}

const SearchResultForm = Form.create({ name: 'form_in_modal' })(SearchResult);

export default SearchResultForm;