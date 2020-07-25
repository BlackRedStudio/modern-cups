import React, { Component } from 'react';

import { Box, Grid } from '@material-ui/core';

import AddContentField from './cup-options/AddContentField';

class CupOptionsContainer extends Component {
	state = {
		textFieldsArray: [
			{
				id: 1,
				label: 'Treść nr',
				value: '',
				error: null,
			},
		],
		textFieldsError: null,
	};

	addFieldText = () => {
		const { textFieldsArray } = this.state;

		if (textFieldsArray.length < 4) {
			const currentId = textFieldsArray.length + 1;

			const textField = {
				id: currentId,
				label: 'Treść nr',
				value: '',
				error: null,
			};

			this.setState({
				textFieldsArray: [...textFieldsArray, textField],
			});
		}
		if (textFieldsArray.length > 2) {
			this.setState({
				textFieldsError: 'Maksymalna liczba treści to 4',
			});
		}
	};

	changeFieldText = e => {
		const { textFieldsArray } = this.state;

		const fieldIndex = e.target.getAttribute('index');

		if (e.target.value.length < 33) {
            textFieldsArray[fieldIndex - 1].error = null;
			textFieldsArray[fieldIndex - 1].value = e.target.value;
		} else {
			textFieldsArray[fieldIndex - 1].error =
				'Maksymalna długość tekstu to 32 znaki';
		}
		this.setState({
			textFieldsArray,
		});
	};

	render() {
		const { textFieldsArray, textFieldsError } = this.state;

		return (
			<Box p={4}>
				<Grid container spacing={4}>
					<Grid item xs={12} md={6}>
						<AddContentField
							textFieldsArray={textFieldsArray}
							click={this.addFieldText}
							textFieldsError={textFieldsError}
							change={this.changeFieldText}
						/>
					</Grid>
					<Grid item xs={12} md={6}>
						{/* <TextField
							fullWidth={true}
							id="cup-content"
							label="Treść"
						/> */}
					</Grid>
				</Grid>
			</Box>
		);
	}
}

export default CupOptionsContainer;
