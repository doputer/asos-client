import './index.scss';

import Layout, { Content, Header } from 'antd/lib/layout/layout';
import { PasswordForm } from 'Components/PasswordForm';

export const MyPageContainer = () => {
  return (
    <Layout className="mypage-container">
      <Header className="container-header">
        <h1 className="header-title">내정보</h1>
      </Header>
      <Content className="container-content">
        <div className="flex-center content-cover">
          <PasswordForm />
        </div>
      </Content>
    </Layout>
  );
};
