import React, { PureComponent } from 'react'
import '../../../resources/bootstrap.min.css';
class Card extends PureComponent {
    constructor() {
        super()
        this.state = {
            HallArray:[],
        }
    }

    DisplayHalls(){
        const {HallArray}=  this.state;
        HallArray.push({name:'ABC Lawn',image:require('../../../resources/images/slide_two.jpg')});
        HallArray.push({name:'ABC Lawn',image:require('../../../resources/images/slide_two.jpg')});
        HallArray.push({name:'ABC Lawn',image:require('../../../resources/images/slide_two.jpg')});
        
    }

    render() {
        const {HallArray}=this.state;
        this.DisplayHalls();
        return (
            <div>

           
               { HallArray.map((val,index)=>{
                   return (
                       <div className="container">
                           <div className="row">
                    <div className="card col-3" style={{width: '18rem'}}>
                    <img src={val.image} className="card-img-top"/>
                    <div className="card-body">
                        <h5 className="card-title">{val.name}</h5>
                        <p className="card-text">Some quick example text .</p>
                    </div>
        
                    <div className="card-body">
                        <a href={''} className="card-link">Card link</a>
                        <a href={''} className="card-link">Another link</a>
                    </div>

                 </div>
                 </div>
                 </div>
                   )
               })
              }
            </div>
        )
    }
}

export default Card