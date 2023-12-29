import React from 'react'; 
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import RootLayout from './components/Layout/RootLayout';
import Home from './components/Layout/Home';
import UpdateProfile from './components/Layout/UpdateProfile';
import { AuthContextProvider } from './store/auth-context';
import EditUserDetails from './components/Layout/EditUserDetails';

function App() {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<RootLayout />} exact />
          <Route path='/home' element={<Home />} />
          <Route path='/update' element={<UpdateProfile />} />
          <Route path='/edit' element={<EditUserDetails />} />
        </Routes>
      </BrowserRouter>
    </AuthContextProvider>
  );
}

export default App;
