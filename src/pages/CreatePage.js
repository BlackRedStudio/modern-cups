import React from 'react';

import { Box, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import CupOptionsContainer from '../components/CupOptionsContainer';
import CupBlueprint from '../components/CupBlueprint';

const useStyles = makeStyles(() => ({
	createPageBox: {
		height: 'calc(100vh - 64px)'
	}
}));

const CreatePage = () => {
	const classes = useStyles();
	return (
		<Box className={classes.createPageBox}>
			<Grid container>
				<Grid item xs={12} md={6}>
					<CupBlueprint />
				</Grid>
				<Grid item xs={12} md={6}>
					<CupOptionsContainer />
				</Grid>
			</Grid>
		</Box>
	);
};

export default CreatePage;
