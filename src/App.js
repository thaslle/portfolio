import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import PageTransition from './PageTransition';
import Main from './pages/Main';
import ProjectDetails from './pages/ProjectDetails';
import './App.css';

function Wrapper({ onLinkClick }) {
  const location = useLocation();
  const [targetRoute, setTargetRoute] = useState(null);

  const handleLinkClick = (route) => {
    setTargetRoute(route);
    onLinkClick(route);
  };

  return (
    <AnimatePresence mode="wait">
      <Routes key={location.pathname} location={location}>
        <Route
          path="/"
          element={
            <PageTransition targetRoute={targetRoute}>
              <Main onLinkClick={handleLinkClick} />
            </PageTransition>
          }
        />
        <Route
          path="/project/:slug"
          element={
            <PageTransition targetRoute={targetRoute}>
              <ProjectDetails onLinkClick={handleLinkClick} />
            </PageTransition>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router>
      <Wrapper onLinkClick={() => {}} />
    </Router>
  );
}

export default App;