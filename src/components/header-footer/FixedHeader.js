import React, { Component } from 'react';
import '../../resources/bootstrap.min.css';
import { Link } from 'react-router-dom';

class Header extends Component {

    render() {
        return (
            
            
            <nav className="navbar navbar-expand-lg navbar-light bck_black fixed-top">
        
        <img style={{ width: '90px', height: '90px' }} src={require('../../resources/images/final.png')} />
         <div className="header_logo">
           <div className="font_righteous header_logo_venue" style={{color:'white',fontSize:'30px'}}>Venue Club</div>
          <div className="header_logo_title" style={{color:'white'}}>Design Your Perfect Event</div>
        </div>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav head_ul" style={{marginLeft:'35%'}}>
              <li>  <button style={{ background: 'none', border: 'none', color: '#ffffff', margin: '10px' }} onClick={()=>this.scrollToElement('Home')}>HOME</button> </li>
              <li>  <button style={{ background: 'none', border: 'none', color: '#ffffff', margin: '10px' }} onClick={()=>this.scrollToElement('Categories')}>CATEGORIES</button></li>
              <li>   <button style={{ background: 'none', border: 'none', color: '#ffffff', margin: '10px' }} onClick={()=>this.scrollToElement('AboutUs')}>ABOUT US</button></li>
              <li>   <button  style={{ background: 'none', border: 'none', color: '#ffffff', margin: '10px' }}>PRIVACY POLICY</button></li>
              <li>  <button style={{ background: 'none', border: 'none', color: '#ffffff', margin: '10px' }} data-toggle="modal" data-target="#exampleModalCenter">LOGIN / SIGNUP</button></li>
              <li>  <button style={{ background: 'none', border: 'none', color: '#ffffff', margin: '10px' }}>Owner</button></li>
              <li>  <button style={{ background: 'none', border: 'none', color: '#ffffff', margin: '10px' }} >Admin</button></li>
             
            </ul>
        </div>
        </nav>
         
        );
    }
}

export default Header;