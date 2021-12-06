import {
  Avatar,
  Button,
  DatePicker,
  Descriptions,
  Input,
  List,
  Space,
  Table,
} from 'antd';
import useTimeTable from 'Hooks/useTimeTable';
import moment from 'moment';
import { useEffect, useRef, useState } from 'react';
import { Transition } from 'react-transition-group';

import { ArrowLeftOutlined } from '@ant-design/icons';

interface IRow {
  key: number;
  time: string;
  topic: string;
  participant: string;
}

export const RoomDetail = ({ goPrev }: { goPrev: () => void }) => {
  const [transitionState, setTransitionState] = useState(true);
  const [timeTable, refreshTimeTable] = useTimeTable();
  const [rows, setRows] = useState<IRow[]>([]);

  const ref = useRef<HTMLDivElement>(null);

  const { RangePicker } = DatePicker;
  const { Search } = Input;

  const handleDate = async (date: any) => {
    refreshTimeTable(1, moment(date).format('YYYY-MM-DD'));
  };

  useEffect(() => {
    setRows(
      timeTable.map((time: any): IRow => {
        return {
          key: time.id,
          time: `${moment(time.start_time).format('HH:mm')} - ${moment(
            time.end_time,
          ).format('HH:mm')}`,
          topic: '회의 주제',
          participant: '김도현, 김도현, 김도현, 김도현',
        };
      }),
    );
  }, [timeTable]);

  const columns = [
    {
      title: '시간',
      dataIndex: 'time',
    },
    {
      title: '주제',
      dataIndex: 'topic',
    },
    {
      title: '참석자',
      dataIndex: 'participant',
    },
  ];

  const data = [
    {
      name: '김도현',
      department: '개발 1팀',
      position: '사원',
    },
    {
      name: '홍길동',
      department: '개발 1팀',
      position: '부장',
    },
    {
      name: '파파고',
      department: '개발 2팀',
      position: '팀장',
    },
    {
      name: '알파고',
      department: '개발 3팀',
      position: '사원',
    },
  ];

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
          <Space direction="horizontal">
            <Button
              type="default"
              shape="circle"
              icon={<ArrowLeftOutlined />}
              onClick={() => setTransitionState(!transitionState)}
              style={{
                marginBottom: '10px',
              }}
            />
            <DatePicker onChange={date => handleDate(date)} />
          </Space>
          <Descriptions
            bordered
            style={{
              marginBottom: '10px',
            }}
          >
            <Descriptions.Item label="층">{'5층'}</Descriptions.Item>
            <Descriptions.Item label="이름">{'회의실7'}</Descriptions.Item>
            <Descriptions.Item label="인원">{'3명'}</Descriptions.Item>
          </Descriptions>
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
              <Table
                size="middle"
                tableLayout="fixed"
                columns={columns}
                dataSource={rows}
                pagination={false}
                sticky
                scroll={{ y: ref.current?.clientHeight }}
              />
            </div>
            <div
              style={{
                flex: 1,
                flexShrink: 0,
                flexBasis: '100px',
              }}
            >
              <RangePicker
                defaultValue={[
                  moment('2015/01/01', 'YYYY-MM-DD HH:mm'),
                  moment('2015/01/01', 'YYYY-MM-DD HH:mm'),
                ]}
                format={'YYYY-MM-DD HH:mm'}
                disabled
              />
              <Input size="large" placeholder="회의 주제를 입력해주세요." />
              <Search
                placeholder="추가하실 회원을 입력해주세요."
                enterButton="검색"
                size="large"
              />
              <List
                itemLayout="horizontal"
                dataSource={data}
                renderItem={(item: any) => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={
                        <Avatar src="https://joeschmoe.io/api/v1/random" />
                      }
                      title={<b>{item.name}</b>}
                      description={`${item.department} / ${item.position}`}
                    />
                  </List.Item>
                )}
              />
            </div>
          </div>
        </div>
      )}
    </Transition>
  );
};
