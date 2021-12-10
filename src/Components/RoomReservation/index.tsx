import './index.scss';

import { Button } from 'antd';
import { RoomDescription } from 'Components/RoomDescription';
import { RoomForm } from 'Components/RoomForm';
import { TimeTable } from 'Components/TimeTable';
import useTimeTable from 'Hooks/useTimeTable';
import { ITimeRange } from 'Interfaces/ITimeRange';
import { IRoomRow } from 'Interfaces/Tables/IRoomRow';
import { useEffect, useRef, useState } from 'react';
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

  const [timeTable, refreshTimeTable] = useTimeTable();

  const [selectTime, setSelectTime] = useState<ITimeRange>({
    startTime: new Date(),
    endTime: new Date(),
  });

  const ref = useRef<HTMLDivElement>(null);
  const [boxHeight, setBoxHeight] = useState(0);

  useEffect(() => {
    refreshTimeTable(room.key, getFormatDate(new Date(), 'YYYY-MM-DD'));
  }, []);

  useEffect(() => {
    if (ref.current) setBoxHeight(ref.current.clientHeight);
  }, [ref.current]);

  const handleDate = async (date: Date) => {
    refreshTimeTable(room.key, getFormatDate(date, 'YYYY-MM-DD'));
  };

  return (
    <Transition
      in={transitionState}
      timeout={100}
      onExited={() => setTimeout(() => goPrev(), 400)}
      appear
    >
      {state => (
        <div className={`page-slide-${state} flex-column room-reservation`}>
          <div className="reservation-header">
            <Button
              type="default"
              shape="circle"
              icon={<ArrowLeftOutlined />}
              onClick={() => setTransitionState(!transitionState)}
            />
            <RoomDescription room={room} />
          </div>

          <div className="reservation-content" ref={ref}>
            <div className="content-left">
              <TimeTable
                timeTable={timeTable}
                boxHeight={boxHeight}
                setSelectTime={setSelectTime}
              />
            </div>
            <div className="content-right">
              <RoomForm
                room={room}
                selectTime={selectTime}
                handleDate={handleDate}
                refreshTimeTable={refreshTimeTable}
              />
            </div>
          </div>
        </div>
      )}
    </Transition>
  );
};
