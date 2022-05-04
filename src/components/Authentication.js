import * as React from 'react';
import PropTypes from 'prop-types';
import AccountCircle from '@mui/icons-material/AccountCircle';
import IconButton from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import { ipcRenderer } from 'electron';
import Realm from 'realm';

export default function AuthenticationContent () {
    const [credentials, setCredentials] = React.useState({ username: '', password: ''});
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            <AuthenticationComponent handleClickOpen={ handleClickOpen } />
            <AuthenticationDialog setCredentials={ setCredentials } open={open} onClose={handleClose} />
        </React.Fragment>
    )
}

function AuthenticationDialog (props) {
    const { onClose, open } = props;

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
        ipcRenderer.send('authentication', {
            username: username,
            password: password
        });
        ipcRenderer.on('authentication-reply', (event, response) => {
            console.log(response);
        })
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
            <Button onClick={ handleLogin }>Sign in</Button>
        </DialogActions>
        </Dialog>
    );
}

AuthenticationDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
};

function AuthenticationComponent (props) {
    return (
        <IconButton color="inherit" onClick={props.handleClickOpen}>
            <AccountCircle />
        </IconButton>
    )
}