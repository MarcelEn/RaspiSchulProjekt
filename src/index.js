import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import mainReducer from './reducer';
import createSagaMiddleware from 'redux-saga'
import middleware from './middleware';

import App from './container/App/App.jsx';

const sagaMiddleware = createSagaMiddleware()

let store = createStore(mainReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), applyMiddleware(sagaMiddleware));

sagaMiddleware.run(middleware)

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));