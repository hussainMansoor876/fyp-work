import React, { Component } from 'react';
import './resources/styles.css';
import Header from './components/header-footer/Header';
import Featured from './components/featured';
import VenueInfo from './components/venueInfo';
import TopDeals from './components/TopDeals';
import Categories from './components/categories';
import Footer from './components/header-footer/Footer';
import AboutUs from './components/AboutUs';
import SearchByEmail from './components/SearchByEmail';
import { Link } from 'react-router-dom';
import { Element } from 'react-scroll';
import './resources/bootstrap.min.css';

class Home extends Component {
  constructor(props) {
    super(props)

    this.state={

    }
  }

  componentWillMount(){
    // sessionStorage.removeItem('search')
    // const user = JSON.parse(sessionStorage.getItem('user'))
    // if(user){
    //   console.log(user)
    //   if(user.accountType === "2"){
    //     this.props.history.push('/OwnerDashboard')
    //   }
    //   else{
    //     this.props.history.push('/userDashboard')
    //   }
    // }
  }

  render() {
    return (


      <div>

        <Element name="Home">
          <Header />
        </Element>

        <Featured props={this.props} />

        <Element name="Categories">
          <Categories />
        </Element>

        <Element name="AboutUs">
          <AboutUs />
        </Element>





        <TopDeals />
        {/* <VenueInfo/> */}

        <SearchByEmail />
        <Footer />
      </div>

    );
  }
}
export default Home;
