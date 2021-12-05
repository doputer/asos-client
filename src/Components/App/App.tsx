import 'antd/dist/antd.css';

import SignInPage from 'Pages/SignInPage';
import SignUpPage from 'Pages/SignUpPage';
import UserPage from 'Pages/UserPage';
import { Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<SignInPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/user" element={<UserPage />} />
    </Routes>
  );
};

export default App;
