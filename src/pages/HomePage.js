import React from 'react';

import Banner from '../components/Banner';
import AvailableOptions from '../components/AvailableOptions';
import Features from '../components/Features';

const HomePage = () => {
    return (
        <div className="homepage">
            <Banner />
            <AvailableOptions />
            <Features />
        </div>
    )
}

export default HomePage