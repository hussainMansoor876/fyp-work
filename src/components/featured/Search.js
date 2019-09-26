import React, { Component } from 'react';
import Slide from 'react-reveal/Slide';
import '../../resources/bootstrap.min.css';


class Search extends Component {

    render() {
        return (
            <Slide left delay={1000}>

                <div className="countdown_wrapper" style={{textAlign:'center',margin:'2px 15%',marginBottom:'1%'}}>
                    <div className="countdown_bottom" >
                        <div className="countdown_item">
                         <div className="container">
                            <div className="row">
                                <div className="col-md-4">
                                <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="Search by: Area, Venue Name" style={{
                                    width:'250px',
                                    borderTopColor:'#ffffff',
                                    borderLeftColor:'#ffffff',
                                    borderRightColor:'#ffffff'
                                
                                }} />
                           
                                </div>

                                <div className="col-md-4">
                                <select className="form-control" id="exampleFormControlSelect1" style={{
                                    width:'250px',
                                    borderTopColor:'#ffffff',
                                    borderLeftColor:'#ffffff',
                                    borderRightColor:'#ffffff'
                                
                                }} >
                                <option selected>Select Venue Type</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                                </select>
                                </div>

                                <div className="col-md-4">
                                <select className="form-control" id="exampleFormControlSelect1" style={{
                                    width:'250px',
                                    borderTopColor:'#ffffff',
                                    borderLeftColor:'#ffffff',
                                    borderRightColor:'#ffffff'
                                }} >
                                <option selected>Select Venue Location</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                                </select>
                                </div>
                               
                                    </div>
                                    </div>
    
                         </div>
                       <button type="button" className="btn btn-success" >Search</button>

                    </div>

                       
                </div>

                

            </Slide>
        );
    }
}

export default Search;