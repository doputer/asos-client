import { message, Table } from 'antd';
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

  const handleSelectException = (
    startIndex: number,
    endIndex: number = startIndex,
  ) => {
    const min = Math.min(startIndex, endIndex);
    const max = Math.max(startIndex, endIndex);

    for (let i = min; i <= max; i++) {
      const row = rows.find(row => row.key === i);
      if (row?.topic !== undefined) throw Error();
    }

    return;
  };

  const handleSelect = (index: number) => {
    try {
      if (stage === 0) {
        handleSelectException(index);

        setSelect({ start: index, end: index });
        setStage(1);
      } else if (stage === 1) {
        handleSelectException(select.start, index);

        if (select.start === index) {
          clearSelect();
          return;
        }

        const min = Math.min(select.start, index);
        const max = Math.max(select.start, index);

        setSelect({ start: min, end: max });
        setStage(2);
      } else if (stage === 2) clearSelect();
    } catch (e: any) {
      message.error('선택할 수 없습니다.');
    }
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

  const getParticipants = (user: any = null, participants: any = null) => {
    if (user === null) return '';
    if (participants === null) return user.name;

    const participantNames = participants
      .map((participant: any) => participant.user.name)
      .join(', ');
    return user.name + ', ' + participantNames;
  };

  useEffect(() => {
    setRows(
      timeTable.map((time: any, index: number): IRow => {
        return {
          key: index,
          time: `${moment(time.start_time).format('HH:mm')} - ${moment(
            time.end_time,
          ).format('HH:mm')}`,
          topic: time.topic,
          participant: getParticipants(time.user, time.participants),
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
        getCheckboxProps: (record: any) => {
          return {
            disabled: record.topic !== undefined,
          };
        },
      }}
      sticky
      scroll={{ y: tableHeight - 47 }}
      onRow={(record: IRow) => {
        return {
          onClick: () => handleSelect(record.key),
          style: {
            backgroundColor: record.topic !== undefined ? '#fff2f0' : '#fff',
          },
        };
      }}
    />
  );
};
