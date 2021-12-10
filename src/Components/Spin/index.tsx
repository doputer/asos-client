import { Spin } from 'antd';

import { LoadingOutlined } from '@ant-design/icons';

export const Spinner = ({ size = 24 }: { size?: number }) => {
  return (
    <Spin indicator={<LoadingOutlined style={{ fontSize: size }} spin />} />
  );
};
