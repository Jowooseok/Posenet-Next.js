import React from 'react';
import Head from 'next/head';
import '../node_modules/antd/dist/antd.css';
import AppLayout from '../components/AppLayout';
import PropTypes from 'prop-types';

const Home = ({ Component }) => {

    return (
        <>
            <Head>
                <title>Graduate</title>
                <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
            </Head>

            <div>
                <AppLayout>
                    <Component />
                </AppLayout>

            </div>
        </>
    );
};

Home.propTypes = {
    Component : PropTypes.elementType,

};

export default Home;