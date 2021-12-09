import './index.scss';

import Layout, { Content, Header } from 'antd/lib/layout/layout';
import { QuestionCollapse } from 'Components/QuestionCollapse';

export const QuestionContainer = () => {
  return (
    <Layout className="question-container">
      <Header className="container-header">
        <h1 className="header-title">문의하기</h1>
      </Header>
      <Content className="container-content">
        <div className="content-cover">
          <QuestionCollapse />
        </div>
      </Content>
    </Layout>
  );
};
