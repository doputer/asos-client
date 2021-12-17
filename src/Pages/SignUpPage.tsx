import { Desktop } from 'Components/Common/Desktop';
import { Logo } from 'Components/Logo';
import { SignUp } from 'Components/SignUp';

const SignUpPage = () => {
  return (
    <div style={{ display: 'flex', width: '100vw', height: '100vh' }}>
      <Desktop>
        <div
          className={'flex-center'}
          style={{
            flex: 1,
            backgroundColor: '#4895ef',
          }}
        >
          <Logo width={360} />
        </div>
      </Desktop>

      <div
        className={'flex-center'}
        style={{
          flex: 1,
          backgroundColor: '#fff',
          padding: '10px',
        }}
      >
        <SignUp />
      </div>
    </div>
  );
};

export default SignUpPage;
