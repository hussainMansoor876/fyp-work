import React, { Component } from 'react';
import '../../resources/bootstrap.min.css';
import Header from '../header-footer/FixedHeader';
import Footer from '../header-footer/Footer';
class Register extends Component {
  constructor(props){
    super(props)

    this.state = {
      data: {
        hallName: '',
        address: '',
        capacity: '',
        price: ''
      }
    }
  }
  render() {
    return (
      <div style={{textAlign:'center'}}>
        <Header />

        <div style={{ marginTop:'140px', marginBottom:'50px',textAlign:'center',marginLeft:'160px',marginRight:'160px'}}>
            <h2>REGISTRATION FORM</h2>

          <div className="form-group mt-4" >
            <label for="inputName" style={{float:'left'}}>Hall name</label>
            <input type="text" className="form-control" id="inputName" placeholder="ABC Lawn"/>
          </div>

          <div className="form-group">
            <label for="inputAddress" style={{float:'left'}}>Address</label>
            <input type="text" className="form-control" id="inputAddress" placeholder="1234 Main St" />
          </div>

          <div className="form-row">
            <div className="col">
              <label for="inputCapacity" style={{float:'left'}}>Capacity</label>
              <input type="number" className="form-control" placeholder="500" />
            </div>

            <div className="col">
              <label for="inputPrice" style={{float:'left'}}>Price</label>
              <input type="number" className="form-control" placeholder="Rs." />
            </div>
          </div>

          <br />

          <div className="form-group">
            <label for="exampleFormControlFile1" style={{float:'left'}}>Upload hall images</label>
            <input type="file" multiple className="form-control-file" id="exampleFormControlFile1" />
          </div>

          <br />
          
          <div style={{ textAlign: 'center' }}>
            <button type="submit" className="btn btn-success">Register</button>
          </div>

        </div>

        <Footer />
      </div>


    );
  }
}

export default Register;