import { Descriptions } from 'antd';
import { IRoomRow } from 'Interfaces/Tables/IRoomRow';

export const RoomDescription = ({ room }: { room: IRoomRow }) => {
  return (
    <Descriptions bordered>
      <Descriptions.Item label="층">{room.floor}</Descriptions.Item>
      <Descriptions.Item label="이름">{room.name}</Descriptions.Item>
      <Descriptions.Item label="인원">{room.max}</Descriptions.Item>
    </Descriptions>
  );
};
