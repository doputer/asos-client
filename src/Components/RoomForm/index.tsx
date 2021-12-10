import {
  AutoComplete,
  Avatar,
  Button,
  DatePicker,
  Empty,
  Input,
  List,
  message,
  Space,
} from 'antd';
import { fetchRoomReservation } from 'Functions/fetchRoomReservation';
import useSearchUser from 'Hooks/useSearchUser';
import { ITimeRange } from 'Interfaces/ITimeRange';
import { IRoomRow } from 'Interfaces/Tables/IRoomRow';
import { useEffect, useState } from 'react';
import {
  getDate,
  getFormatDate,
  getMomentFormatDate,
  getToday,
} from 'Utils/moment';

import { CheckOutlined, MinusOutlined } from '@ant-design/icons';

interface IParticipant {
  id: number;
  name: string;
  department: string;
  position: string;
}

export const RoomForm = ({
  room,
  selectTime,
  handleDate,
  refreshTimeTable,
}: {
  room: IRoomRow;
  selectTime: ITimeRange;
  handleDate: (date: Date) => void;
  refreshTimeTable: (
    roomId: number | null,
    date: string | null,
  ) => Promise<void>;
}) => {
  const { RangePicker } = DatePicker;
  const { Search } = Input;

  const [topic, setTopic] = useState('');

  const [users, fetchUsers] = useSearchUser();
  const [options, setOptions] = useState<any>([]);

  const [search, setSearch] = useState('');
  const [participants, setParticipants] = useState<IParticipant[]>([]);

  useEffect(() => {
    fetchUsers('');
  }, []);

  const clearForm = () => {
    setParticipants([]);
    setTopic('');
  };

  const handleRoomReservation = async (
    startTime: Date,
    endTime: Date,
    topic: string,
    roomId: number,
    participantIds: number[],
  ) => {
    try {
      await fetchRoomReservation({
        startTime,
        endTime,
        topic,
        userId: 201,
        roomId,
        participantIds,
      });

      refreshTimeTable(room.key, getFormatDate(startTime, 'YYYY-MM-DD'));
      clearForm();

      message.success('예약 되었습니다.', 0.5);
    } catch (error: any) {
      message.error(error.message);
    }
  };

  const handleInput = (name: string) => setSearch(name);

  const handleOption = (name: string) => {
    setOptions(
      users
        .map(user => {
          if (
            user.name.includes(name) &&
            !participants.find(
              (participant: IParticipant) => participant.id === user.id,
            )
          )
            return {
              key: user.id,
              value: user.employeeId,
              label: (
                <div
                  style={{
                    display: 'flex',
                    gap: '4px',
                  }}
                >
                  <span>{user.employeeId}</span>
                  <span>{user.department}</span>
                  <span
                    style={{
                      color: '#4895ef',
                    }}
                  >
                    {user.name}
                  </span>
                  <span>{user.position}</span>
                </div>
              ),
            };

          return;
        })
        .filter(user => user !== undefined),
    );
  };

  const onSelect = (_: string, option: any) => {
    const participant = users.find(user => user.id === option.key);
    if (!participant) return;

    setParticipants([
      ...participants,
      {
        id: participant.id,
        name: participant.name,
        department: participant.department,
        position: participant.position,
      },
    ]);

    handleInput('');
  };

  return (
    <Space
      direction="vertical"
      style={{
        width: '100%',
      }}
    >
      <div
        className="flex-center"
        style={{
          gap: '10px',
        }}
      >
        <DatePicker
          size="large"
          onChange={date => handleDate(getDate(date))}
          format="YYYY-MM-DD"
          defaultValue={getToday()}
          style={{
            flex: 1,
          }}
        />
        <RangePicker
          size="large"
          defaultValue={[getToday(), getToday()]}
          value={[
            getMomentFormatDate(selectTime.startTime, 'HH:mm'),
            getMomentFormatDate(selectTime.endTime, 'HH:mm'),
          ]}
          format={['시작 HH:mm', '종료 HH:mm']}
          disabled
          style={{
            flex: 2,
          }}
        />
      </div>
      <Input
        size="large"
        placeholder="회의 주제를 입력해주세요."
        allowClear
        value={topic}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setTopic(e.target.value)
        }
      />

      <AutoComplete
        onSearch={(name: string) => {
          if (!name) return;

          handleOption(name);
        }}
        options={options}
        onSelect={(value, option) => onSelect(value, option)}
        style={{
          width: '100%',
        }}
        value={search}
        onChange={(name: string) => handleInput(name)}
        onBlur={() => handleInput('')}
      >
        <Search
          placeholder="추가하실 참석자를 입력해주세요."
          enterButton="검색"
          size="large"
          allowClear
        />
      </AutoComplete>

      <List
        bordered
        itemLayout="horizontal"
        dataSource={participants}
        locale={{
          emptyText: (
            <Empty
              description={
                <div>
                  <span style={{ color: '#4895ef' }}>참석자</span>를
                  추가해주세요.
                </div>
              }
            />
          ),
        }}
        renderItem={(participant: IParticipant, index: number) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src="https://i.pravatar.cc/300" />}
              title={<b>{participant.name}</b>}
              description={`${participant.department} / ${participant.position}`}
            />
            <Button
              type="default"
              shape="circle"
              icon={<MinusOutlined />}
              onClick={() => {
                setParticipants(
                  participants.filter(
                    (_: IParticipant, i: number) => i !== index,
                  ),
                );
              }}
            />
          </List.Item>
        )}
      />
      <div className="flex-center">
        <Button
          type="primary"
          shape="round"
          icon={<CheckOutlined />}
          onClick={() =>
            handleRoomReservation(
              selectTime.startTime,
              selectTime.endTime,
              topic,
              room.key,
              participants.map((participant: IParticipant) => participant.id),
            )
          }
          disabled={selectTime.endTime && topic ? false : true}
        >
          예약하기
        </Button>
      </div>
    </Space>
  );
};
