import React, { Component } from 'react';
import User from './User';
import firebase from '../../../config/firebase'

class OwnerClass extends Component {
    constructor() {
        super()
        this.state = {
            user: JSON.parse(sessionStorage.user),
            hallData: '',
            hallDataArr: [],
            start: 0,
            end: 3,
            data: [],
            columns: [
                {
                    title: 'Hall Name',
                    dataIndex: 'name',
                    render: text => <a href="#">{text}</a>
                },
                {
                    title: 'Program Date',
                    dataIndex: 'pDate',
                },
                {
                    title: 'Statue',
                    dataIndex: 'status'
                }
            ]
        }

        this.updatePage = this.updatePage.bind(this)
    }

    async componentWillMount() {
        const { user, hallDataArr, data } = this.state

        await firebase.database().ref('users').child(`${user.uid}/sentBooking`).on('child_added', (val) => {
            var value = val.val()
            hallDataArr.push(value)
            data.push({
                key: val.key,
                name: value.hallName,
                pDate: value['date-time-picker'],
                status: value.status
            });
            this.setState({
                hallDataArr,
                data
            })
        })

        // for (var i in hallData) {
        //     hallDataArr.push(hallData[i])
        // }
        this.setState({
            hallDataArr,
            data
        })
    }

    updatePage(num) {
        var number = num * 3
        this.setState({
            start: number - 3,
            end: number
        })
    }

    componentDidMount() {
        console.log(this.state.hallDataArr)
    }

    render() {
        const { user, hallDataArr, start, end, data, columns } = this.state
        return (
            <User
                user={user}
                hallDataArr={hallDataArr}
                start={start}
                columns={columns}
                data={data}
                end={end}
                updatePage={this.updatePage}
            />
        );
    }
}
export default OwnerClass;
