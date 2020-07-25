import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { themeDefault } from './ThemeDefault';

import Header from './layouts/Header';
import HomePage from './pages/HomePage';
import CreatePage from './pages/CreatePage';
import ContactPage from './pages/ContactPage';
import Error404Page from './pages/Error404Page';
import Footer from './layouts/Footer';

class App extends Component {
	state = {};
	render() {
		return (
			<Router>
				<ThemeProvider theme={themeDefault}>
					<CssBaseline />
					<Header />
					<main>
						<Switch>
							<Route exact path="/">
								<HomePage />
							</Route>
							<Route exact path="/create">
								<CreatePage />
							</Route>
							<Route exact path="/contact">
								<ContactPage />
							</Route>
							<Error404Page />
						</Switch>
					</main>
					<Footer />
				</ThemeProvider>
			</Router>
		);
	}
}

export default App;
