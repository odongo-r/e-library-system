import React from 'react';
import { Button, Container, Typography } from '@mui/material';
import '../styles/HeroSection.css'; // Create CSS for additional custom styles

const HeroSection = () => {
    return (
        <section className="hero-section">
            <Container>
                <Typography variant="h2" component="h1" gutterBottom>
                    Welcome to the E-Library System
                </Typography>
                <Typography variant="h5" component="p">
                    Access thousands of books and resources anytime, anywhere.
                </Typography>
                <Button variant="contained" color="primary" size="large">
                    Start Reading
                </Button>
            </Container>
        </section>
    );
};

export default HeroSection;

