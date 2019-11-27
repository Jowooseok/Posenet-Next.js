import React from 'react';
import Head from 'next/head';
import '../node_modules/antd/dist/antd.css';
import withRedux from 'next-redux-wrapper';
import AppLayout from '../components/AppLayout';
import PropTypes from 'prop-types';
import { createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reducer from '../reducers';


const Home = ({ Component, store }) => { //store 는 next-redux-wrapper가 처리해줌
    return (
        <Provider store={store}>
            <Head>
                <title>Graduate</title>
                <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
            </Head>
            <AppLayout>
                <Component />
            </AppLayout>

        </Provider>
    );
};

Home.propTypes = {
    Component: PropTypes.elementType,
    store : PropTypes.object,

};

export default withRedux((initialState, options)=>{
    const middlewares = [];
    const enhancer = compose(applyMiddleware(...middlewares), //enhance 향상시키다. redux의 기능을 향상 시키다 ( 미들웨어를 적용해서).
        !options.isServer && window.__REDUX_DEVTOOLS_EXTENSION__ !=='underfined' ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f,)  //options.isServer 서버인지 아닌지 판단 next에서 제공하는 속성
    const store = createStore(reducer, initialState, enhancer);
    // 여기에다가 store 커스터마이징
    return store;
})(Home) //이부분은 외우길 바람