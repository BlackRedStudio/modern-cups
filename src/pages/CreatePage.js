import React from 'react';

import { Box, Grid } from '@material-ui/core';

import CupOptionsContainer from '../components/CupOptionsContainer';

const CreatePage = () => {

	return (
		<Box height="100vh">
			<Grid container>
				<Grid item xs={12} md={6}>
					<img
                    style={{width: '100%'}}
						src="https://via.placeholder.com/900x900"
						alt="Banner"
					/>
				</Grid>
				<Grid item xs={12} md={6}>
                    <CupOptionsContainer />
				</Grid>
			</Grid>
		</Box>
	);
};

export default CreatePage;
