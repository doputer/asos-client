import 'Assets/Styles/shared.scss';

import { Desktop } from 'Components/Common/Desktop';
import { Logo } from 'Components/Logo';
import { SignIn } from 'Components/SignIn';

const SignInPage = () => {
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
        <SignIn />
      </div>
    </div>
  );
};

export default SignInPage;
