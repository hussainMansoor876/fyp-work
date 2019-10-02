import React, { Component } from 'react';
import './resources/styles.css';
import Home from './Home';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Register from './components/header-footer/Register';
import Privacy from './components/PrivacyPolicy/Privacy';
import Owner from './components/Dashboard/Owner/OwnerClass';
import Admin from './components/Dashboard/Admin/Admin';
import MessageToAdmin from './components/Dashboard/Owner/AdminMessage';
import Setting from './components/Dashboard/Owner/setting';
import Card from './components/Dashboard/Owner/Card';
import HallDetails from './components/Dashboard/Owner/HallDetails';
import OwnerBooking from './components/Dashboard/Owner/OwnerBooking'
import OwnerChat from './components/Dashboard/Owner/OwnerChat'



function PrivateRoute({ component: Component, isLoggedIn, ...rest }) {
  return (
    <Route
      {...rest}
      render={props => isLoggedIn === true ? (
        <Component {...props} />
      ) : (<Redirect to={{ pathname: "/", state: { from: props.location } }} />)
      }
    />
  );
}


class App extends Component {
  constructor() {
    super()

    this.state = {
      isLoggedIn: false,
      user: null,
    }

  }

  UNSAFE_componentWillMount() {
    const user = sessionStorage.getItem('user')
    if (user) {
      this.setState({ isLoggedIn: true, user })
    }
  }

  render() {
    return (

      <Router>
        <Switch>
          {/* <Route exact path="/" component={Check}/> */}
          <Route exact path="/" component={Home} />
          <Route exact path="/RegisterHall" component={Register} />
          <Route exact path="/PrivacyPolicy" component={Privacy} />
          <PrivateRoute isLoggedIn={(this.props.isLoggedIn || this.state.isLoggedIn)} exact path="/OwnerDashboard" component={Owner} />
          <Route exact path="/OwnerDashboard/booking" component={OwnerBooking} />
          <Route exact path="/OwnerDashboard/chat" component={OwnerChat} />
          <Route exact path="/AdminDashboard" component={Admin} />
          <Route exact path="/AdminMessage" component={MessageToAdmin} />
          <Route exact path="/Setting" component={Setting} />
          <Route exact path="/OwnerDashboard/Card" component={Card} />
          <Route exact path="/HallDetails" component={HallDetails} />



          <Redirect to="/404" />
        </Switch>

      </Router>
    );
  }
}
export default App;
