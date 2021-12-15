import { Avatar, Button, Card, Divider, Empty, Form, Input, Space } from 'antd';
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
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '10px',
          }}
        >
          <div
            style={{
              flex: '1 0 auto',
            }}
          >
            <Card
              style={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
              }}
            >
              <Space
                style={{
                  width: '100%',
                  height: 'inherit',
                  justifyContent: 'space-evenly',
                }}
              >
                <Avatar
                  size={{
                    xs: 32, // xs: 24
                    sm: 32,
                    md: 40,
                    lg: 64,
                    xl: 64, // xl: 80
                    xxl: 64, // xxl: 100
                  }}
                  src="https://i.pravatar.cc/500"
                />
                <span>
                  <b
                    style={{
                      fontSize: '1.5em',
                    }}
                  >
                    {'김 도 현 '}
                  </b>
                  님
                </span>
                <Button type="ghost" shape="round">
                  수정
                </Button>
              </Space>

              <Divider />

              <Form layout="horizontal">
                <Form.Item label="이메일">
                  <Input defaultValue={user?.email} disabled />
                </Form.Item>
                <Form.Item label="비밀번호">
                  <Input.Password
                    visibilityToggle={false}
                    defaultValue={'00000000'}
                    disabled
                  />
                </Form.Item>
                <Form.Item label="비밀번호 확인">
                  <Input.Password
                    visibilityToggle={false}
                    defaultValue={'00000000'}
                    disabled
                  />
                </Form.Item>
                <Form.Item label="사원번호">
                  <Input defaultValue={user?.employeeId} disabled />
                </Form.Item>
                <Form.Item label="전화번호">
                  <Input defaultValue={user?.tel} disabled />
                </Form.Item>
                <Form.Item label="부서">
                  <Input defaultValue={user?.department} disabled />
                </Form.Item>
                <Form.Item label="직책">
                  <Input defaultValue={user?.position} disabled />
                </Form.Item>
              </Form>
            </Card>
          </div>
          <div
            className="flex-center"
            style={{
              flex: 7,
              border: '1px dashed #c2c2c2',
            }}
          >
            <Empty
              description={
                <>
                  <div>
                    <span style={{ color: '#4895ef' }}>좌석</span> 혹은{' '}
                    <span style={{ color: '#4895ef' }}>회의실</span>의 위치가
                  </div>
                  <div>이곳에 나타납니다.</div>
                </>
              }
              style={{
                margin: '36px',
              }}
            />
          </div>
        </div>
      )}
    </>
  );
};
