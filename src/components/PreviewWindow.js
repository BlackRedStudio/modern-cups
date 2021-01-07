import React from 'react';
import { connect } from 'react-redux';
import {Link as RouterLink} from 'react-router-dom'

import { Typography, useTheme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const PreviewWindow = ({ previewImage }) => {
    const theme = useTheme();

    const useStyles = makeStyles(() => ({
        previewWindow: {
            position: 'fixed',
            bottom: 0,
            right: 0,
            zIndex: 1004,
            textDecoration: 'none',
            transition: '350ms',
            '&:hover': {
                opacity: 0.8,
                '& p': {
                    color: theme.palette.primary.main
                }
            }
        },
        previewWindowText: {
            textAlign: 'center',
            color: '#000',
            marginBottom: 7,
        },
    }));
    const classes = useStyles();

    console.log(theme)
    if(!previewImage) return false;
	return (
        <RouterLink className={classes.previewWindow} to="/create">
            <Typography className={classes.previewWindowText} variant="body1">Podgląd:</Typography>
			<img style={{width: 150, height: 150}} src={previewImage} alt="" />
        </RouterLink>
	);
};

const mapStateToProps = state => ({
	previewImage: state.cup.previewImage,
});

export default connect(mapStateToProps)(PreviewWindow);
