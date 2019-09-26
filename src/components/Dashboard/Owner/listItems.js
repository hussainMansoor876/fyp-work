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

export const mainListItems = (
    <div>
      <ListItem button>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>

      <ListItem button>
        <ListItemIcon>
          <BookingIcon />
        </ListItemIcon>
        <ListItemText primary="Bookings" />
      </ListItem>

      <ListItem button>
        <ListItemIcon>
          <MessageIcon />
        </ListItemIcon>
        <ListItemText primary="Messages" />
      </ListItem>
    <Link to="/Setting">
      <ListItem button>
        <ListItemIcon>
          <SettingIcon />
        </ListItemIcon>
        <ListItemText primary="Setting" />
      </ListItem>
      </Link>

      <ListItem button>
        <ListItemIcon>
          <Logout />
        </ListItemIcon>
        <ListItemText primary="Logout" />
      </ListItem>

    </div>
  );
  
export const secondaryListItems=(
  
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
  <Link to="/OwnerDashboard/Card">
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
      </Link>
  </div>
);