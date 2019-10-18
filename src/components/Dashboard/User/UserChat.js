import React, { Component } from 'react';
import clsx from 'clsx';
import '../../../resources/bootstrap.min.css';
import firebase from '../../../config/firebase'
import swal from 'sweetalert';

import { Layout, Menu, Breadcrumb, Icon, Input, Button, Alert, Typography, Skeleton } from 'antd';

const { Header, Content, Footer, Sider } = Layout;
const { TextArea } = Input;

const { Title } = Typography;

class UserChat extends Component {
    constructor(props) {
        super(props)

        this.state = {
            user: JSON.parse(sessionStorage.getItem('user')),
            data: [],
            dataObj: {},
            selectedChat: '',
            chatUserName: '',
            allMessages: [],
            myMsg: '',
            loader: false
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
        // if(user.chatList){

        // }
        var obj1 = {}
        firebase.database().ref('users').child(`${user.uid}/chatList`).on('child_added', (val) => {
            var obj = {
                name: val.val(),
                uid: val.key,
                [val.key]: val.val()
            }
            obj1[val.key] = {
                name: val.val(),
                uid: val.key
            }
            data.push(obj)
            this.setState({
                data,
                dataObj: obj1
            })
        })
    }

    logout() {
        sessionStorage.removeItem('user')
        window.location.reload()
    }


    openChat(v) {
        const { user, dataObj } = this.state
        this.setState({
            selectedChat: dataObj[v.key],
            chatUserName: dataObj[v.key]['name'],
            loader: true
        })
        this.setState({
            allMessages: []
        }, () => {
            const { allMessages } = this.state

            firebase.database().ref('users').child(`${user.uid}/chat/${v.key}`).on('child_added', (val) => {
                var obj = {
                    data: val.val(),
                    key: val.key
                }
                allMessages.push(obj)
                this.setState({
                    allMessages,
                    loader: false
                })
            })
        })

        // setTimeout(() => {
        //     this.setState({
        //         loader: false
        //     })
        // }, 2000)
    }

    sendMsg() {
        const { myMsg, selectedChat, user } = this.state
        var myMsg1 = {
            msg: myMsg,
            recName: selectedChat.name
        }
        var recMsg = {
            msg: myMsg,
            senderName: user.fName
        }

        firebase.database().ref('users').child(`${user.uid}/chat/${selectedChat.uid}/`).push(myMsg1)
            .then((snap) => {
                firebase.database().ref('users').child(`${selectedChat.uid}/chat/${user.uid}/${snap.key}`).set(recMsg)
                    .then(() => {
                        this.setState({
                            myMsg: ''
                        })
                    })
            })
    }



    render() {
        const { data, allMessages, chatUserName, myMsg, loader } = this.state
        return (
            <Layout style={{ minHeight: '100vh' }}>
                <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
                    <div className="logo" />
                    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" onClick={(v) => this.openChat(v)}>
                        <Menu.Item key="1">
                            <Icon type="user" />
                            <span>All Users</span>
                        </Menu.Item>
                        {data.length && data.map((v, i) => {
                            return <Menu.Item key={v.uid}>
                                <Icon type="user" />
                                <span>{v.name}</span>
                            </Menu.Item>
                        })}
                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{ background: '#fff', padding: 0 }}>
                        <h1 style={{ textAlign: 'center' }}>All Chat</h1>
                    </Header>
                    <Content style={{ margin: '0 16px', overflow: 'hidden' }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item>{chatUserName}</Breadcrumb.Item>
                        </Breadcrumb>
                        <div style={{ padding: 24, background: '#fff', minHeight: 360, }}>
                            {allMessages.length && !loader ? allMessages.map((v, i) => {
                                if (v.data.recName) {
                                    return < Alert
                                        key={i}
                                        style={{ marginBottom: 10, width: '70%', marginLeft: '30%' }}
                                        message="Me"
                                        description={v.data.msg}
                                        type="success"
                                    />
                                }
                                return <Alert
                                    message={v.data.senderName}
                                    description={v.data.msg}
                                    type="info"
                                    style={{ marginBottom: 10, width: '70%' }}
                                />
                            }) : loader ? <Skeleton /> : <Title style={{ textAlign: 'center', marginTop: 100 }}>Select a Conversation</Title>}
                        </div>

                    </Content>
                    {allMessages.length && !loader && <Footer style={{ width: '100%', padding: 24 }}>
                        <div style={{ display: 'flex' }}>
                            <TextArea
                                placeholder="Autosize height with minimum and maximum number of lines"
                                autosize={{ minRows: 2, maxRows: 6 }}
                                value={myMsg}
                                onChange={(e) => this.setState({ myMsg: e.target.value })}
                            />
                            <Button type="primary" shape="circle" style={{ textAlign: 'center', height: 55, width: 65, paddingBottom: 10, marginLeft: 1 }} icon="right" disabled={myMsg ? false : true} onClick={() => this.sendMsg()} />
                        </div>
                    </Footer>}
                </Layout>
            </Layout>


        );
    }
}

export default UserChat;