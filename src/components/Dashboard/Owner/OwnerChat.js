import React, { Component } from 'react';
import clsx from 'clsx';
import '../../../resources/bootstrap.min.css';
import firebase from '../../../config/firebase'
import swal from 'sweetalert';

import { Layout, Menu, Breadcrumb, Icon, Input, Button, Alert } from 'antd';

const { Header, Content, Footer, Sider } = Layout;
const { TextArea } = Input;

class OwnerChat extends Component {
    constructor(props) {
        super(props)

        this.state = {
            user: JSON.parse(sessionStorage.getItem('user')),
            data: []
        }
    }

    componentWillMount() {
        // firebase.auth().onAuthStateChanged(function (user) {
        //     if (user) {
        //         console.log(user)
        //         // User is signed in.
        //     } else {
        //         // No user is signed in.
        //     }
        // });

        const { user, data } = this.state
        firebase.database().ref('users').child(`${user.uid}/chatList`).on('child_added', (val) => {
            var obj = {
                name: val.val(),
                uid: val.key
            }
            data.push(obj)
            this.setState({
                data
            })
        })
    }

    logout() {
        sessionStorage.removeItem('user')
        window.location.reload()
    }



    render() {
        const { data } = this.state
        return (
            <Layout style={{ minHeight: '100vh' }}>
                <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
                    <div className="logo" />
                    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                        <Menu.Item key="1">
                            <Icon type="user" />
                            <span>All Users</span>
                        </Menu.Item>
                        {data.length ? data.map((v,i))}
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
                    <Content style={{ margin: '0 16px', overflow: 'scroll' }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item>User 1</Breadcrumb.Item>
                        </Breadcrumb>
                        <div style={{ padding: 24, background: '#fff', minHeight: 360, }}>
                            <Alert
                                message="Hussain"
                                description="Additional description and information about copywriting."
                                type="info"
                                style={{ marginBottom: 10, width: '70%' }}
                            />
                            <Alert
                                style={{ marginBottom: 10, width: '70%', marginLeft: '30%' }}
                                message="Me"
                                description="Detailed description and advice about successful copywriting."
                                type="success"
                            />
                            <Alert
                                message="Hussain"
                                description="Additional description and information about copywriting."
                                type="info"
                                style={{ marginBottom: 10, width: '70%' }}
                            />
                            <Alert
                                style={{ marginBottom: 10, width: '70%', marginLeft: '30%' }}
                                message="Me"
                                description="Detailed description and advice about successful copywriting."
                                type="success"
                            />
                            <Alert
                                message="Hussain"
                                description="Additional description and information about copywriting."
                                type="info"
                                style={{ marginBottom: 10, width: '70%' }}
                            />
                            <Alert
                                style={{ marginBottom: 10, width: '70%', marginLeft: '30%' }}
                                message="Me"
                                description="Detailed description and advice about successful copywriting."
                                type="success"
                            />
                        </div>
                    
                    </Content>
                    <Footer style={{ width: '100%', padding: 24 }}>
                        <div style={{ display: 'flex' }}>
                            <TextArea
                                placeholder="Autosize height with minimum and maximum number of lines"
                                autosize={{ minRows: 2, maxRows: 6 }}
                            />
                            <Button type="primary" shape="circle" style={{ textAlign: 'center', height: 55, width: 65, paddingBottom: 10, marginLeft: 1 }} icon="right" />
                        </div>
                    </Footer>
                </Layout>
            </Layout>


        );
    }
}

export default OwnerChat;