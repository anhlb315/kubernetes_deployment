import React from 'react';
import './App.css';
import { Router } from './routes';
import { ProSidebarProvider } from 'react-pro-sidebar';
import { Provider } from "react-redux";
import { store } from "./middleware";

import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/styles/styles.scss';

function App() {
  return (
    <Provider store={store}>
      <ProSidebarProvider>
        <Router />
      </ProSidebarProvider>
    </Provider>
  )
}

export default App;
