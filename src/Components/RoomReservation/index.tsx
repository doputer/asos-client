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
import useSearchUser from 'Hooks/useSearchUser';
import moment from 'moment';
import { useEffect, useState } from 'react';

import { CheckOutlined, MinusOutlined } from '@ant-design/icons';
import { fetchRoomReservation } from 'Functions/fetchRoomReservation';

export const RoomReservation = ({
  room,
  selectTime,
  refreshTimeTable,
}: {
  room: any;
  selectTime: any;
  refreshTimeTable: any;
}) => {
  const { RangePicker } = DatePicker;
  const { Search } = Input;

  const [topic, setTopic] = useState('');

  const [users, fetchUsers] = useSearchUser();
  const [options, setOptions] = useState<any>([]);

  const [search, setSearch] = useState('');
  const [participants, setParticipants] = useState<any>([]);

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

      refreshTimeTable(room.id, moment(startTime).format('YYYY-MM-DD'));
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
            !participants.find((participant: any) => participant.id === user.id)
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

  const onSelect = (value: any, option: any) => {
    const user = users.find(user => user.id === option.key);

    setParticipants([
      ...participants,
      {
        id: user?.id,
        name: user?.name,
        department: user?.department,
        position: user?.position,
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
      <RangePicker
        size="large"
        defaultValue={[
          moment(moment(), 'YYYY-MM-DD'),
          moment(moment(), 'YYYY-MM-DD'),
        ]}
        value={[
          moment(moment(selectTime.startTime), 'YYYY-MM-DD HH:mm'),
          moment(moment(selectTime.endTime), 'YYYY-MM-DD HH:mm'),
        ]}
        format={['시작 YYYY-MM-DD HH:mm', '종료 YYYY-MM-DD HH:mm']}
        disabled
        style={{
          width: '100%',
        }}
      />
      <Input
        size="large"
        placeholder="회의 주제를 입력해주세요."
        allowClear
        value={topic}
        onChange={(e: any) => setTopic(e.target.value)}
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
        renderItem={(item: any, index: number) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src="https://i.pravatar.cc/300" />}
              title={<b>{item.name}</b>}
              description={`${item.department} / ${item.position}`}
            />
            <Button
              type="default"
              shape="circle"
              icon={<MinusOutlined />}
              onClick={() => {
                setParticipants(
                  participants.filter((_: any, i: any) => i !== index),
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
              participants.map((participant: any) => participant.id),
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
