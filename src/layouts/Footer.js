import React from 'react';

import { Grid, Link, Typography, Container, Box } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';

const Footer = () => {
	return (
		<Container component="footer" fixed>
			<Box py={10}>
				<Grid container spacing={4}>
					<Grid item xs={12} md={4}>
						Lorem ipsum dolor sit amet consectetur adipisicing elit.
						Amet rerum ratione pariatur, incidunt velit vel numquam
						ea nemo.
					</Grid>
					<Grid item xs={12} md={4}>
						Lorem ipsum dolor sit amet consectetur adipisicing elit.
						Amet rerum ratione pariatur, incidunt velit vel numquam
						ea nemo.
					</Grid>
					<Grid item xs={12} md={4}>
						<Typography>
							<Link to="/" component={RouterLink}>
								Strona Główna
							</Link>
						</Typography>
						<Typography>
							<Link to="/create" component={RouterLink}>
								Stwórz Kubek
							</Link>
						</Typography>
						<Typography>
							<Link to="/contact" component={RouterLink}>
								Kontakt
							</Link>
						</Typography>
					</Grid>
				</Grid>
			</Box>
		</Container>
	);
};

export default Footer;
