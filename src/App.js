import React from 'react'; 
import './App.css';
import Header from './components/Layout/Header';
import Signup from './components/Signup/Signup';

function App() {
  return (
    <React.Fragment>
      <Header />
      <Signup />
    </React.Fragment>
  );
}

export default App;
