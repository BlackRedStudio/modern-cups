import React, { Component } from 'react';
import { connect } from 'react-redux';

import html2canvas from 'html2canvas';

import { addTextToCup, savePreviewImage, addPositionData, changeTextFieldsOptions, fontFamilySearch } from '../redux/cup/cup-actions';

import { Box, Grid, TextField, Button, FormControl, InputLabel, Select, Typography } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import Autocomplete from '@material-ui/lab/Autocomplete';

import AddRemoveContentField from './cup-options/AddRemoveContentField';
import AddRemoveImage from './cup-options/AddRemoveImage';

class CupOptionsContainer extends Component {
	state = {
		textFieldsError: 2,
		textFieldsErrorMessage: 'Nie można usunąć pierwotnego pola tekstowego',
		fontData: null,
		emojiData: null,
	};
	limitUpdate = false;
	textField = {
		id: null,
		label: 'Treść nr',
		value: '',
		error: null,
		fontSize: 16,
		color: '#000',
		fontFamily: '',
		variants: null,
		fontWeight: null,
		fontStyle: 'normal',
		transform: null,
		fontFamilySearchQuery: '',
	};
	cupOptionsRightPanel = React.createRef();
	addFieldText = () => {
		const { cupText, addTextToCup } = this.props;

		if (cupText.length < 4) {
			const currentId = cupText.length + 1;
			let newTextField = { ...this.textField };
			newTextField.id = currentId;
			this.setState({
				textFieldsError: null,
				textFieldsErrorMessage: null,
			});
			addTextToCup([...cupText, newTextField]);
		}
		if (cupText.length > 2) {
			this.setState({
				textFieldsError: 1,
				textFieldsErrorMessage: 'Maksymalna liczba treści to 4',
			});
		}
	};

	removeFieldText = () => {
		const { cupText, addTextToCup, changeTextFieldsOptions } = this.props;
		const newCupText = [...cupText];
		if (cupText.length > 1) {
			addTextToCup(newCupText.slice(0, -1));
		}
		if (cupText.length < 3) {
			this.setState({
				textFieldsError: 2,
				textFieldsErrorMessage: 'Nie można usunąć pierwotnego pola tekstowego',
			});
		}
		changeTextFieldsOptions(0);

	};
	componentDidUpdate(prevProps) {
		if(prevProps.currentTextFieldsOptions !== this.props.currentTextFieldsOptions) this.animateRightPanel();
	}

