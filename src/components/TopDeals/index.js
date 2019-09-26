import React from 'react';
import Description from './Description';
import Discount from './Discount';
import '../../resources/bootstrap.min.css';

const TopDeals = () => {
    return (
        <div className="highlight_wrapper">
            <Description/>
            <Discount/>
        </div>
    );
};

export default TopDeals;