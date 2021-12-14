import 'antd/dist/antd.css';
import './index.scss';

import { MyPageContainer } from 'Components/MyPageContainer';
import { QuestionContainer } from 'Components/QuestionContainer';
import { RoomCard } from 'Components/RoomCard';
import { SearchCard } from 'Components/SearchCard';
import { SeatCard } from 'Components/SeatCard';
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
          <Route path="seat" element={<SeatCard />} />
          <Route path="room" element={<RoomCard />} />
          <Route path="search" element={<SearchCard />} />
          <Route path="question" element={<QuestionContainer />} />
          <Route path="mypage" element={<MyPageContainer />} />
        </Route>
      </Routes>
    </UserProvider>
  );
};

export default App;
