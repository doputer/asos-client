import { Content, Header } from 'antd/lib/layout/layout';

export const SearchContainer = () => {
  return (
    <>
      <Header style={{ paddingLeft: 24, backgroundColor: 'transparent' }}>
        <h1
          style={{
            fontSize: '1.75rem',
            marginBottom: '0px',
          }}
        >
          회원 검색
        </h1>
      </Header>
      <Content style={{ margin: '24px' }}>
        <div
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: 'yellowgreen',
            borderRadius: '8px',
          }}
        ></div>
      </Content>
    </>
  );
};
