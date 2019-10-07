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




class OwnerBooking extends Component {
    constructor(props) {
        super(props)

        this.state = {
            user: JSON.parse(sessionStorage.getItem('user')),
            visible: false,
            confirmLoading: false,
            columns: [
                {
                    title: 'Buyer Name',
                    dataIndex: 'name',
                    render: text => <a href="#" onClick={() => this.setState({ visible: true })}>{text}</a>
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
            date: new Date()
        }
    }

    componentWillMount() {
        const { data, date } = this.state;
        for (let i = 0; i < 460; i++) {
            var status = 'pending'
            if (i % 2 === 0) {
                status = 'pending'
            }
            else if (i % 3 === 0) {
                status = 'accepted'
            }
            else {
                status = 'rejected'
            }
            data.push({
                key: i,
                name: `Edward King ABc hello rfjygyjgfyh ${i}`,
                hallName: 32,
                pDate: date.toDateString(),
                status: status
            });
        }
        this.setState({ data })
    }

    handleOk = () => {
        this.setState({
            ModalText: 'The modal will be closed after two seconds',
            confirmLoading: true,
        });
        setTimeout(() => {
            this.setState({
                visible: false,
                confirmLoading: true,
            });
        }, 3000);
    };

    handleCancel = () => {
        console.log('Clicked cancel button');
        this.setState({
            visible: false,
        });
    };



    render() {
        const { visible, confirmLoading, columns, data } = this.state

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

                <div style={{ width: '100%', justifyContent: 'center', display: 'flex', textAlign: 'center', marginTop: 140 }}>
                    {data.length ? <Table
                        style={{ width: '94%' }}
                        columns={columns}
                        dataSource={data}
                    /> : <Skeleton active />}
                </div>
                <Modal
                    visible={visible}
                    title="Title"
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={[
                        <Btn key="back" type="danger" onClick={this.handleCancel}>
                            Reject
                        </Btn>,
                        <Btn key="submit" type="primary" loading={confirmLoading} onClick={this.handleOk}>
                            Accept
                        </Btn>,
                    ]}
                >
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                </Modal>
                <Footer />
            </div>


        );
    }
}

export default OwnerBooking;