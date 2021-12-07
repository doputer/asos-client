import { Button, DatePicker, Space } from 'antd';
import { RoomDescription } from 'Components/RoomDescription';
import { RoomReservation } from 'Components/RoomReservation';
import { TimeTable } from 'Components/TimeTable';
import useTimeTable from 'Hooks/useTimeTable';
import moment from 'moment';
import { useRef, useState } from 'react';
import { Transition } from 'react-transition-group';

import { ArrowLeftOutlined } from '@ant-design/icons';

export const RoomDetail = ({
  goPrev,
  room,
}: {
  goPrev: () => void;
  room: any;
}) => {
  const [transitionState, setTransitionState] = useState(true);

  const ref = useRef<HTMLDivElement>(null);

  const [timeTable, refreshTimeTable] = useTimeTable();

  const [selectTime, setSelectTime] = useState<any>({
    startTime: '',
    endTime: '',
  });

  const handleDate = async (date: any) => {
    refreshTimeTable(1, moment(date).format('YYYY-MM-DD'));
  };

  return (
    <Transition
      in={transitionState}
      timeout={300}
      onExited={() => setTimeout(() => goPrev(), 400)}
      appear
    >
      {state => (
        <div
          className={`page-slide-${state}`}
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          }}
        >
          <Space
            direction="horizontal"
            className="flex-center-vertical"
            style={{
              marginBottom: '10px',
            }}
          >
            <Button
              type="default"
              shape="circle"
              icon={<ArrowLeftOutlined />}
              onClick={() => setTransitionState(!transitionState)}
            />
            <DatePicker onChange={date => handleDate(date)} />
          </Space>
          <RoomDescription room={room} />
          <div
            style={{
              flex: 1,
              display: 'flex',
              flexWrap: 'wrap',
              gap: 10,
            }}
          >
            <div
              style={{
                flex: 1,
                flexGrow: 1,
                flexBasis: '400px',
              }}
              ref={ref}
            >
              <TimeTable
                timeTable={timeTable}
                tableHeight={ref.current?.clientHeight}
                setSelectTime={setSelectTime}
              />
            </div>
            <div
              style={{
                flex: 1,
                flexShrink: 0,
                flexBasis: '100px',
              }}
            >
              <RoomReservation selectTime={selectTime} />
            </div>
          </div>
        </div>
      )}
    </Transition>
  );
};
