import React from 'react';

import { Box, TextField, Tooltip, Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

const AddContentField = ({
	textFieldsArray,
	click,
	textFieldsError,
	change,
}) => {
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
		/>
	));

	return (
		<>
			{textFields}
			<Box p={3} textAlign="center">
				<Tooltip
					onClick={click}
					title={textFieldsError || 'Dodaj kolejną treść'}
					aria-label="add"
				>
					<Fab color={textFieldsError ? 'default' : 'primary'}>
						<AddIcon />
					</Fab>
				</Tooltip>
			</Box>
		</>
	);
};

export default AddContentField;
