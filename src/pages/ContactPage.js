import React from 'react';

import { Container, Typography } from '@material-ui/core';

import ContactForm from '../components/ContactForm';


const ContactPage = () => {
	return (
		<div className="contact-page">
            <Container maxWidth="sm">
            <Typography variant="h2" style={{margin: '40px 0 20px 0', textAlign: 'center'}}>Skontaktuj się z nami</Typography>
			    <ContactForm />
            </Container>
		</div>
	);
};

export default ContactPage;
