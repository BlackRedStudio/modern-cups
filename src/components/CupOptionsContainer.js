import React, { Component } from 'react';
import { connect } from 'react-redux';

import html2canvas from 'html2canvas';

import { addTextToCup } from '../redux/cup/cup-actions';

import { Box, Grid, TextField, Button, FormControl, InputLabel, Select, Typography } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import Autocomplete from '@material-ui/lab/Autocomplete';

import AddRemoveContentField from './cup-options/AddRemoveContentField';
import AddRemoveImage from './cup-options/AddRemoveImage';

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
				fontFamily: '',
				variants: null,
				fontWeight: null,
				fontStyle: 'normal'
			},
		],
		textFieldsError: 2,
		textFieldsErrorMessage: 'Nie można usunąć pierwotnego pola tekstowego',
		currentTextFieldsOptions: 0,
		fontData: null,
		emojiData: null,
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
				fontFamily: '',
				variants: null,
				fontWeight: null,
				fontStyle: 'normal'
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
		const isEmoji = e.target.getAttribute('emoji');

		let value = null;
		let valueLength = 0;

		if(!isEmoji) {
			value = e.target.value;
			valueLength = e.target.value.length;
		} else {
			value = textFieldsArray[fieldIndex - 1].value + e.target.innerText;
			valueLength = textFieldsArray[fieldIndex - 1].value.length + 1;
		}

		if (valueLength < 33) {
			textFieldsArray[fieldIndex - 1].error = null;
			textFieldsArray[fieldIndex - 1].value = value;
		} else {
			textFieldsArray[fieldIndex - 1].error = 'Maksymalna długość tekstu to 32 znaki';
		}
		this.setState({
			textFieldsArray,
		});
	};
	changeInputField = (e, value = null, reason = null, option = null, fieldIndexParam = null) => {
		const { textFieldsArray, fontData } = this.state;
		let fieldIndex = 0;
		let inputType = '';
		if (e.target.tagName === 'LI') {
			fieldIndex = e.target.parentNode.getAttribute('index');
			inputType = e.target.parentNode.getAttribute('input_type');
		} else {
			fieldIndex = e.target.getAttribute('index');
			inputType = e.target.getAttribute('input_type');
		}
		if (inputType !== 'color') {
			let fontFamily = '';
			if (inputType === 'fontSize') {
				textFieldsArray[fieldIndex].fontSize = e.target.value;
			} else if (inputType === 'fontFamily') {
				fontFamily = e.target.value;
				textFieldsArray[fieldIndex].fontFamily = fontFamily;
			} else if (inputType === 'fontFamilySelectbox') {
				fontFamily = e.target.innerText;
				textFieldsArray[fieldIndex].fontFamily = fontFamily;
			} else if(inputType === 'fontVariantSelectbox') {
				let fontWeight = e.target.value.match(/\d+/);
				let fontStyle = e.target.value.match(/italic/i);
				let isRegular = e.target.value.match(/regular/i);
				if(fontWeight)
					textFieldsArray[fieldIndex].fontWeight = fontWeight[0];
				if(isRegular || (!fontWeight && fontStyle))
					textFieldsArray[fieldIndex].fontWeight = '400';
				if(fontStyle)
					textFieldsArray[fieldIndex].fontStyle = fontStyle[0];
				else
				textFieldsArray[fieldIndex].fontStyle = 'normal';
			}
			if (inputType === 'fontFamily' || inputType === 'fontFamilySelectbox') {
				textFieldsArray[fieldIndex].fontWeight = '400';
				textFieldsArray[fieldIndex].fontStyle = 'normal';
				let moreFontData = fontData.filter(v => v.family === fontFamily);
				if(moreFontData[0])
					textFieldsArray[fieldIndex].variants = moreFontData[0].variants;
			}
			if(reason === 'clear') {
				textFieldsArray[fieldIndexParam].fontWeight = '400';
				textFieldsArray[fieldIndexParam].fontStyle = 'normal';
				textFieldsArray[fieldIndexParam].fontFamily = '';
			}
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
		let apiGoogleFontsKey = 'AIzaSyDS3_wxnGJUlvJZ_SvQySSI9tGuFos3BKQ';

		fetch('https://www.googleapis.com/webfonts/v1/webfonts?key=' + apiGoogleFontsKey)
			.then(res => res.json())
			.then(({ items }) =>
				this.setState({
					fontData: items,
				})
			);

		let apiEmojiKey = '57867ad3fe2e975e6e90fe7bbd60d50680f12fd7';

		fetch('https://emoji-api.com/categories/smileys-emotion?access_key=' + apiEmojiKey)
		.then(res => res.json())
		.then(emojiData => {
			this.setState({
				emojiData
			})
		})
	}
	takeScreenshot() {
		let elToScreenshot = document.getElementById('containerParent');
		html2canvas(elToScreenshot).then(function (canvas) {
			document.body.appendChild(canvas);
		});
	}
	render() {
		const {
			textFieldsArray,
			textFieldsError,
			textFieldsErrorMessage,
			currentTextFieldsOptions,
			fontData,
			emojiData,
		} = this.state;
		return (
			<Box p={4}>
				<Grid container spacing={4}>
					<Grid item xs={12} md={6}>
						<Typography variant="subtitle1" align="center" paragraph color="initial">Dodaj treść</Typography>
						<AddRemoveContentField
							textFieldsArray={textFieldsArray}
							click={this.addFieldText}
							clickSecond={this.removeFieldText}
							textFieldsError={textFieldsError}
							textFieldsErrorMessage={textFieldsErrorMessage}
							change={this.changeFieldText}
							focus={this.focusFieldText}
							emojiData={emojiData}
							handleEmojiClick={this.changeFieldText}
						/>
						<AddRemoveImage />
						<Button
							variant="contained"
							color="primary"
							size="large"
							startIcon={<SaveIcon />}
							onClick={this.takeScreenshot}
							fullWidth
							style={{marginTop: 8}}
						>
							Save
						</Button>
					</Grid>
					<Grid className="cup-options-right-panel" item xs={12} md={6}>
						<Typography variant="subtitle1" align="center" paragraph color="initial">Edycja treści nr {currentTextFieldsOptions + 1}</Typography>
						<TextField
							inputProps={{
								index: currentTextFieldsOptions,
								input_type: 'fontSize',
								min: "12",
								max: "120"
							}}
							label="Rozmiar czcionki"
							type="number"
							style={{width: 170}}
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
								style={{ marginTop: 24 }}
								options={fontData}
								getOptionLabel={option => option.family}
								autoHighlight
								onChange={(e, value, reason, option) => {
									this.changeInputField(e, value, reason, option, currentTextFieldsOptions)
								}}
								ListboxProps={{
									index: currentTextFieldsOptions,
									input_type: 'fontFamilySelectbox',
								}}
								onKeyUp={e => e.keyCode === 13 && this.changeInputField(e)}
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

									/>
								)}
							/>
						)}
						{textFieldsArray[currentTextFieldsOptions].variants &&
							<FormControl variant="outlined" fullWidth style={{ marginTop: 24 }}>
								<InputLabel htmlFor="outlined-age-native-simple">Wariant czcionki</InputLabel>
								<Select
									native
									onChange={this.changeInputField}
									label="Wariant czcionki"
									defaultValue="regular"
									inputProps={{
										index: currentTextFieldsOptions,
										input_type: 'fontVariantSelectbox',
									}}
								>
									{textFieldsArray[currentTextFieldsOptions].variants.map(v=>(
										<option key={v} value={v}>{v}</option>
									))}
								</Select>
							</FormControl>
						}
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
