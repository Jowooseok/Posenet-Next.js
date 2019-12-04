import React from 'react';
import Head from 'next/head';
import '../node_modules/antd/dist/antd.css';
import withRedux from 'next-redux-wrapper';
import PropTypes from 'prop-types';
import { createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';

import AppLayout from '../components/AppLayout';
import reducer from '../reducers';
import rootSaga from '../sagas';


const Jrun2ng = ({ Component, store }) => { //store 는 next-redux-wrapper가 처리해줌
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

Jrun2ng.propTypes = {
    Component: PropTypes.elementType,
    store : PropTypes.object,

};

const configureStore = (initialState, options) => { // 이형식은 외우기 보통 바뀌지 않음
    const sagaMiddleware = createSagaMiddleware();
    const middlewares = [sagaMiddleware]; //넣고 싶은 미들웨어 넣기
    const enhancer = process.env.NODE_ENV === 'production'
      ? compose(applyMiddleware(...middlewares)) //실제 서비스
      : compose( //개발일때 REDUX_DEVTOOLS가 실제 배포시 노출되면 안되므로
        applyMiddleware(...middlewares),
        !options.isServer && typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined' ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f, //배포할때는 REDUX_DEVTOOLS 뻄 - 리덕스가 노출되버림
      );
    const store = createStore(reducer, initialState, enhancer);
    sagaMiddleware.run(rootSaga);
    return store;
  };
  
  export default withRedux(configureStore)(Jrun2ng);