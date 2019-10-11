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
import { Card, Col, Row, Skeleton, Button as Btn, Form, Modal, Input, Radio } from 'antd';

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
            visible: false,
        }
    }


    componentWillMount() {
        const { search, allHallData } = this.state
        console.log('user', search)
        firebase.database().ref('allHallData').on('child_added', (val) => {
            firebase.database().ref('allHallData').child(`${val.key}`).on('child_added', (val1) => {
                var value = val1.val()
                if (value.hallName.toLowerCase().indexOf(search.vName.toLowerCase()) !== -1 && value.venueLocation.toLowerCase().indexOf(search.vLocation.toLowerCase()) !== -1 && value.venueType.toLowerCase().indexOf(search.vType.toLowerCase()) !== -1) {
                    allHallData.push(value)
                    this.setState({ allHallData })
                    console.log(allHallData)
                }
                console.log(val1.val())
            })
        })
    }



    render() {
        const { allHallData, visible } = this.state
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
                                <Button style={{ color: 'white' }}>Logout</Button>

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
                {allHallData.length ? <div>
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
                                        <Meta title={`${v.venueType}`} />
                                        <h1>{`Rs: ${v.price}`}</h1>
                                        <Btn type="primary" onClick={() => this.setState({ visible: true })} block>
                                            Register
                                        </Btn>
                                    </Card>
                                </Col>
                            })}
                        </Row>
                    </div>
                </div> : <Skeleton />}
                <Footer />
                <Modal
                    visible={visible}
                    title="Create a new collection"
                    okText="Create"
                // onCancel={onCancel}
                // onOk={onCreate}
                >
                    <Form layout="vertical">
                        <Form.Item label="Title">
                            {getFieldDecorator('title', {
                                rules: [{ required: true, message: 'Please input the title of collection!' }],
                            })(<Input />)}
                        </Form.Item>
                        <Form.Item label="Description">
                            {getFieldDecorator('description')(<Input type="textarea" />)}
                        </Form.Item>
                        <Form.Item className="collection-create-form_last-form-item">
                            {getFieldDecorator('modifier', {
                                initialValue: 'public',
                            })(
                                <Radio.Group>
                                    <Radio value="public">Public</Radio>
                                    <Radio value="private">Private</Radio>
                                </Radio.Group>,
                            )}
                        </Form.Item>
                    </Form>
                </Modal>
            </div>


        );
    }
}

const SearchResultForm = Form.create({ name: 'time_related_controls' })(SearchResult);

export default SearchResultForm;