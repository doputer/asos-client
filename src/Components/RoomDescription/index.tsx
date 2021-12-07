import { Descriptions } from 'antd';

export const RoomDescription = () => {
  return (
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
  );
};
