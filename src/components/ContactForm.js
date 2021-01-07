import React from 'react';
import { TextField, Button, Typography } from '@material-ui/core';

const ContactForm = () => {
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
			<Typography>Podgląd wiadomości</Typography>
			<ol>
				{Object.values(contactContent).map((v, k) => <li key={k}>{v}</li>)}
			</ol>
		</>
	);
};

export default ContactForm;
