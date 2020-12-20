import React, { Component } from 'react';

import { Box, Grid } from '@material-ui/core';

import AddRemoveContentField from './cup-options/AddRemoveContentField';

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
		textFieldsError: 2,
		textFieldsErrorMessage: 'Nie można usunąć pierwotnego pola tekstowego',
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
				textFieldsError: null,
				textFieldsErrorMessage: null,
			});
		}
		if (textFieldsArray.length > 2) {
			this.setState({
				textFieldsError: 1,
				textFieldsErrorMessage: 'Maksymalna liczba treści to 4',
			});
		}
	};

	removeFieldText = () => {
		const { textFieldsArray } = this.state;

		if (textFieldsArray.length > 1) {
			this.setState({
				textFieldsArray: textFieldsArray.slice(0, -1),
			});
		}
		if(textFieldsArray.length < 3) {
			this.setState({
				textFieldsError: 2,
				textFieldsErrorMessage: 'Nie można usunąć pierwotnego pola tekstowego',
			});
		}
	}

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
		const { textFieldsArray, textFieldsError, textFieldsErrorMessage } = this.state;

		return (
			<Box p={4}>
				<Grid container spacing={4}>
					<Grid item xs={12} md={6}>
						<AddRemoveContentField
							textFieldsArray={textFieldsArray}
							click={this.addFieldText}
							clickSecond={this.removeFieldText}
							textFieldsError={textFieldsError}
							textFieldsErrorMessage={textFieldsErrorMessage}
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
