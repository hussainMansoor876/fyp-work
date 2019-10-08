import React, { Component } from 'react';
import '../../resources/bootstrap.min.css';
import Header from '../header-footer/FixedHeader';
import Footer from '../header-footer/Footer';
import firebase from '../../config/firebase'
import swal from 'sweetalert'

class Register extends Component {
  constructor(props) {
    super(props)

    this.state = {
      disable: '',
      user: '',
      data: {
        hallName: '',
        address: '',
        capacity: '',
        price: '',
        picture: '',
        venueLocation: '',
        venueType: ''
      }
    }
  }

  componentWillMount() {
    const user = JSON.parse(sessionStorage.getItem('user'))
    this.setState({
      user: user
    })
    console.log(user)
  }

  updateData(e) {
    console.log(e)
    const { name, value } = e
    this.setState({
      data: {
        ...this.state.data,
        [name]: value
      }
    })
  }

  updateFile(e) {
    const { name, files } = e
    this.setState({
      data: {
        ...this.state.data,
        [name]: files[0]
      }
    })
  }

  async addData() {
    const { data, user } = this.state
    // // Update progress bar
    // task.on('state_changed', (snapshot) => {
    //     var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    //     // uploader.value = percentage;
    //     console.log(percentage)
    //   },

    //   function error(err) {
    //     console.log('err')
    //   },

    //   function complete() {
    //     console.log('complete')
    //   }
    // );
    // storageRef.put(data.picture)
    // .then(() => {
    //   console.log('then')
    // })
    // .catch((err) => {
    //   console.log(err)
    // })
    if (data.hallName === '' || data.address === '' || data.capacity === '' || data.price === '' || data.picture === '' || data.venueLocation === '' || data.venueType === '') {
      swal('Fill All textfield(s)')
    }
    else {
      this.setState({ disable: true })
      var storageRef = firebase.storage().ref(`${user.uid}/${data.picture.name}`)
      await storageRef.put(data.picture);
      storageRef.getDownloadURL()
        .then((url) => {
          console.log(url)
          data.picture = url
          firebase.database().ref('allHallData').child(`${user.uid}`).push(data)
          firebase.database().ref('users').child(`${user.uid}/hallData`).push(data)
            .then(() => {
              this.setState({
                data: {
                  hallName: '',
                  address: '',
                  capacity: '',
                  price: '',
                  picture: '',
                  venueLocation: '',
                  venueType: ''
                },
                disable: false
              })
            })
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }


  render() {
    const { data, disable } = this.state
    return (
      <div style={{ textAlign: 'center' }}>
        <Header />

        <div style={{ marginTop: '140px', marginBottom: '50px', textAlign: 'center', marginLeft: '160px', marginRight: '160px' }}>
          <h2>REGISTRATION FORM</h2>

          <div className="form-group mt-4" >
            <label for="inputName" style={{ float: 'left' }}>Hall name</label>
            <input type="text" className="form-control" id="inputName" placeholder="ABC Lawn" name="hallName" value={data.hallName} onChange={(e) => this.updateData(e.target)} />
          </div>

          <div className="form-group">
            <label for="inputAddress" style={{ float: 'left' }}>Address</label>
            <input type="text" className="form-control" id="inputAddress" placeholder="1234 Main St" name="address" value={data.address} onChange={(e) => this.updateData(e.target)} />
          </div>

          <div className="form-row">
            <div className="col">
              <label for="inputCapacity" style={{ float: 'left' }}>Capacity</label>
              <input type="number" className="form-control" placeholder="500" name="capacity" value={data.capacity} onChange={(e) => this.updateData(e.target)} />
            </div>

            <div className="col">
              <label for="inputPrice" style={{ float: 'left' }}>Price</label>
              <input type="number" className="form-control" placeholder="Rs." name="price" value={data.price} onChange={(e) => this.updateData(e.target)} />
            </div>
          </div>

          <div className="form-row">
            <div className="col">
              <select name="venueType" onChange={(e) => this.updateData(e.target)} className="form-control" id="exampleFormControlSelect1" style={{
                // width: '250px',
                marginTop: 27,
                borderTopColor: '#ffffff',
                borderLeftColor: '#ffffff',
                borderRightColor: '#ffffff'
              }} >
                <option value="">Select Venue Type</option>
                <option value="hall">Hall</option>
                <option value="banquet">Banquet</option>
                <option value="other">Other</option>
              </select>
            </div>


            <div className="col">
              <select name="venueLocation" onChange={(e) => this.updateData(e.target)} className="form-control" id="exampleFormControlSelect1" style={{
                // width: '250px',
                marginTop: 27,
                borderTopColor: '#ffffff',
                borderLeftColor: '#ffffff',
                borderRightColor: '#ffffff'
              }} >
                <option value="">Select Venue Location</option>
                <option value="gulshan-e-iqbal">Gulshan-e-Iqbal</option>
                <option value="nazimabad">Nazimabad</option>
                <option value="north nazimabad">North Nazimabad</option>
                <option value="defense">Defense</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <br />

          <div className="form-group">
            <label for="exampleFormControlFile1" style={{ float: 'left' }}>Upload hall images</label>
            <input type="file" multiple className="form-control-file" id="exampleFormControlFile1" name="picture" onChange={(e) => this.updateFile(e.target)} />
          </div>

          <br />

          <div style={{ textAlign: 'center' }}>
            <button type="submit" className="btn btn-success" onClick={() => this.addData()} disabled={this.state.disable} >Register</button>
          </div>

        </div>

        <Footer />
      </div>


    );
  }
}

export default Register;