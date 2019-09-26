import React from 'react';
import Slider from "react-slick";
import slider1 from '../../resources/images/slide_one.jpg';
import slider2 from '../../resources/images/slide_two.jpg';
import slider3 from '../../resources/images/slide_three.jpg';
import '../../resources/bootstrap.min.css';

const Carrousel = () => {
    const settings = {
        infinite: true,
        autoplay:true,
        speed: 500
      };

    return (
        <div className="carrousel_wrapper" style={{
            height: `${window.innerHeight}px`,
            overflow: 'hidden'
        }}>

        <Slider {...settings}>
        <div>

            <div className="carrousel_image" style={{
                background:`url(${slider1})`,
                height: `${window.innerHeight}px`,}}>
            </div>

        </div>

        <div>

            <div className="carrousel_image" style={{
                background:`url(${slider2})`,
                height: `${window.innerHeight}px`,}}>
            </div>

        </div>

        <div>

            <div className="carrousel_image" style={{
                background:`url(${slider3})`,
                height: `${window.innerHeight}px`,}}>
            </div>

        </div>
        
        </Slider>
            
        </div>
    );
};

export default Carrousel;