import React, { Component } from 'react';
import clsx from 'clsx';
import '../../../resources/bootstrap.min.css';
import Footer from '../../header-footer/Footer';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import UserIcon from '@material-ui/icons/AccountCircle';
import { Button } from '@material-ui/core';
import RegisterIcon from '@material-ui/icons/AddCircle'
import Message from '@material-ui/icons/Message';
import { Link } from 'react-router-dom';

class OwnerBooking extends Component {


    render() {

        return (
            <div>
                <AppBar style={{ background: '#3c3c3c' }} position="absolute">
                    <Toolbar>
                        <Typography component="h1" variant="h6" color="inherit" >
                            Owner Dashboard
          </Typography>
                        <div style={{ marginLeft: 'auto', marginRight: '-12px' }}>
                            <Button style={{ color: 'white' }}>Browse Venue</Button>
                            <Button style={{ color: 'white' }}>Manage Venues</Button>
                            <Button style={{ color: 'white' }}>Logout</Button>

                            <IconButton style={{ color: '#ffffff' }} title="Message">
                                <Message />
                            </IconButton>

                            <Link to="/RegisterHall">
                                <IconButton style={{ color: '#ffffff' }} title="Register Hall">
                                    <RegisterIcon />
                                </IconButton>
                            </Link>


                            <IconButton color="inherit" title="Profile">
                                <UserIcon />
                            </IconButton>
                        </div>

                    </Toolbar>
                </AppBar>

                <Footer />
            </div>


        );
    }
}

export default OwnerBooking;