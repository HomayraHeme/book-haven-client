import React from 'react';
import Banner from '../Component/Banner/Banner';
import LatestBooks from '../Component/LatestBooks';


const Home = () => {
    return (
        <div className="relative pb-100">
            <div> {/* Extra bottom padding for Banner */}
                <Banner />
            </div>
            <div className="-mt-100 relative z-10 w-8/12 mx-auto"> {/* Less negative margin for overlap */}
                <LatestBooks />
            </div>

        </div>
    );
};

export default Home;
