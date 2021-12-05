import React from 'react';
import { Route, Routes } from 'react-router';

import LoginPage from '../../Pages/LoginPage';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LoginPage />} />
      </Routes>
    </div>
  );
};

export default App;
