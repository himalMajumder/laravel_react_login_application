import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { WebsiteProvider, useWebsite } from './Context/Website';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Home from './pages/Home';
import ErrorPage from './components/ErrorPage';

const MyApp = () => {
  return (
        <WebsiteProvider>
            <Routes>
            <Route path="/" index element={<Home />} errorElement={ <ErrorPage />} />
            <Route path="/login" element={<Login />} errorElement={ <ErrorPage />} />
            <Route path="/register" element={<Register />} errorElement={ <ErrorPage />}/>
            </Routes>
        </WebsiteProvider>
  );
};

export default MyApp;
