import React from 'react';
import Navbar from '../Component/Navbar';
import { Outlet } from 'react-router';
import Footer from '../Component/Footer';

const MainLayout = () => {
    return (
        <div className='relative'>
            <div>
                <Navbar></Navbar>
            </div>
            <div className='pt-10'><Outlet></Outlet></div>
            <div className='-mt-90 relative z-10'>
                <Footer></Footer>
            </div>
        </div>
    );
};

export default MainLayout;