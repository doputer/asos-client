import { Layout } from 'antd';
import { ContentContainer } from 'Components/ContentContainer';
import { Sidebar } from 'Components/Sidebar';
import { Outlet } from 'react-router-dom';

const UserPage = () => {
  return (
    <Layout style={{ height: '100%' }}>
      <Sidebar />
      <ContentContainer>
        <Outlet />
      </ContentContainer>
    </Layout>
  );
};

export default UserPage;
