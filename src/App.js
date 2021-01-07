import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { themeDefault } from './ThemeDefault';

import './style.scss';

import Header from './layouts/Header';
import HomePage from './pages/HomePage';
import CreatePage from './pages/CreatePage';
import ContactPage from './pages/ContactPage';
import Error404Page from './pages/Error404Page';
import Footer from './layouts/Footer';
import ScrollToTop from './components/ScrollToTop';
import PreviewWindow from './components/PreviewWindow';

class App extends Component {
	state = {};

	render() {
		return (
			<Router>
				<ThemeProvider theme={themeDefault}>
					<CssBaseline />
					<ScrollToTop />
					<Header />
					<main>
						<Switch>
							<Route exact path="/">
								<HomePage />
								<Footer />
							</Route>
							<Route exact path="/create">
								<CreatePage />
							</Route>
							<Route exact path="/contact">
								<ContactPage />
								<Footer />
							</Route>
							<div>
								<Error404Page />
								<Footer />
							</div>
						</Switch>
						<PreviewWindow />
					</main>
				</ThemeProvider>
			</Router>
		);
	}
}

export default App;
