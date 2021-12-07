import {
  AutoComplete,
  Avatar,
  Button,
  DatePicker,
  Input,
  List,
  message,
  Space,
} from 'antd';
import useSearchUser from 'Hooks/useSearchUser';
import moment from 'moment';
import { useEffect, useState } from 'react';

import { CheckOutlined, MinusOutlined } from '@ant-design/icons';

export const RoomReservation = () => {
  const { RangePicker } = DatePicker;
  const { Search } = Input;

  const [users, fetchUsers] = useSearchUser();
  const [options, setOptions] = useState<any>([]);

  const [search, setSearch] = useState('');
  const [participants, setParticipants] = useState<any>([]);

  useEffect(() => {
    fetchUsers('');
  }, []);

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
        // gap: 10, 오류 발생
      }}
    >
      <RangePicker
        size="large"
        defaultValue={[
          moment('2015/01/01', 'YYYY-MM-DD HH:mm'),
          moment('2015/01/01', 'YYYY-MM-DD HH:mm'),
        ]}
        format={'YYYY-MM-DD HH:mm'}
        disabled
        style={{
          width: '100%',
        }}
      />
      <Input size="large" placeholder="회의 주제를 입력해주세요." allowClear />

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
          placeholder="추가하실 회원을 입력해주세요."
          enterButton="검색"
          size="large"
          allowClear
        />
      </AutoComplete>

      <List
        itemLayout="horizontal"
        dataSource={participants}
        renderItem={(item: any, index: number) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
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
          onClick={() => message.success('예약 되었습니다', 1)}
          disabled
        >
          예약하기
        </Button>
      </div>
    </Space>
  );
};
