import React, { Component } from 'react';
import { connect } from 'react-redux';

import { addTextToCup } from '../redux/cup/cup-actions';

import { Box, Grid, TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';

import AddRemoveContentField from './cup-options/AddRemoveContentField';

class CupOptionsContainer extends Component {
	state = {
		textFieldsArray: [
			{
				id: 1,
				label: 'Treść nr',
				value: '',
				error: null,
				fontSize: 16,
				color: '#000',
				fontFamily: ''
			},
		],
		textFieldsError: 2,
		textFieldsErrorMessage: 'Nie można usunąć pierwotnego pola tekstowego',
		currentTextFieldsOptions: 0,
		fontData: null,
	};
	limitUpdate = false;

	addFieldText = () => {
		const { textFieldsArray } = this.state;

		if (textFieldsArray.length < 4) {
			const currentId = textFieldsArray.length + 1;

			const textField = {
				id: currentId,
				label: 'Treść nr',
				value: '',
				error: null,
				fontSize: 16,
				color: '#000',
				fontFamily: ''
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
		if (textFieldsArray.length < 3) {
			this.setState({
				textFieldsError: 2,
				textFieldsErrorMessage: 'Nie można usunąć pierwotnego pola tekstowego',
			});
		}
		this.setState({
			currentTextFieldsOptions: 0,
		});
	};

	changeFieldText = e => {
		const { textFieldsArray } = this.state;

		const fieldIndex = e.target.getAttribute('index');

		if (e.target.value.length < 33) {
			textFieldsArray[fieldIndex - 1].error = null;
			textFieldsArray[fieldIndex - 1].value = e.target.value;
		} else {
			textFieldsArray[fieldIndex - 1].error = 'Maksymalna długość tekstu to 32 znaki';
		}
		this.setState({
			textFieldsArray,
		});
	};
	changeInputField = e => {
		const { textFieldsArray } = this.state;
		let fieldIndex = 0;
		let inputType = '';

		if(e.target.tagName === 'LI') {
			fieldIndex = e.target.parentNode.getAttribute('index');
			inputType = e.target.parentNode.getAttribute('input_type');
		} else {
			fieldIndex = e.target.getAttribute('index');
			inputType = e.target.getAttribute('input_type');
		}
		if (inputType !== 'color') {
				if(inputType === 'fontSize') {
					textFieldsArray[fieldIndex].fontSize = e.target.value;
				} else if(inputType === 'fontFamily') {
					textFieldsArray[fieldIndex].fontFamily = e.target.value;
				}
				else if(inputType === 'fontFamilySelectbox') {
					textFieldsArray[fieldIndex].fontFamily = e.target.innerText;
				}
				console.log(e.target)
			this.setState({
				textFieldsArray,
			});
		} else if (inputType === 'color') {
			textFieldsArray[fieldIndex].color = e.target.value;
			if (this.limitUpdate === false) {
				this.limitUpdate = true;
				setTimeout(() => {
					this.setState({
						textFieldsArray,
					});
					this.limitUpdate = false;
				}, 500);
			}
		}
	};
	focusFieldText = e => {
		let currAttr = e.target.getAttribute('index');
		this.setState({
			currentTextFieldsOptions: currAttr - 1,
		});
	};

	componentDidUpdate() {
		const { textFieldsArray } = this.state;
		this.props.addTextToCup(textFieldsArray);
	}
	componentDidMount() {
		let apiKey = 'AIzaSyDS3_wxnGJUlvJZ_SvQySSI9tGuFos3BKQ';

		fetch('https://www.googleapis.com/webfonts/v1/webfonts?key=' + apiKey)
			.then(res => res.json())
			.then(({ items }) =>
				this.setState({
					fontData: items,
				})
			);
	}
	render() {
		const {
			textFieldsArray,
			textFieldsError,
			textFieldsErrorMessage,
			currentTextFieldsOptions,
			fontData,
		} = this.state;
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
							focus={this.focusFieldText}
						/>
					</Grid>
					<Grid item xs={12} md={6}>
						<TextField
							inputProps={{
								index: currentTextFieldsOptions,
								input_type: 'fontSize',
							}}
							label="Rozmiar czcionki"
							type="number"
							value={textFieldsArray[currentTextFieldsOptions].fontSize}
							onChange={this.changeInputField}
						/>
						<TextField
							inputProps={{
								index: currentTextFieldsOptions,
								input_type: 'color',
							}}
							label="Kolor"
							type="color"
							value={textFieldsArray[currentTextFieldsOptions].color}
							onChange={this.changeInputField}
							style={{ width: 30 }}
						/>
						{fontData && (
							<Autocomplete
							style={{marginTop: 24}}
								options={fontData}
								getOptionLabel={option => option.family}
								autoHighlight
								onChange={this.changeInputField}
								ListboxProps={{
									index: currentTextFieldsOptions,
									input_type: 'fontFamilySelectbox',
								}}
								inputValue={textFieldsArray[currentTextFieldsOptions].fontFamily}
								renderInput={params => (
									<TextField
										{...params}
										inputProps={{
											...params.inputProps,
											index: currentTextFieldsOptions,
											input_type: 'fontFamily',
										}}
										label="Wybierz czcionkę"
										variant="outlined"
										onChange={this.changeInputField}
									/>
								)}
							/>
						)}
					</Grid>
				</Grid>
			</Box>
		);
	}
}

const mapDispatchToProps = dispatch => ({
	addTextToCup: text => dispatch(addTextToCup(text)),
});

export default connect(null, mapDispatchToProps)(CupOptionsContainer);
