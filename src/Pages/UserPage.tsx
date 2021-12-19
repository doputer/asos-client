import { Layout } from 'antd';
import { ContentContainer } from 'Components/ContentContainer';
import { Menubar } from 'Components/Menubar';
import { Outlet } from 'react-router-dom';

const UserPage = () => {
  return (
    <Layout className="content-container">
      <Menubar />
      <ContentContainer>
        <Outlet />
      </ContentContainer>
    </Layout>
  );
};

export default UserPage;
