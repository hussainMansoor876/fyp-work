import React, { Component } from 'react';
import Owner from './Owner';
import firebase from '../../../config/firebase'

class OwnerClass extends Component {
    constructor() {
        super()
        this.state = {
            user: JSON.parse(sessionStorage.user),
            hallData: '',
            hallDataArr: [],
            start: 0,
            end: 3
        }

        this.updatePage = this.updatePage.bind(this)
    }

    async componentWillMount() {
        const { user, hallDataArr } = this.state

        await firebase.database().ref('users').child(`${user.uid}/hallData`).on('child_added', (val) => {
            var value = val.val()
            hallDataArr.push(value)
            console.log(hallDataArr)
            this.setState({
                hallData: hallData,
                hallDataArr
            })
        })
        const { hallData } = user

        // for (var i in hallData) {
        //     hallDataArr.push(hallData[i])
        // }
        this.setState({
            hallData: hallData,
            hallDataArr
        })
    }

    updatePage(num) {
        var number = num * 3
        this.setState({
            start: number - 3,
            end: number
        })
    }

    render() {
        const { user, hallData, hallDataArr, start, end } = this.state
        return (
            <Owner
                user={user}
                hallData={hallData}
                hallDataArr={hallDataArr}
                start={start}
                end={end}
                updatePage={this.updatePage}
            />
        );
    }
}
export default OwnerClass;
