import React from 'react';
import Header from '../../components/LandingPage/Header';
import Footer from '../../components/LandingPage/Footer';
import Hero from '../../components/LandingPage/Hero';
import AboutUs from '../../components/LandingPage/AboutUs';
import Features from '../../components/LandingPage/Features';

const LandingPage = () => {
    return (
        <div id="home">
            <Header />
            <Hero/>
            <AboutUs />
            <Features />
            <Footer />

        </div>
    )

}

export default LandingPage;