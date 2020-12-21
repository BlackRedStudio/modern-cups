import React from 'react';

import { Box, Grid } from '@material-ui/core';

import CupOptionsContainer from '../components/CupOptionsContainer';
import CupBlueprint from '../components/CupBlueprint';


const CreatePage = () => {

	return (
		<Box height="100vh">
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
