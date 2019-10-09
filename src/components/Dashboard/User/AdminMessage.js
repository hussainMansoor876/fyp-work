import React, { Component } from 'react';
import '../../../resources/bootstrap.min.css';
class AdminMessage extends Component {
    render() {
        return (
            <div >
                <h2 className="mt-4" style={{textAlign:'center'}}>Talk to Admin</h2>
            <div style={{height:'500px',width:'50%',border:'solid 1px',borderRadius:'10px',overflowY:'auto', margin:'0 auto', marginTop:'60px'}}>

       

           

    <div className="alert alert-success float-left mx-2 my-2" role="alert" style={{border:'solid', width:'50%', height: 'auto', overflowWrap: 'break-word'}}>Hi</div><br/>
    <div className="alert alert-primary float-right mx-2 my-2" role="alert"  style={{border:'solid', width:'50%', height: 'auto', overflowWrap: 'break-word'}}>hello</div>
    <div className="alert alert-primary float-right mx-2 my-2" role="alert" style={{border:'solid', width:'50%', height: 'auto', overflowWrap: 'break-word'}}>hey</div><br/>
    
    
    </div>
    <br/>
    <div className="row">

    <div className="col-4"> 

    </div>

    <div className="col-3"> 
        <input type="text" className="form-control" id="message_body" placeholder="Type your message here..."/>
    </div>

    <div className="col-1">
        <button type="submit" className="btn btn-primary mb-2 ml-1">Send</button>
    </div>
    

    </div>
    </div>
        );
    }
}

export default AdminMessage;