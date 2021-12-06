import './index.scss';

import Layout, { Content, Header } from 'antd/lib/layout/layout';
import { SearchBar } from 'Components/SearchBar';

export const SearchContainer = () => {
  return (
    <Layout className="search-container">
      <Header className="container-header">
        <h1 className="header-title">회원 검색</h1>
      </Header>
      <Content className="container-content">
        <div
          className="content-cover"
          style={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <SearchBar />
        </div>
      </Content>
    </Layout>
  );
};
