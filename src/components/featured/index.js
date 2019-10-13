import React from 'react';
import Carrousel from './Carrousel';
import Search from './Search';
import '../../resources/bootstrap.min.css';


class Featured extends React.Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }


    render() {
        return (
            <div style={{ position: 'relative' }}>
                <Carrousel />

                <div className="artist_name">
                    <div className="wrapper">Let Us Help You Create</div>
                </div>
                <Search props={this.props.props} />
            </div>
        );
    }
}


export default Featured;