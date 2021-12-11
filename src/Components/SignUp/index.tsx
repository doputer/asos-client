import './index.scss';

import { Button, Input, message, Select, Space } from 'antd';
import { postUser } from 'Apis/userApi';
import { Departments } from 'Constants/departments';
import { Positions } from 'Constants/positions';
import useAsync from 'Hooks/useAsync';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  GlobalOutlined,
  LockOutlined,
  PhoneOutlined,
  TagOutlined,
  UserOutlined,
} from '@ant-design/icons';

export const SignUp = () => {
  const { Option } = Select;

  const navigate = useNavigate();

  const { error, execute: signup } = useAsync(postUser);

  useEffect(() => {
    if (error) message.error('회원 가입에 실패했습니다.', 0.5);
  }, [error]);

  const [register, setRegister] = useState({
    email: '',
    name: '',
    password: '',
    employeeId: '',
    tel: '',
    department: '',
    position: '',
  });
  const [repassword, setRepassword] = useState('');

  const repasswordRef = useRef<HTMLInputElement>(null);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;

    setRegister({ ...register, [name]: value });
  };

  const handleClick = async () => {
    if (register.password !== repassword) {
      if (repasswordRef.current !== null) repasswordRef.current.focus();

      message.error('비밀번호가 일치하지 않습니다.');
      return;
    }

    const result = await signup(register);

    if (result)
      message.success('회원 가입에 성공했습니다.', 0.5, () => navigate('/'));
  };

  return (
    <Space className="signup-form" direction="vertical">
      <div className="flex-column-center signup-label">
        <h1 className="flex-column-center">
          회원가입
          <div className="label-border"></div>
        </h1>
      </div>

      <Space className="input-container" direction="vertical">
        <Input
          addonBefore={<GlobalOutlined />}
          size="large"
          className="signup-input"
          placeholder="이메일을 입력해주세요."
          name="email"
          value={register.email}
          onChange={handleInput}
        />
        <Input
          addonBefore={<UserOutlined />}
          size="large"
          className="signup-input"
          placeholder="이름을 입력해주세요."
          name="name"
          value={register.name}
          onChange={handleInput}
        />
        <Input.Password
          addonBefore={<LockOutlined />}
          size="large"
          className="signup-input"
          placeholder="비밀번호를 입력해주세요."
          name="password"
          value={register.password}
          onChange={handleInput}
        />
        <Input.Password
          addonBefore={<LockOutlined />}
          size="large"
          className="signup-input"
          placeholder="비밀번호를 다시 한번 입력해주세요."
          value={repassword}
          onChange={e => {
            setRepassword(e.target.value);
          }}
          ref={repasswordRef}
        />
        <Input
          addonBefore={<TagOutlined />}
          size="large"
          className="signup-input"
          placeholder="사원번호를 입력해주세요."
          name="employeeId"
          value={register.employeeId}
          onChange={handleInput}
        />
        <Input
          addonBefore={<PhoneOutlined />}
          size="large"
          className="signup-input"
          placeholder="전화번호를 입력해주세요."
          name="tel"
          value={register.tel}
          onChange={handleInput}
        />
        <Space
          className="select-container"
          direction="horizontal"
          align="baseline"
        >
          <Select
            className="signup-select"
            size="large"
            defaultValue="부서"
            onChange={value => {
              setRegister({ ...register, department: value });
            }}
          >
            {Departments.map((department, index) => (
              <Option value={department} key={index}>
                {department}
              </Option>
            ))}
          </Select>
          <Select
            className="signup-select"
            size="large"
            defaultValue="직급"
            onChange={value => {
              setRegister({ ...register, position: value });
            }}
          >
            {Positions.map((position, index) => (
              <Option value={position} key={index}>
                {position}
              </Option>
            ))}
          </Select>
        </Space>
      </Space>

      <Button
        type="primary"
        size="large"
        className="signup-button"
        onClick={() => {
          handleClick();
        }}
      >
        회원가입
      </Button>
    </Space>
  );
};
