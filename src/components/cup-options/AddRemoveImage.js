import React from 'react';
import { connect } from 'react-redux';

import { addImageToCup, addImageToCupRow, deleteImageFromCup, resetImages } from '../../redux/cup/cup-actions';

import { Box, InputBase, Tooltip, Fab, Button, useTheme } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

const AddRemoveImage = ({ cupImage, addImageToCup, addImageToCupRow, deleteImageFromCup, resetImages }) => {
	const theme = useTheme();
	const colorError = theme.palette.error.main;
    const colorDefault = theme.palette.grey[300];
    const myInput = React.useRef([]);

	const handleFileUpload = e => {
		let file = e.target.files[0];
		let reader = new FileReader();
        let index = e.target.getAttribute('index');
		reader.onload = e => {
			const imgPreview = { key: parseInt(index), imgPreviewUrl: e.target.result, name: file.name };
			addImageToCup(imgPreview);
        };
        if(file)
		    reader.readAsDataURL(file);
    };
    const handleAddClick = () => {
        addImageToCupRow({key: cupImage.length, imgPreviewUrl: null, name: ""});
    }
    const handleRemoveClick = () => {
        if(cupImage.length > 1)
            deleteImageFromCup();
        else
            resetImages();
    }

    const handleUploadFileButtonClick = e => {
        let index = 0;
        if(e.target.nodeName === 'SPAN')
            index = e.target.parentNode.getAttribute('index');
        else
            index = e.target.getAttribute('index');
        myInput.current[index].childNodes[0].click();

    };


    const inputsFile = cupImage.map(v => <Button style={{display: 'block', marginBottom: 10}} key={v.key} variant="contained" index={v.key} color="primary" onClick={handleUploadFileButtonClick} disableElevation>
      {v.name || 'Wgraj zdjęcie'}
      <InputBase style={{display: 'none'}} type="file" inputProps={{ index: v.key, accept: "image/png, image/jpeg" }} ref={el => myInput.current[v.key] = el} onChange={handleFileUpload} />
    </Button> );

	return (
		<>
			{inputsFile}
			<Box p={3} textAlign="center">
				<Tooltip title={'Dodaj kolejną treść'} aria-label="add" onClick={handleAddClick}>
					<Fab style={{ marginRight: 16 }}>
						<AddIcon />
					</Fab>
				</Tooltip>
				<Tooltip title="Usuń wiersz" aria-label="remove" onClick={handleRemoveClick}>
					<Fab>
						<RemoveIcon />
					</Fab>
				</Tooltip>
			</Box>
		</>
	);
};

const mapDispatchToProps = dispatch => ({
	addImageToCup: image => dispatch(addImageToCup(image)),
	addImageToCupRow: image => dispatch(addImageToCupRow(image)),
	deleteImageFromCup: () => dispatch(deleteImageFromCup()),
	resetImages: () => dispatch(resetImages()),
});

const mapStateToProps = state => ({
	cupImage: state.cup.cupImage,
});

export default connect(mapStateToProps, mapDispatchToProps)(AddRemoveImage);
