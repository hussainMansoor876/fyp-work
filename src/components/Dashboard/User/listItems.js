import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import SettingIcon from '@material-ui/icons/Settings';
import FeedbackIcon from '@material-ui/icons/Feedback';
import BookingIcon from '@material-ui/icons/AssignmentTurnedIn';
import Logout from '@material-ui/icons/Feedback';

import { Link } from 'react-router-dom';

import MessageIcon from '@material-ui/icons/Message';
import AssignmentIcon from '@material-ui/icons/Assignment';


function logout(){
  sessionStorage.removeItem('user')
  window.location.reload()
}

export const mainListItems = (
  <div>
    <Link to="/OwnerDashboard">
      <ListItem button>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>
    </Link>

    <Link to="/searchResult">
      <ListItem button>
        <ListItemIcon>
          <BookingIcon />
        </ListItemIcon>
        <ListItemText primary="Search Venue" />
      </ListItem>
    </Link>

    <Link to="/OwnerDashboard/chat">
      <ListItem button>
        <ListItemIcon>
          <MessageIcon />
        </ListItemIcon>
        <ListItemText primary="Messages" />
      </ListItem>
    </Link>

    <Link to="/userDashboard/setting">
      <ListItem button>
        <ListItemIcon>
          <SettingIcon />
        </ListItemIcon>
        <ListItemText primary="Setting" />
      </ListItem>
    </Link>

    <Link>
      <ListItem button>
        <ListItemIcon>
          <Logout />
        </ListItemIcon>
        <ListItemText primary="Logout" onClick={() => logout()} />
      </ListItem>
    </Link>

  </div>
);

export const secondaryListItems = (

  <div>
    <Link to="/AdminMessage">
      <ListItem button >
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText secondary="Message to admin" />
      </ListItem></Link>

    <ListItem button>
      <ListItemIcon>
        <FeedbackIcon />
      </ListItemIcon>
      <ListItemText primary="Feedback" />
    </ListItem>
    {/* <Link to="/OwnerDashboard/Card">
      <ListItem button>
        <ListItemIcon>
          <FeedbackIcon />
        </ListItemIcon>
        <ListItemText primary="Card" />
      </ListItem>
    </Link>
    <Link to="/HallDetails">
      <ListItem button>
        <ListItemIcon>
          <FeedbackIcon />
        </ListItemIcon>
        <ListItemText primary="Hall Details" />
      </ListItem>
    </Link> */}
  </div>
);