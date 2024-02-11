import React from 'react';
import { Provider } from 'react-redux';
import store from './features/store';
import ExpenseTracker from './ExpenseTracker';

function App() {
  return (
    <Provider store={store}>
       <ExpenseTracker/>
    </Provider>
  );
}

export default App;
