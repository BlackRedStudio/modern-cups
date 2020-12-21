import React from 'react';

import { Box, TextField, Tooltip, Fab, useTheme } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

const AddRemoveContentField = ({
	textFieldsArray,
	click,
	textFieldsError,
	textFieldsErrorMessage,
	clickSecond,
	change,
	focus
}) => {

	const theme = useTheme();
	const colorError = theme.palette.error.main;
	const colorDefault = theme.palette.grey[300];

	const textFields = textFieldsArray.map(({ id, label, value, error }) => (
		<TextField
			key={id}
			fullWidth={true}
			id={'cup_content_' + id}
			label={`${label} ${id}`}
			value={value}
			inputProps={{
				index: id,
			}}
			helperText={error}
			onChange={change}
			onFocus={focus}
		/>
	));

	return (
		<>
			{textFields}
			<Box p={3} textAlign="center">
				<Tooltip
					onClick={click}
					title={textFieldsError === 1 ? textFieldsErrorMessage : 'Dodaj kolejną treść'}
					aria-label="add"
				>
					<Fab color={textFieldsError === 1 ? 'default' : 'primary'} style={{marginRight: 16}}>
						<AddIcon />
					</Fab>
				</Tooltip>
				<Tooltip
					onClick={clickSecond}
					title={textFieldsError === 2 ? textFieldsErrorMessage : 'Usuń wiersz'}
					aria-label="remove"
				>
					<Fab style={textFieldsError === 2 ? {backgroundColor: colorDefault } : {backgroundColor: colorError }}>
						<RemoveIcon />
					</Fab>
				</Tooltip>
			</Box>
		</>
	);
};

export default AddRemoveContentField;
