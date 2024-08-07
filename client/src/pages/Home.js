import React from 'react';
import Clients from '../components/Clients';
import Cta from '../components/Cta';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import Intro from '../components/Intro';
import Portfolio from '../components/Portfolio';
import Services from '../components/Services';
import EventPackages from '../components/EventPackages';
import WhyHomeEvents from "../components/WhyHomeEvents"
import Celebration from '../components/Celebration';
import SendEnquiryButton from '../components/SendEnquiry/SendEnquiryButton';
import SendEnquiryMobileButton from '../components/MobileComponents/SendEnquiryMobileButton';

const Home = () => {
    return (
        <>
            <Hero />
            <Intro />
            <Services />
            <Portfolio />
            <EventPackages />
            <WhyHomeEvents />
            <Clients />
            <Celebration />
            <Cta/>
            <Footer />
            <SendEnquiryButton /> 
            <SendEnquiryMobileButton />
        </>

    )
}

export default Home;

