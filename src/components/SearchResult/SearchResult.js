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

const { Meta } = Card




class SearchResult extends Component {
    constructor(props) {
        super(props)

        this.state = {
            user: JSON.parse(sessionStorage.getItem('user')),
            search: sessionStorage.getItem('search') ? JSON.parse(sessionStorage.getItem('search')) : false,
            visible: false,
            confirmLoading: false,
            allHallData: [],
            selectedHall: ''
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
    }

    componentDidMount(){
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
            fieldsValue['send'] = selectedHall
            fieldsValue['customerUid'] = user.uid
            fieldsValue['status'] = 'pending'

            firebase.database().ref('users').child(`${user.uid}/sentBooking/${selectedHall.userUid}/${selectedHall.key}`).set(fieldsValue)
                .then(() => {
                    this.setState({ visible: false })
                    this.props.form.resetFields()
                    firebase.database().ref('users').child(`${selectedHall.userUid}/recBooking/${selectedHall.key}`).push(fieldsValue)
                })
        })
    }

    logout() {
        sessionStorage.clear('user')
        sessionStorage.clear('search')
        window.location.reload()
    }



    render() {
        const { allHallData, visible, search } = this.state
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <Element name="Home">

                    <AppBar style={{ background: '#3c3c3c' }} position="fixed">
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
                    <div style={{ position: 'relative' }}>
                        <Carrousel />

                        <div className="artist_name">
                            <div className="wrapper">Let Us Help You Create</div>
                        </div>
                        <Search />
                    </div>
                </Element>
                {
                    search ? allHallData.length ? <div>
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
                                            <Btn type="primary" onClick={() => this.setState({ visible: true, selectedHall: v }, () => {
                                                this.props.form.setFieldsValue({
                                                    hallName: v.hallName
                                                })
                                            })} block>
                                                Register
                                        </Btn>
                                        </Card>
                                    </Col>
                                })}
                            </Row>
                        </div>
                    </div> : <Skeleton /> : <div style={{ marginTop: 300 }}></div>
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
                            {getFieldDecorator('title', {
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