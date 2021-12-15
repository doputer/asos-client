import { Descriptions } from 'antd';
import { getUser } from 'Apis/userApi';
import { Spinner } from 'Components/Spin';
import useAsync from 'Hooks/useAsync';
import { useEffect } from 'react';

export const MyPageDescription = ({ userId }: { userId: number }) => {
  const { loading, data: user, execute } = useAsync(getUser);

  useEffect(() => {
    execute(userId);
  }, []);

  return (
    <>
      {loading && !user !== null ? (
        <Spinner />
      ) : (
        <Descriptions bordered column={1}>
          <Descriptions.Item label="이름">{user?.name}</Descriptions.Item>
          <Descriptions.Item label="이메일">{user?.email}</Descriptions.Item>
          <Descriptions.Item label="사원번호">
            {user?.employeeId}
          </Descriptions.Item>
          <Descriptions.Item label="전화번호">{user?.tel}</Descriptions.Item>
          <Descriptions.Item label="부서">{user?.department}</Descriptions.Item>
          <Descriptions.Item label="직급">{user?.position}</Descriptions.Item>
        </Descriptions>
      )}
    </>
  );
};
