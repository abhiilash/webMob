import React from 'react';
import AppNavigator from './navigation';
import {
  createStore,
  applyMiddleware,
} from 'redux';
import { Provider, connect } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import logger from 'redux-logger';
import appReducer from './redux';


// const store = createStore(
//   appReducer,
//   applyMiddleware(middleware),
// );

const store = createStore(
    appReducer,
    applyMiddleware(ReduxThunk, logger)
);

export default class App extends React.Component {
  render() {
    return (
    	<Provider store={store}>
      		<AppNavigator/>
      	</Provider>
    );
  }
}