import React from 'react';

import { Typography, Box, Grid, Container } from '@material-ui/core';
import DoneIcon from '@material-ui/icons/Done';

const styles = {
	doneIcon: {
		marginRight: 8,
		color: '#4caf50',
	},
};

const AvailableOptions = () => {
	return (
		<section className="available-options">
			<Container fixed>
				<Box mb={3} mt={10}>
					<Typography variant="h2" color="textPrimary" align="center">
						Możesz dostosować wygląd do swoich potrzeb
					</Typography>
				</Box>
				<Box>
					<Grid container spacing={2}>
						<Grid item xs={12} md={6}>
							<Box display="flex" my={2}>
								<DoneIcon style={styles.doneIcon} />
								<Typography
									variant="h6"
									variantMapping={{ h6: 'p' }}
								>
									Lorem ipsum dolor sit amet consectetur
									adipisicing elit.
								</Typography>
							</Box>
						</Grid>
						<Grid item xs={12} md={6}>
							<Box display="flex" my={2}>
								<DoneIcon style={styles.doneIcon} />
								<Typography
									variant="h6"
									variantMapping={{ h6: 'p' }}
								>
									Lorem ipsum dolor sit amet consectetur
									adipisicing elit.
								</Typography>
							</Box>
						</Grid>
						<Grid item xs={12} md={6}>
							<Box display="flex" my={2}>
								<DoneIcon style={styles.doneIcon} />
								<Typography
									variant="h6"
									variantMapping={{ h6: 'p' }}
								>
									Lorem ipsum dolor sit amet consectetur
									adipisicing elit.
								</Typography>
							</Box>
						</Grid>
						<Grid item xs={12} md={6}>
							<Box display="flex" my={2}>
								<DoneIcon style={styles.doneIcon} />
								<Typography
									variant="h6"
									variantMapping={{ h6: 'p' }}
								>
									Lorem ipsum dolor sit amet consectetur
									adipisicing elit.
								</Typography>
							</Box>
						</Grid>
						<Grid item xs={12} md={6}>
							<Box display="flex" my={2}>
								<DoneIcon style={styles.doneIcon} />
								<Typography
									variant="h6"
									variantMapping={{ h6: 'p' }}
								>
									Lorem ipsum dolor sit amet consectetur
									adipisicing elit.
								</Typography>
							</Box>
						</Grid>
						<Grid item xs={12} md={6}>
							<Box display="flex" my={2}>
								<DoneIcon style={styles.doneIcon} />
								<Typography
									variant="h6"
									variantMapping={{ h6: 'p' }}
								>
									Lorem ipsum dolor sit amet consectetur
									adipisicing elit.
								</Typography>
							</Box>
						</Grid>
					</Grid>
				</Box>
			</Container>
		</section>
	);
};

export default AvailableOptions;
