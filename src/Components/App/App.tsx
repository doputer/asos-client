import 'antd/dist/antd.css';
import './index.scss';

import { UserProvider } from 'Contexts/UserContext';
import SignInPage from 'Pages/SignInPage';
import SignUpPage from 'Pages/SignUpPage';
import UserPage from 'Pages/UserPage';
import { Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <UserProvider>
      <Routes>
        <Route path="/" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/user" element={<UserPage />} />
      </Routes>
    </UserProvider>
  );
};

export default App;
