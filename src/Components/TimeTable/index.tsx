import { Table } from 'antd';
import moment from 'moment';
import { useEffect, useState } from 'react';

interface IRow {
  key: number;
  time: string;
  topic: string;
  participant: string;
  startTime: any;
  endTime: any;
}

export const TimeTable = ({
  timeTable,
  tableHeight,
  setSelectTime,
}: {
  timeTable: any;
  tableHeight: any;
  setSelectTime: any;
}) => {
  const [rows, setRows] = useState<IRow[]>([]);

  const [selectedRowKeys, setSelectedRowKeys] = useState<any>([]);
  const [stage, setStage] = useState(0);
  const [select, setSelect] = useState({
    start: -1,
    end: -1,
  });

  const clearSelect = () => {
    setSelect({ start: -1, end: -1 });
    setStage(0);
  };

  const handleSelect = (index: number) => {
    if (stage === 0) {
      setSelect({ start: index, end: index });
      setStage(1);
    } else if (stage === 1) {
      if (select.start === index) {
        clearSelect();
        return;
      }

      const min = select.start > index ? index : select.start;
      const max = select.start > index ? select.start : index;

      setSelect({ start: min, end: max });
      setStage(2);
    } else if (stage === 2) clearSelect();
  };

  useEffect(() => {
    setSelectedRowKeys(
      Array.from(
        { length: select.end - select.start + 1 },
        (_: any, index: any) => select.start + index,
      ),
    );

    const startRow = rows.find(row => row.key === select.start);
    const endRow = rows.find(row => row.key === select.end);

    setSelectTime({ startTime: startRow?.startTime, endTime: endRow?.endTime });
  }, [select]);

  useEffect(() => {
    setRows(
      timeTable.map((time: any, index: number): IRow => {
        return {
          key: index,
          time: `${moment(time.start_time).format('HH:mm')} - ${moment(
            time.end_time,
          ).format('HH:mm')}`,
          topic: '회의 주제',
          participant: '김도현, 김도현, 김도현, 김도현',
          startTime: moment(time.start_time),
          endTime: moment(time.end_time),
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
      rowSelection={{
        selectedRowKeys: selectedRowKeys,
        type: 'checkbox',
        renderCell: () => false,
        hideSelectAll: true,
      }}
      sticky
      scroll={{ y: tableHeight - 47 }} // 47은 테이블 헤더 높이
      onRow={(record: IRow) => {
        return {
          onClick: () => handleSelect(record.key),
        };
      }}
    />
  );
};
