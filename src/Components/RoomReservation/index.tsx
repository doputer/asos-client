import './index.scss';

import { Button } from 'antd';
import { getRoomTimeTable } from 'Apis/roomApi';
import { RoomDescription } from 'Components/RoomDescription';
import { RoomForm } from 'Components/RoomForm';
import { RoomTimeTable } from 'Components/RoomTimeTable';
import useAsync from 'Hooks/useAsync';
import { ITimeRange } from 'Interfaces/ITimeRange';
import { IRoomRow } from 'Interfaces/Tables/IRoomRow';
import { useEffect, useState } from 'react';
import { Transition } from 'react-transition-group';
import { getFormatDate } from 'Utils/moment';

import { ArrowLeftOutlined } from '@ant-design/icons';

export const RoomReservation = ({
  goPrev,
  room,
}: {
  goPrev: () => void;
  room: IRoomRow;
}) => {
  const [transitionState, setTransitionState] = useState(true);

  const {
    loading,
    data: timeTable,
    execute: refetchTimeTable,
  } = useAsync(getRoomTimeTable);

  useEffect(() => {
    refetchTimeTable({
      roomId: room.key,
      date: getFormatDate(new Date(), 'YYYY-MM-DD'),
    });
  }, []);

  const [selectTime, setSelectTime] = useState<ITimeRange>({
    startTime: new Date(),
    endTime: new Date(),
  });

  const handleDate = async (date: Date) => {
    refetchTimeTable({
      roomId: room.key,
      date: getFormatDate(date, 'YYYY-MM-DD'),
    });
  };

  return (
    <Transition
      in={transitionState}
      timeout={100}
      onExited={() => setTimeout(() => goPrev(), 400)}
      appear
    >
      {state => (
        <div className={`room-reservation page-slide-${state} flex-column`}>
          <div className="reservation-header">
            <Button
              type="default"
              shape="circle"
              icon={<ArrowLeftOutlined />}
              onClick={() => setTransitionState(!transitionState)}
            />
            <RoomDescription room={room} />
          </div>

          <div className="reservation-content">
            <RoomTimeTable
              timeTable={timeTable}
              loading={loading}
              setSelectTime={setSelectTime}
            />
            <RoomForm
              room={room}
              selectTime={selectTime}
              handleDate={handleDate}
              refreshTimeTable={refetchTimeTable}
            />
          </div>
        </div>
      )}
    </Transition>
  );
};
