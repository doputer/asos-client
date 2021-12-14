import './index.scss';

import { Layout } from 'antd';

const { Content } = Layout;

export const ContentContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <Layout className="content-container">
      <Content className="container-content">{children}</Content>
    </Layout>
  );
};
