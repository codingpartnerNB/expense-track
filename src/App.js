import React from 'react'; 
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import RootLayout from './components/Layout/RootLayout';
import Home from './components/Layout/Home';
import UpdateProfile from './components/Layout/UpdateProfile';
import { AuthContextProvider } from './store/auth-context';
import Signup from './components/Signup/Signup';
import ForgotPassword from './components/Layout/ForgotPassword';

function App() {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<RootLayout />} >
            <Route index element={<Signup />} />
            <Route path='home' element={<Home />} />
            <Route path='update' element={<UpdateProfile />} />
            <Route path='forgot' element={<ForgotPassword />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthContextProvider>
  );
}

export default App;
