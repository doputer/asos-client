import './index.scss';

import { Empty, Input } from 'antd';
import { getSearchedReservation } from 'Apis/reservationApi';
import { getSearchedUsers } from 'Apis/userApi';
import { SearchUserDescription } from 'Components/SearchUserDescription';
import { SearchUserTable } from 'Components/SearchUserTable';
import { Spinner } from 'Components/Spin';
import useAsync from 'Hooks/useAsync';
import { IReservation } from 'Interfaces/IReservation';
import { IUser } from 'Interfaces/IUser';
import { useEffect, useRef, useState } from 'react';

const { Search } = Input;

export const SearchUser = () => {
  const [tab, setTab] = useState(false);

  const [seatReservation, setSeatReservation] = useState<IReservation>();
  const [roomReservation, setRoomReservation] = useState<IReservation>();

  const {
    loading,
    data: users = [],
    execute: refetchUsers,
  }: {
    loading: boolean;
    data: IUser[];
    execute: (name: string) => void;
  } = useAsync(getSearchedUsers);

  const [user, setUser] = useState<IUser>();

  const { data: reservations, execute: refetchReservations } = useAsync(
    getSearchedReservation,
  );

  useEffect(() => {
    if (user) refetchReservations({ status: 1, userId: user.id });
  }, [user]);

  useEffect(() => {
    if (reservations) {
      setSeatReservation(
        reservations.find(
          (reservation: IReservation) => reservation.seat !== null,
        ),
      );
      setRoomReservation(
        reservations.find(
          (reservation: IReservation) => reservation.room !== null,
        ),
      );
    }
  }, [reservations]);

  const ref = useRef<HTMLDivElement>(null);
  const [itemHeight, setItemHeight] = useState(0);

  useEffect(() => {
    if (ref.current) setItemHeight(ref.current.clientHeight);
  }, [ref.current]);

  const goNext = () => setTab(true);
  const goPrev = () => setTab(false);

  return (
    <>
      {!tab && (
        <div className="flex-column full-height">
          <div className="search-bar">
            <Search
              placeholder="검색하실 회원 정보를 입력해주세요."
              enterButton="검색"
              size="large"
              onSearch={(name: string) => {
                if (!name) return;
                setTab(false);

                refetchUsers(name);
              }}
            />
          </div>
          <div className="search-table" ref={ref}>
            {users ? (
              <SearchUserTable
                itemHeight={itemHeight}
                loading={loading}
                users={users}
                setUser={setUser}
                goNext={goNext}
              />
            ) : (
              <div className="search-status flex-center">
                {loading ? (
                  <Spinner size={72} />
                ) : (
                  <Empty
                    description={
                      <>
                        <span style={{ color: '#4895ef' }}>회원</span>을
                        검색해주세요.
                      </>
                    }
                  />
                )}
              </div>
            )}
          </div>
        </div>
      )}
      {tab && user && reservations && (
        <SearchUserDescription
          user={user}
          seatReservation={seatReservation}
          roomReservation={roomReservation}
          goPrev={goPrev}
        />
      )}
    </>
  );
};
