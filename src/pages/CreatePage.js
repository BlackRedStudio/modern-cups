import React, { Component } from 'react';
import { connect } from 'react-redux';

import subjx from 'subjx';
import 'subjx/dist/style/subjx.css';

import { Box, Grid } from '@material-ui/core';

import CupOptionsContainer from '../components/CupOptionsContainer';


class CreatePage extends Component {

	handleTextClick() {
		const xElem = subjx('.test');
		const xDraggables = xElem.drag({
			container: '#containerParent',
			restrict: '#containerParent',
			rotationPoint: true,
			snap: {
				x: 30,
				y: 30,
				angle: 25
			},
			resizable: false,
		});

	}

	rerenderParentCallback() {
		this.forceUpdate();
	}

	render() {

		let cupTextsTemplate = this.props.cupText.map(({id, value}) => (
			<div key={id} className="test" style={{position: 'absolute', 'left': 30, 'top': 30}} onClick={this.handleTextClick}>{value}</div>
		));

		return (
			<Box height="100vh">
				<Grid container>
					<Grid item xs={12} md={6} style={{'position': 'relative'}} id="containerParent">
						<img
						style={{width: '100%'}}
							src="https://via.placeholder.com/900x900"
							alt="Banner"
						/>
						{cupTextsTemplate}
					</Grid>
					<Grid item xs={12} md={6}>
						<CupOptionsContainer rerenderParentCallback={this.rerenderParentCallback.bind(this)} />
					</Grid>
				</Grid>
			</Box>
		);
	}
};

const mapStateToProps = state => ({
	cupText: state.cup.cupText
})

export default connect(mapStateToProps)(CreatePage);
