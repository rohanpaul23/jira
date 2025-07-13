import React from 'react';
import { css } from '@emotion/react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, Text, Button } from '@radix-ui/themes';
import Logo from './components/Logo';
import Login from './Login';
import Signup from './Signup';
import './../styles/main.scss';
import { useTranslation } from 'react-i18next';

const mainContainer = css`
  min-height: 100vh;
  backgound: inherit;
  display: flex;
  flex-direction: column;
`;

const cardStyle = css`
  width: 400px;
`;
const innerContainer = css`
  padding: 1.5rem;
`;
const textMargin = css`
  margin-top: 0.5rem;
`;
const buttonGroup = css`
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
`;

const Landing: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [t] = useTranslation();

  const renderComponent = () => {
    if (location.pathname === '/login') {
      return <Login />;
    } else if (location.pathname === '/signup') {
      return <Signup />;
    } else {
      return <Login />;
    }
  };

  const renderLoginOrSignup = () => {
    return (
      <Button
        size="2"
        css={css`
          background: var(--button-color);
          color: white;
        `}
        onClick={() =>
          navigate(location.pathname === '/login' ? '/signup' : '/login')
        }
      >
        {location.pathname === '/login' || location.pathname === '/'
          ? t('authentication.signUp')
          : t('authentication.logIn')}
      </Button>
    );
  };

  return (
    <div css={mainContainer}>
      <div
        css={css`
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px;
        `}
      >
        <Logo />
        {renderLoginOrSignup()}
      </div>
      {renderComponent()}
    </div>
  );
};

export default Landing;
