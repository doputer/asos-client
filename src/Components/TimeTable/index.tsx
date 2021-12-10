import { message, Table } from 'antd';
import { IParticipant } from 'Interfaces/IParticipant';
import { ITimeRange } from 'Interfaces/ITimeRange';
import { ITimeTable } from 'Interfaces/ITimeTable';
import { IUser } from 'Interfaces/IUser';
import { ITimeTableRow } from 'Interfaces/Tables/ITimeTableRow';
import { useEffect, useState } from 'react';
import { getFormatDate } from 'Utils/moment';

export const TimeTable = ({
  timeTable,
  boxHeight,
  setSelectTime,
}: {
  timeTable: ITimeTable[];
  boxHeight: number;
  setSelectTime: ({ startTime, endTime }: ITimeRange) => void;
}) => {
  const [rows, setRows] = useState<ITimeTableRow[]>([]);

  const [selectedRowKeys, setSelectedRowKeys] = useState<number[]>([]);
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
        (_: number, index: number) => select.start + index,
      ),
    );

    const startRow = rows.find(row => row.key === select.start);
    const endRow = rows.find(row => row.key === select.end);

    if (startRow && endRow)
      setSelectTime({ startTime: startRow.startTime, endTime: endRow.endTime });
  }, [select]);

  const getParticipants = (
    user: IUser | null = null,
    participants: IParticipant[] | null = null,
  ) => {
    if (user === null) return '';
    if (participants === null) return user.name;

    const participantNames = participants
      .map((participant: IParticipant) => participant.user.name)
      .join(', ');
    return user.name + ', ' + participantNames;
  };

  useEffect(() => {
    setRows(
      timeTable.map((time: ITimeTable, index: number): ITimeTableRow => {
        return {
          key: index,
          time: `${getFormatDate(time.start_time, 'HH:mm')} - ${getFormatDate(
            time.end_time,
            'HH:mm',
          )}`,
          topic: time.topic,
          participant: getParticipants(time.user, time.participants),
          startTime: time.start_time,
          endTime: time.end_time,
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
        getCheckboxProps: (record: ITimeTableRow) => {
          return {
            disabled: record.topic !== undefined,
          };
        },
      }}
      sticky
      scroll={{ y: boxHeight - 47 }}
      onRow={(record: ITimeTableRow) => {
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
