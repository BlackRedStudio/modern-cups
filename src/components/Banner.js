import React from 'react';
import {Link as RouterLink} from 'react-router-dom'

import { Grid, Typography, Box, Link } from '@material-ui/core';

const Banner = () => {
	return (
		<Box component="section" mb={2}>
			<Grid container>
				<Grid item xs={12} md={6}>
					<img
						src="https://via.placeholder.com/900x900"
						alt="Banner"
					/>
				</Grid>
				<Grid item xs={12} md={6}>
					<Box
						p={2}
						display="flex"
						height="100%"
						flexWrap="wrap"
						justifyContent="center"
						alignContent="center"
					>
						<Box width="100%">
							<Typography
								variant="h1"
								color="textPrimary"
								align="center"
							>
								Modern Cups
							</Typography>
						</Box>
						<Box mt={3} width="100%">
							<Typography
								variant="h2"
								component="p"
								color="textPrimary"
								align="center"
							>
								Oto Twój Kubek
							</Typography>
						</Box>
						<Box mt={4} width="100%">
							<Typography
								variant="h4"
								component="p"
								color="textPrimary"
								align="center"
							>
								Możesz stworzyć swój własny kubek, wystarczy
								przejść <Link to="/create" component={RouterLink}>Tutaj</Link>
							</Typography>
						</Box>
					</Box>
				</Grid>
			</Grid>
		</Box>
	);
};

export default Banner;
