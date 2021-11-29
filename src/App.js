import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import Index from './pages/general/index';
import 'antd/dist/antd.css';


export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/*"  element={<Index />}>
      </Route>
      </Routes>
    </Router>
  );
}