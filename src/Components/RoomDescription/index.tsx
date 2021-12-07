import { Descriptions } from 'antd';

export const RoomDescription = ({ room }: { room: any }) => {
  return (
    <Descriptions
      bordered
      style={{
        marginBottom: '10px',
      }}
    >
      <Descriptions.Item label="층">{room.floor}</Descriptions.Item>
      <Descriptions.Item label="이름">{room.name}</Descriptions.Item>
      <Descriptions.Item label="인원">{room.max}</Descriptions.Item>
    </Descriptions>
  );
};
