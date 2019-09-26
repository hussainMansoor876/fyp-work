import React from 'react';
import iconCalendar from '../../resources/images/icons/calendar.png';
import iconLocation from '../../resources/images/icons/location.png';
import Zoom from 'react-reveal/Zoom';
import '../../resources/bootstrap.min.css';

const VenueInfo = () => {
    return (
        <div className="bck_black">
        
            <div style={{textAlign:'center'}}>
                <div className="vn_wrapper">
                <Zoom duration={500}>
               
                    <div className="vn_item">
                        <div className="vn_outer">
                            <div className="vn_inner">
                                <div className="vn_icon_square bck_red"></div>
                                <div className="vn_icon" style={{background:`url(${iconCalendar})`}}></div> 
                                <div className="vn_title">Date & time</div>
                                <div className="vn_desc">MON - SAT 10.00am - 5pm</div>
                            </div>
                        </div>
                    </div>
                </Zoom>
                <Zoom duration={500} delay={500}>
                <div className="vn_item">
                    <div className="vn_outer">
                        <div className="vn_inner">
                            <div className="vn_icon_square bck_yellow"></div>
                            <div className="vn_icon" style={{background:`url(${iconLocation})`}}></div> 
                            <div className="vn_title">Location</div>
                            <div className="vn_desc">A133 Gulshan-e-ismail, Karachi</div>
                        </div>
                    </div>
                </div>
                </Zoom>
                
                </div>
            </div>
        </div>
    );
};

export default VenueInfo;