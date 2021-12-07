import { Table } from 'antd';
import moment from 'moment';
import { useEffect, useState } from 'react';

interface IRow {
  key: number;
  time: string;
  topic: string;
  participant: string;
}

export const TimeTable = ({
  timeTable,
  tableRef,
}: {
  timeTable: any;
  tableRef: any;
}) => {
  const [rows, setRows] = useState<IRow[]>([]);

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

  return (
    <Table
      size="middle"
      tableLayout="fixed"
      columns={columns}
      dataSource={rows}
      pagination={false}
      sticky
      scroll={{ y: tableRef.current?.clientHeight }}
    />
  );
};
