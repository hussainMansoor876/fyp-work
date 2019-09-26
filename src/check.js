import React, { Component } from 'react';
import './resources/bootstrap.min.css';

class check extends Component {
    render() {
        return (
            <div className="row"> 
                <div style={{border:'solid 2px black' , width:'200px' , height:'200px'}}></div>
                <div style={{border:'solid 2px black' , width:'200px' , height:'200px'}}></div>
            </div>
        )}
    }
    export default check;