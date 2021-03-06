import React from 'react';

import { Box, TextField, Tooltip, Fab, useTheme, InputAdornment, ClickAwayListener } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';

const useStyles = makeStyles(() => ({
	emojiWrapper: {
		cursor: 'pointer',
	},
	dropdown: {
		position: 'absolute',
		top: 50,
		zIndex: 1003,
		background: '#fff',
		padding: 10,
		width: '100%',
		right: 0,
	},
}));

const AddRemoveContentField = ({
	textFieldsArray,
	click,
	textFieldsError,
	textFieldsErrorMessage,
	clickSecond,
	change,
	focus,
	emojiData,
	handleEmojiClick,
}) => {
	const theme = useTheme();
	const classes = useStyles();
	const colorError = theme.palette.error.main;
	const colorDefault = theme.palette.grey[300];

	const [open, setOpen] = React.useState(0);

	const handleEmojiIconClick = e => {
		let parentNode = e.target.nodeName === 'svg' ? e.target.parentNode : e.target.parentNode.parentNode;
		let index = parseInt(parentNode.getAttribute('index'));
		setOpen(index);
	};

	const handleClickAway = e => {
		if (e.target.nodeName !== 'svg' && e.target.nodeName !== 'path') setOpen(0);
	};

	const textFields = textFieldsArray.map(({ id, label, value, error }) => (
		<TextField
			key={id}
			fullWidth
			id={'cup_content_' + id}
			label={`${label} ${id}`}
			value={value}
			inputProps={{
				index: id,
			}}
			style={{position: 'relative'}}
			InputProps={{
				endAdornment: (
					<ClickAwayListener onClickAway={handleClickAway}>
						<div>
							<InputAdornment style={{ cursor: 'pointer' }} index={id} onClick={handleEmojiIconClick}>
								<InsertEmoticonIcon />
							</InputAdornment>
							{open === id ? (
								<div className={classes.dropdown}>
									{emojiData !== null
										? emojiData.map(({ slug, character }) => (
												<span
													className={classes.emojiWrapper}
													index={id}
													emoji="true"
													key={slug}
													onClick={handleEmojiClick}
												>
													{character}
												</span>
										  ))
										: null}
								</div>
							) : null}
						</div>
					</ClickAwayListener>
				),
			}}
			helperText={error}
			onChange={change}
			onFocus={focus}
		/>
	));

	return (
		<div>
			{textFields}
			<Box p={3} textAlign="center">
				<Tooltip
					onClick={click}
					title={textFieldsError === 1 ? textFieldsErrorMessage : 'Dodaj kolejną treść'}
					aria-label="add"
				>
					<Fab color={textFieldsError === 1 ? 'default' : 'primary'} style={{ marginRight: 16 }}>
						<AddIcon />
					</Fab>
				</Tooltip>
				<Tooltip
					onClick={clickSecond}
					title={textFieldsError === 2 ? textFieldsErrorMessage : 'Usuń wiersz'}
					aria-label="remove"
				>
					<Fab
						style={
							textFieldsError === 2 ? { backgroundColor: colorDefault } : { backgroundColor: colorError }
						}
					>
						<RemoveIcon />
					</Fab>
				</Tooltip>
			</Box>
		</div>
	);
};

export default AddRemoveContentField;