	changeFieldText = e => {
		const { cupText, addTextToCup } = this.props;
		let newCupText = [...cupText]
		const fieldIndex = e.target.getAttribute('index');
		const isEmoji = e.target.getAttribute('emoji');

		let value = null;
		let valueLength = 0;

		if (!isEmoji) {
			value = e.target.value;
			valueLength = e.target.value.length;
		} else {
			value = newCupText[fieldIndex - 1].value + e.target.innerText;
			valueLength = newCupText[fieldIndex - 1].value.length + 1;
		}

		if (valueLength < 33) {
			newCupText[fieldIndex - 1].error = null;
			newCupText[fieldIndex - 1].value = value;
		} else {
			newCupText[fieldIndex - 1].error = 'Maksymalna długość tekstu to 32 znaki';
		}
		addTextToCup(newCupText);
	};
	changeInputField = (e, value = null, reason = null, option = null, fieldIndexParam = null) => {
		const { fontData } = this.state;
		const { cupText, addTextToCup } = this.props;
		let newCupText = [...cupText];
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
				newCupText[fieldIndex].fontSize = e.target.value;
			} else if (inputType === 'fontFamily') {
				fontFamily = e.target.value;
				newCupText[fieldIndex].fontFamily = fontFamily;
			} else if (inputType === 'fontFamilySelectbox') {
				fontFamily = e.target.innerText;
				newCupText[fieldIndex].fontFamily = fontFamily;
			} else if (inputType === 'fontVariantSelectbox') {
				let fontWeight = e.target.value.match(/\d+/);
				let fontStyle = e.target.value.match(/italic/i);
				let isRegular = e.target.value.match(/regular/i);
				if (fontWeight) newCupText[fieldIndex].fontWeight = fontWeight[0];
				if (isRegular || (!fontWeight && fontStyle)) newCupText[fieldIndex].fontWeight = '400';
				if (fontStyle) newCupText[fieldIndex].fontStyle = fontStyle[0];
				else newCupText[fieldIndex].fontStyle = 'normal';
			}
			if (inputType === 'fontFamily' || inputType === 'fontFamilySelectbox') {
				newCupText[fieldIndex].fontWeight = '400';
				newCupText[fieldIndex].fontStyle = 'normal';
				let moreFontData = fontData.filter(v => v.family === fontFamily);
				if (moreFontData[0]) newCupText[fieldIndex].variants = moreFontData[0].variants;
			}
			if (reason === 'clear') {
				newCupText[fieldIndexParam].fontWeight = '400';
				newCupText[fieldIndexParam].fontStyle = 'normal';
				newCupText[fieldIndexParam].fontFamily = '';
			}
			addTextToCup(newCupText);
		} else if (inputType === 'color') {
			newCupText[fieldIndex].color = e.target.value;
			if (this.limitUpdate === false) {
				this.limitUpdate = true;
				setTimeout(() => {
					addTextToCup(newCupText);
					this.limitUpdate = false;
				}, 500);
			}
		}
	};
	focusFieldText = e => {
		const {changeTextFieldsOptions} = this.props;
		let currAttr = e.target.getAttribute('index');

		changeTextFieldsOptions(currAttr - 1);

	};
	animateRightPanel = () => {
		// const { cupText } = this.props;
		let rightPanel = this.cupOptionsRightPanel.current;
		// let currentId = rightPanel.getAttribute('index');
		// let currentFont = cupText[currentId].fontFamily;
		// let fontFamilyInput = rightPanel.childNodes[3].getElementsByClassName('MuiInputBase-input');
		// let fontFamilyLabel = rightPanel.childNodes[3].getElementsByClassName('MuiFormLabel-root');
		// let fontFamilyLegend = rightPanel.childNodes[3].getElementsByTagName('legend');
		// fontFamilyInput[0].value = currentFont;
		// if(currentFont !== '') {
		// 	fontFamilyLabel[0].classList.add('MuiInputLabel-shrink');
		// 	fontFamilyLegend[0].classList.add('PrivateNotchedOutline-legendNotched-21');
		// };
		rightPanel.classList.toggle('cup-options-right-panel');
		setTimeout(()=>{
			rightPanel.classList.toggle('cup-options-right-panel');
		}, 1)
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
					emojiData,
				});
			});
	}
	handleSave() {
		const { savePreviewImage, addPositionData } = this.props;
		let elToScreenshot = document.getElementById('containerParent');
		html2canvas(elToScreenshot).then(canvas => {
			savePreviewImage(canvas.toDataURL());
		});
		let textsDraggable = document.querySelectorAll('.text-draggable'),
		imagesDraggable = document.querySelectorAll('.image-draggable'),
		textPositionDataArray = [],
		imagePositionDataArray = [];

		textsDraggable.forEach(v => {
			let textPositionData = {};
			textPositionData.transform = v.style.transform;
			textPositionDataArray.push(textPositionData);
		})

		imagesDraggable.forEach(v => {
			let imagePositionData = {};
			imagePositionData.width = v.style.width;
			imagePositionData.height = v.style.height;
			imagePositionData.transform = v.style.transform;
			imagePositionDataArray.push(imagePositionData);
		})

		addPositionData({text: textPositionDataArray, image: imagePositionDataArray});
	}
	render() {
		const { textFieldsError, textFieldsErrorMessage, fontData, emojiData } = this.state;
		const { cupText, currentTextFieldsOptions, fontFamilySearch } = this.props;
		return (
			<Box p={4}>
				<Grid container spacing={4}>
					<Grid item xs={12} md={6}>
						<Typography variant="subtitle1" align="center" paragraph color="initial">
							Dodaj treść
						</Typography>
						<AddRemoveContentField
							textFieldsArray={cupText}
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
							onClick={this.handleSave.bind(this)}
							fullWidth
							style={{ marginTop: 8 }}
						>
							Save
						</Button>
					</Grid>
					<Grid ref={this.cupOptionsRightPanel} index={currentTextFieldsOptions} className="cup-options-right-panel" item xs={12} md={6}>
						<Typography variant="subtitle1" align="center" paragraph color="initial">
							Edycja treści nr {currentTextFieldsOptions + 1}
						</Typography>
						<TextField
							inputProps={{
								index: currentTextFieldsOptions,
								input_type: 'fontSize',
								min: '12',
								max: '120',
							}}
							label="Rozmiar czcionki"
							type="number"
							style={{ width: 170 }}
							value={cupText[currentTextFieldsOptions].fontSize}
							onChange={this.changeInputField}
						/>
						<TextField
							inputProps={{
								index: currentTextFieldsOptions,
								input_type: 'color',
							}}
							label="Kolor"
							type="color"
							value={cupText[currentTextFieldsOptions].color}
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
									this.changeInputField(e, value, reason, option, currentTextFieldsOptions);

									let thisTarget = e.target;
									window.xd = thisTarget;
									if(reason === 'select-option') {
										setTimeout(()=>{
											fontFamilySearch({index: currentTextFieldsOptions, value: thisTarget.innerText})
										}, 10);
										return false;
									}
									if(reason === 'clear') {
										setTimeout(()=>{
											fontFamilySearch({index: currentTextFieldsOptions, value: ''})
										}, 10);
										return false;
									}

									setTimeout(()=>{
										fontFamilySearch({index: currentTextFieldsOptions, value: thisTarget.innerText})
									}, 10)
								}}
								inputValue={cupText[currentTextFieldsOptions].fontFamilySearchQuery}
								ListboxProps={{
									index: currentTextFieldsOptions,
									input_type: 'fontFamilySelectbox',
								}}
								onKeyUp={e => e.keyCode === 13 && this.changeInputField(e)}
								onKeyDown={e => {
									if(e.keyCode === 13) {
										let listbox = document.querySelector('.MuiAutocomplete-listbox li[data-focus="true"]')
										setTimeout(()=>{
											fontFamilySearch({index: currentTextFieldsOptions, value: listbox.innerText})
										}, 10)
									}
								}}
								renderInput={params => (
									<TextField
										{...params}
										inputProps={{
											...params.inputProps,
											index: currentTextFieldsOptions,
											input_type: 'fontFamily',
										}}
										onChange={e => fontFamilySearch({index: currentTextFieldsOptions, value: e.target.value})}
										label="Wybierz czcionkę"
										variant="outlined"
									/>
								)}
							/>
						)}
						{cupText[currentTextFieldsOptions].variants && (
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
									{cupText[currentTextFieldsOptions].variants.map(v => (
										<option key={v} value={v}>
											{v}
										</option>
									))}
								</Select>
							</FormControl>
						)}
					</Grid>
				</Grid>
			</Box>
		);
	}
}

const mapDispatchToProps = dispatch => ({
	addTextToCup: text => dispatch(addTextToCup(text)),
	savePreviewImage: canvas => dispatch(savePreviewImage(canvas)),
	addPositionData: positionData => dispatch(addPositionData(positionData)),
	changeTextFieldsOptions: numberOfField => dispatch(changeTextFieldsOptions(numberOfField)),
	fontFamilySearch: searchQuery => dispatch(fontFamilySearch(searchQuery)),
});

const mapStateToProps = state => ({
	cupText: state.cup.cupText,
	currentTextFieldsOptions: state.cup.currentTextFieldsOptions
});

export default connect(mapStateToProps, mapDispatchToProps)(CupOptionsContainer);
