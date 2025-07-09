import React, { useState, FormEvent } from 'react';
import { css } from '@emotion/react';
import * as Label from '@radix-ui/react-label';
import { Card, Text, Button } from '@radix-ui/themes';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const containerStyle = css`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 9
`;
const cardStyle = css`width: 400px;`;
const innerStyle = css`padding: 1.5rem;`;
const formStyle = css`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;
`;
const inputStyle = css`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
`;

const signUpErrorMessage = css`
  color: red !important;
  margin: 0.5rem 0;
`;

const Signup: React.FC = () => {

  const [t] = useTranslation()
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [signUpError, setSignUpError] = useState<string>('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });
      console.log("Res",res)
     
      const data = await res.json();
      if (!res.ok && data.msg === 'User already exists') { 
        throw "A user with the entered email already exists";
      }
      else if(!res.ok) throw "Signup failed"
      localStorage.setItem('token', data.token);
      navigate("/dashboard")
    } catch (err) {
      console.error('Signup failed:', err);
      setSignUpError(err)
    }
  };

  return (
    <div css={containerStyle}>
      <Card size="2" variant="surface" css={cardStyle}>
        <div css={innerStyle}>
          <Text as="h2" size="3" weight="bold">{t('authentication.createAnAccount')}</Text>
          {signUpError ? <div css={signUpErrorMessage}>{signUpError}</div> : <></>}
          <form css={formStyle} onSubmit={handleSubmit}>
            <Label.Root htmlFor="username">{t('authentication.userName')}</Label.Root>
            <input
              id="username"x
              css={inputStyle}
              placeholder={t('authentication.userNamePlaceholder')}
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <Label.Root htmlFor="email">{t('authentication.email')}</Label.Root>
            <input
              id="email"
              css={inputStyle}
              placeholder={t('authentication.emailPlaceholder')}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Label.Root htmlFor="password">{t('authentication.password')}</Label.Root>
            <input
              id="password"
              css={inputStyle}
              placeholder={t('authentication.passwordPlaceholder')}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button type="submit" size="2" css={css`width: 100%; margin-top: 0.5rem;`}>{t('authentication.signUp')}</Button>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default Signup;

