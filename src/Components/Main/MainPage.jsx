import React from 'react';
import Home from './Home';
import Product from './Product';
import About from './About';
import Donate from './Donate';
import WhyChoose from './WhyChoose';
import Faq from './Faq';
import Footer from './Footer';

function MainPage() {
  return (
    <>
        <Home />
        <Product />
        <About />
        <Donate />
        <WhyChoose />
        <Faq />
        <Footer />
    </>
  );
}

export default MainPage;