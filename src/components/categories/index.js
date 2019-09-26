import React, { Component } from 'react';
import MyButton from '../utills/MyButton';
import Zoom from 'react-reveal/Zoom';
import Flip from 'react-reveal/Flip';
import '../../resources/bootstrap.min.css';
class Categories extends Component {
    render() {
        return (
            
            <div className="center_wrapper pricing_section container">
              <h2 className="text-center" style={{color:'black'}}>Categories</h2>  
            <br/>
          
                <div className="row" >
                    
              
                <Flip>
                <img  className="cat_img" src={require('../../resources/images/slide_two.jpg')} alt="Notebook" style={{width:'350px',height:'400px' , margin:'15px auto'}}/>
                </Flip>
              
             
              <Flip>
              <img className="cat_img" src={require('../../resources/images/slide_two.jpg')} alt="Notebook" style={{width:'350px',height:'400px',  margin:'15px auto'}}/>
              </Flip>

              

               <Flip>
              <img className="cat_img" src={require('../../resources/images/slide_two.jpg')} alt="Notebook" style={{width:'350px',height:'400px', margin:'15px auto'}}/>
              </Flip>
              
               </div>
           </div>
        );
    }
}

export default Categories;