import { Logo } from 'Components/Logo';
import { SignUp } from 'Components/SignUp';

const SignUpPage = () => {
  return (
    <div style={{ display: 'flex', width: '100vw', height: '100vh' }}>
      <div
        className={'flex-center'}
        style={{
          flex: 1,
          backgroundColor: '#4895ef',
        }}
      >
        <Logo width={360} />
      </div>
      <div
        className={'flex-center'}
        style={{
          flex: 1,
          backgroundColor: '#fff',
        }}
      >
        <SignUp />
      </div>
    </div>
  );
};

export default SignUpPage;
