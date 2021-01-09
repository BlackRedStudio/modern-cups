import React from 'react';
import { connect } from 'react-redux';

import { TextField, Button, Typography } from '@material-ui/core';

const ContactForm = ({previewImage}) => {
	const [contactContent, setContactContent] = React.useState({
		name: '',
		companyName: '',
		email: '',
		subject: '',
		desc: ''
	});

	const handleChange = e => {
		setContactContent({...contactContent, [e.target.name]: e.target.value});
	}
	const handleSubmit = e => {
		let parent = e.target.parentNode;
		if(parent.nodeName === 'BUTTON') parent = parent.parentNode;
		console.log(contactContent)
	};
	return (
		<>
			<form>
				<TextField name="name" label="Imię" fullWidth onChange={handleChange} />
				<TextField name="companyName" label="Nazwa firmy" fullWidth onChange={handleChange} />
				<TextField name="email" label="Email" fullWidth onChange={handleChange} />
				<TextField name="subject" label="Temat" fullWidth onChange={handleChange} />
				<TextField name="desc" label="Opis..." multiline rows={3} rowsMax={9} fullWidth onChange={handleChange} />
				<Button
					style={{ margin: '20px auto 0', display: 'block' }}
					variant="contained"
					color="primary"
					size="large"
					disableElevation
					onClick={handleSubmit}
				>
					Wyślij
				</Button>
			</form>
			<Typography style={{marginBottom: 20}}>Podgląd wiadomości</Typography>
			{contactContent.name && (<div style={{marginBottom: 10}}>Imię: <em>{contactContent.name}</em></div>)}
			{contactContent.companyName && (<div style={{marginBottom: 10}}>Nazwa firmy: <em>{contactContent.companyName}</em></div>)}
			{contactContent.email && (<div style={{marginBottom: 10}}>Email: <em>{contactContent.email}</em></div>)}
			{contactContent.subject && (<div style={{marginBottom: 10}}>Temat: <em>{contactContent.subject}</em></div>)}
			{contactContent.desc && (<div style={{marginBottom: 30}}>Opis: <em>{contactContent.desc}</em></div>)}
			{previewImage && (<img style={{maxWidth: 300, maxHeight: 300}} src={previewImage} alt=""/>)}
		</>
	);
};

const mapStateToProps = state => ({
	previewImage: state.cup.previewImage,
});

export default connect(mapStateToProps)(ContactForm);
