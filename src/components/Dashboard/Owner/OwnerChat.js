import React, { Component } from 'react';
import clsx from 'clsx';
import '../../../resources/bootstrap.min.css';
import FooterData from '../../header-footer/Footer';
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

import { Layout, Menu, Breadcrumb, Icon, Input } from 'antd';

const { Header, Content, Footer, Sider } = Layout;
const { TextArea } = Input;

class OwnerChat extends Component {
    constructor(props) {
        super(props)

        this.state = {
            user: JSON.parse(sessionStorage.getItem('user'))
        }
    }

    componentWillMount() {
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                console.log(user)
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



    render() {
        return (
            <Layout style={{ minHeight: '100vh' }}>
                <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
                    <div className="logo" />
                    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                        <Menu.Item key="1">
                            <Icon type="user" />
                            <span>All Users</span>
                        </Menu.Item>
                        <Menu.Item key="9">
                            <Icon type="user" />
                            <span>User 1</span>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{ background: '#fff', padding: 0 }}>
                        <h1 style={{ textAlign: 'center' }}>All Chat</h1>
                    </Header>
                    <Content style={{ margin: '0 16px' }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item>User 1</Breadcrumb.Item>
                        </Breadcrumb>
                        <div style={{ padding: 24, background: '#fff', minHeight: 360, height: '90%' }}>Bill is a cat.</div>
                    </Content>
                    <Footer style={{ width: '100%', padding: 24 }}>
                        <TextArea
                            style={{ width: '100' }}
                            placeholder="Autosize height with minimum and maximum number of lines"
                            autosize={{ minRows: 2, maxRows: 6 }}
                        />
                    </Footer>
                </Layout>
            </Layout>


        );
    }
}

export default OwnerChat;