import 'antd/dist/antd.css';
import './index.scss';

import { MyPageContainer } from 'Components/MyPageContainer';
import { QuestionContainer } from 'Components/QuestionContainer';
import { RoomContainer } from 'Components/RoomContainer';
import { SearchContainer } from 'Components/SearchContainer';
import { SeatContainer } from 'Components/SeatContainer';
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
        <Route path="/user/*" element={<UserPage />}>
          <Route path="seat" element={<SeatContainer />} />
          <Route path="room" element={<RoomContainer />} />
          <Route path="search" element={<SearchContainer />} />
          <Route path="question" element={<QuestionContainer />} />
          <Route path="mypage" element={<MyPageContainer />} />
        </Route>
      </Routes>
    </UserProvider>
  );
};

export default App;
