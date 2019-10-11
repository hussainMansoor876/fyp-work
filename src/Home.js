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
  constructor() {
    super()

    this.state={

    }
  }

  componentWillMount(){
    sessionStorage.removeItem('search')
  }

  render() {
    return (


      <div>

        <Element name="Home">
          <Header />
        </Element>

        <Featured />

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
