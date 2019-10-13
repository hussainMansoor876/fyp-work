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
import 'antd/dist/antd.css';
import { Table, Skeleton, Modal, Button as Btn } from 'antd';
import { stat } from 'fs';
import firebase from '../../../config/firebase'




class OwnerBooking extends Component {
    constructor(props) {
        super(props)

        this.state = {
            user: JSON.parse(sessionStorage.getItem('user')),
            visible: false,
            confirmLoading: false,
            columns: [
                {
                    title: 'Customer Name',
                    dataIndex: 'name',
                    render: text => <a href="#" onClick={() => this.setState({ visible: true, modalData: text }, () => {
                        console.log(this.state.modalData)
                    })}>{text.name}</a>
                },
                {
                    title: 'Hall Name',
                    dataIndex: 'hallName',
                },
                {
                    title: 'Program Date',
                    dataIndex: 'pDate',
                },
                {
                    title: 'Statue',
                    dataIndex: 'status'
                }
            ],
            data: [],
            date: new Date(),
            modalData: ''
        }
    }

    componentWillMount() {
        const { user, data } = this.state
        firebase.database().ref('users').child(`${user.uid}/recBooking`).on('child_added', (val) => {
            var value = val.val()
            value['key'] = val.key
            data.push({
                key: val.key,
                name: value,
                hallName: value.hallName,
                pDate: value['date-time-picker'],
                status: value.status
            });
            this.setState({ data })
        })
    }

    handleOk = () => {
        const { modalData, user } = this.state
        if (modalData.status === "pending") {
            this.setState({
                ModalText: 'The modal will be closed after two seconds',
                confirmLoading: true,
            });
            var message = `Your request has approved Kindly pay the Advance fees Rs: ${modalData.advance} of ${modalData.hallName}`
            var myMsg = {
                msg: message,
                recName: modalData.name
            }
            var recMsg = {
                msg: message,
                senderName: user.fName
            }

            firebase.database().ref('users').child(`${user.uid}/chatList/${modalData.customerUid}`).set(modalData.name)
            firebase.database().ref('users').child(`${modalData.customerUid}/chatList/${user.uid}`).set(user.fName)

            firebase.database().ref('users').child(`${user.uid}/recBooking/${modalData.key}`).update({ status: "Approved" })
            firebase.database().ref('users').child(`${modalData.customerUid}/sentBooking/${modalData.key}`).update({ status: "Approved" })

            firebase.database().ref('users').child(`${user.uid}/chat/${modalData.customerUid}/`).push(myMsg)
                .then((snap) => {
                    firebase.database().ref('users').child(`${modalData.customerUid}/chat/${user.uid}/${snap.key}`).set(recMsg)
                        .then(() => {
                            this.setState({
                                visible: false,
                                confirmLoading: true,
                            }, () => {
                                this.props.history.push(`/OwnerDashboard/chat`)
                            })
                        })
                })
        }
        this.setState({
            visible: false
        })
    };

    handleCancel = () => {
        console.log('Clicked cancel button');
        this.setState({
            visible: false,
        });
    };

    handleCancel1 = () => {
        const { modalData, user } = this.state
        if (modalData.status === "pending") {
            firebase.database().ref('users').child(`${user.uid}/recBooking/${modalData.key}`).update({ status: "Rejected" })
            firebase.database().ref('users').child(`${modalData.customerUid}/sentBooking/${modalData.key}`).update({ status: "Rejected" })
                .then(() => {
                    this.setState({
                        visible: false,
                    }, () => {
                        window.location.reload()
                    })
                })
        }
        else {
            this.setState({
                visible: false
            })
        }
    };


    logout() {
        sessionStorage.removeItem('user')
        window.location.reload()
    }



    render() {
        const { visible, confirmLoading, columns, data, modalData } = this.state

        return (
            <div>
                <AppBar style={{ background: '#3c3c3c' }} position="fixed">
                    <Toolbar>
                        <Typography component="h1" variant="h6" color="inherit" >
                            Owner Dashboard
          </Typography>
                        <div style={{ marginLeft: 'auto', marginRight: '-12px' }}>
                            <Button style={{ color: 'white' }}>Browse Venue</Button>
                            <Button style={{ color: 'white' }}>Manage Venues</Button>
                            <Button style={{ color: 'white' }} onClick={() => this.logout()} >Logout</Button>

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

                <div style={{ width: '100%', justifyContent: 'center', display: 'flex', textAlign: 'center', marginTop: 140 }}>
                    {data.length ? <Table
                        style={{ width: '94%' }}
                        columns={columns}
                        dataSource={data.slice().reverse()}
                    /> : <Skeleton active />}
                </div>
                <Modal
                    visible={visible}
                    title={modalData.hallName}
                    // onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={[
                        <Btn key="back" type={modalData.status === "pending" ? "danger" : "secondary"} onClick={this.handleCancel1}>
                            {modalData.status === "pending" ? "Reject" : "Cancel"}
                        </Btn>,
                        <Btn key="submit" type="primary" loading={confirmLoading} onClick={this.handleOk}>
                            {modalData.status === "pending" ? "Accept" : "Ok"}
                        </Btn>,
                    ]}
                >
                    <h3>Customer Name: {modalData.name}</h3>
                    <h4>Customer Number: {modalData.number}</h4>
                </Modal>
                <Footer />
            </div>


        );
    }
}

export default OwnerBooking;