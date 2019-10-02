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

class App extends Component {
  constructor() {
    super()
  }

  render() {
    return (

      <Router>
        <Switch>
          {/* <Route exact path="/" component={Check}/> */}
          <Route exact path="/" component={Home} />
          <Route exact path="/RegisterHall" component={Register} />
          <Route exact path="/PrivacyPolicy" component={Privacy} />
          <Route exact path="/OwnerDashboard" component={Owner} />
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
