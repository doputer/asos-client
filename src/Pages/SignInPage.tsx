import 'Assets/Styles/shared.scss';

import { Logo } from 'Components/Logo';
import { SignIn } from 'Components/SignIn';

const SignInPage = () => {
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
        <SignIn />
      </div>
    </div>
  );
};

export default SignInPage;
