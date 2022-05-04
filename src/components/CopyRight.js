
import { Fragment } from 'react';
import Typography from '@mui/material/Typography';

function Copyright(props) {
    return (
        <Fragment>
            <Typography variant="body2" color="text.secondary" align="center" {...props}>
                {'Copyright © '}
                {new Date().getFullYear()}
                {'.'}
            </Typography>
        </Fragment>
        );
    }

  export default function CopyrightComponent () {
    return (
        <Copyright sx={{ pt: 4 }} />
    )
}