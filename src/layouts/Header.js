import React from 'react';
import { NavLink } from 'react-router-dom';

import { AppBar, Toolbar, Button, Box } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';


const Header = () => {

	const theme = useTheme();
	const {main} = theme.palette.secondary;

	return (
		<>
			<AppBar>
				<Toolbar>
					<Box component="nav" textAlign="center" width="100%">
						<Button
							size="large"
							color="inherit"
							exact
							to="/"
							component={NavLink}
							activeStyle={{
								backgroundColor: main
							}}
						>
							Strona Główna
						</Button>
						<Button
							size="large"
							color="inherit"
							to="/create"
							component={NavLink}
							activeStyle={{
								backgroundColor: main
							}}
						>
							Stwórz kubek
						</Button>
						<Button
							size="large"
							color="inherit"
							to="/contact"
							component={NavLink}
							activeStyle={{
								backgroundColor: main
							}}
						>
							Kontakt
						</Button>
					</Box>
				</Toolbar>
			</AppBar>
			<Toolbar />
		</>
	);
};

export default Header;
