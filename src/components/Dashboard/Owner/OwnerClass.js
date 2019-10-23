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
            end: 3,
            isData: true
        }

        this.updatePage = this.updatePage.bind(this)
    }

    async componentWillMount() {
        const { user, hallDataArr } = this.state
        const { hallData } = user

        await firebase.database().ref('allHallData').child(`${user.uid}`).on('child_added', (val) => {
            var value = val.val()
            value['key'] = val.key
            hallDataArr.push(value)
            this.setState({
                hallData: hallData,
                hallDataArr
            })
        })

        // for (var i in hallData) {
        //     hallDataArr.push(hallData[i])
        // }
        this.setState({
            hallData: hallData,
            hallDataArr
        })

        setTimeout(() => {
            this.checkData()
        }, 4000)
    }

    checkData() {
        !this.state.hallDataArr.length && this.setState({
            isData: false
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
        const { user, hallData, hallDataArr, start, end, isData } = this.state
        return (
            <Owner
                user={user}
                hallData={hallData}
                hallDataArr={hallDataArr}
                start={start}
                end={end}
                updatePage={this.updatePage}
                isData={isData}
            />
        );
    }
}
export default OwnerClass;
