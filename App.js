import React from 'react';
import {Provider} from 'react-redux';
import Route from './src/nav';
import store from './src/redux/Store';
const App = () => {
  return (
    <Provider store={store}>
      <Route />
    </Provider>
  );
};

export default App;
