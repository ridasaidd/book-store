import * as React from 'react';
import PropTypes from 'prop-types';
import { blue, pink } from '@mui/material/colors';
import { ipcRenderer } from 'electron';

import AccountCircle from '@mui/icons-material/AccountCircle';
import IconButton from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';

import AddIcon from '@mui/icons-material/Add';

export default function AuthenticationContent () {
    const [open, setOpen] = React.useState(false);
    const [authenticated, setAuthenticated] = React.useState(false);

    React.useEffect(() => {
        if (localStorage.getItem('key') !== null) {
            setAuthenticated(true);
        }
    });
    
    const handleClose = () => {
        setOpen(false);
    };

    const handleSignOut = () => {
        setAuthenticated (false);
        localStorage.removeItem('key');
        handleClose ();
    }

    const authenticate = (credentials) => {
        ipcRenderer.on('logged-in', (event, response) => {
            if (response.type === 'user') {
                setAuthenticated(true);
                localStorage.setItem('key', response.key);
                handleClose ();
            } else {
                
            }
        })
        ipcRenderer.send('log-in', credentials);
    }

    return (
        <React.Fragment>
            <AuthenticationComponent setOpen={ setOpen } handleSignOut={ handleSignOut } authenticated={ authenticated } />
            <AuthenticationDialog open={ open } onClose={ handleClose } authenticate={ authenticate } />
        </React.Fragment>
    )
}

function AuthenticationDialog (props) {
    const { onClose, open, authenticate } = props;

    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");

    const handleClose = () => {
        setUsername("");
        setPassword("");
        onClose();
    };

    function handleUsernameChange (event) {
        setUsername(event.target.value)
    }

    function handlePasswordChange (event) {
        setPassword(event.target.value)
    }

    function handleLogin () {
        authenticate ({
            username: username,
            password: password
        });
    }

    return (
        <Dialog onClose={handleClose} open={open}>
        <DialogTitle>Sign in</DialogTitle>
        <DialogContent>
            <TextField autoFocus margin="dense" id="dialogInputUsername" label="Username" type="text" fullWidth variant="standard" value={ username } onChange={ handleUsernameChange } />
            <TextField margin='dense' id="dialogInputPassword" label="Password" type="password" fullWidth variant="standard" value={ password } onChange={ handlePasswordChange } />
        </DialogContent>
        <DialogActions>
            <Button onClick={ handleClose }>Cancel</Button>
            <Button onClick={ handleLogin } disabled={ username.length < 4 || password.length < 4 }>Sign in</Button>
        </DialogActions>
        </Dialog>
    );
}

AuthenticationDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    authenticate: PropTypes.func
};

function AuthenticationComponent ({ setOpen, handleSignOut, authenticated }) {
    const IconBtn = () => {
        if (!authenticated) {
            return <GuestIconButtonComponent setOpen={ setOpen } />
        } else {
            return <AuthenticatedButtonComponent handleSignOut={ handleSignOut } />
        }
    }
    
    return (
        <IconBtn />
    )
}

function GuestIconButtonComponent ({ setOpen }) {
    const handleClickOpen = () => {
        setOpen(true);
    };

    return (
        <React.Fragment>
            <Tooltip title="Sign in">
                <IconButton color="inherit" onClick={ handleClickOpen }>
                    <AccountCircle />
                </IconButton>
            </Tooltip>
        </React.Fragment>
    );
}

function AuthenticatedButtonComponent ({ handleSignOut }) {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        localStorage.removeItem('key');
        handleSignOut ();
        setAnchorEl(null);
    };

    return (
        <React.Fragment>
            <Tooltip title="Add new book">
                <IconButton color="inherit" sx={{ bgcolor: blue[500] }}>
                    <AddIcon />
                </IconButton>
            </Tooltip>
            <Tooltip title="Open Settings">
                <IconButton color='inherit' onClick={ handleMenu }>
                    <Avatar sx={{ bgcolor: pink[500] }}>{ localStorage.getItem('key').charAt(0).toUpperCase() }</Avatar>
                </IconButton>
            </Tooltip>
            <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Sign Out</MenuItem>
              </Menu>
        </React.Fragment>
    )
}