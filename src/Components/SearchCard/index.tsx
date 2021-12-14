import { Card } from 'antd';
import { SearchUser } from 'Components/SearchUser';

export const SearchCard = () => {
  return (
    <Card
      className="search-card card-cover"
      bordered
      title={<h1 className="card-title">회원 검색</h1>}
      size="small"
      bodyStyle={{
        flex: 1,
        overflow: 'auto',
      }}
    >
      <SearchUser />
    </Card>
  );
};
