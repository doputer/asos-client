import 'antd/dist/antd.css';

import SignInPage from 'Pages/SignInPage';
import SignUpPage from 'Pages/SignUpPage';
import { Route, Routes } from 'react-router';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>
    </div>
  );
};

export default App;
