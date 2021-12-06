import Layout, { Content, Header } from 'antd/lib/layout/layout';

export const QuestionContainer = () => {
  return (
    <Layout
      style={{
        background: '#fff',
      }}
    >
      <Header style={{ paddingLeft: 12, backgroundColor: 'transparent' }}>
        <h1
          style={{
            fontSize: '1.75rem',
            marginBottom: '0px',
          }}
        >
          문의하기
        </h1>
      </Header>
      <Content style={{ margin: '12px' }}>
        <div
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: 'yellowgreen',
            borderRadius: '8px',
          }}
        ></div>
      </Content>
    </Layout>
  );
};
