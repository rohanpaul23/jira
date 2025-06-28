import React, { useState, FormEvent } from 'react';
import { css } from '@emotion/react';
import * as Label from '@radix-ui/react-label';
import { Card, Text, Button } from '@radix-ui/themes';
import { useTranslation } from 'react-i18next';

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

const Signup: React.FC = () => {

  const [t] = useTranslation()
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });
      const data = await res.json();
      console.log('Signup success:', data);
    } catch (err) {
      console.error('Signup failed:', err);
    }
  };

  return (
    <div css={containerStyle}>
      <Card size="2" variant="surface" css={cardStyle}>
        <div css={innerStyle}>
          <Text as="h2" size="3" weight="bold">{t('signup.createAnAccount')}</Text>
          <form css={formStyle} onSubmit={handleSubmit}>
            <Label.Root htmlFor="username">{t('signup.username')}</Label.Root>
            <input
              id="username"
              css={inputStyle}
              placeholder="Your username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <Label.Root htmlFor="email">{t('signup.email')}</Label.Root>
            <input
              id="email"
              css={inputStyle}
              placeholder="you@example.com"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Label.Root htmlFor="password">{t('signup.password')}</Label.Root>
            <input
              id="password"
              css={inputStyle}
              placeholder="********"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button type="submit" size="2" css={css`width: 100%; margin-top: 0.5rem;`}>{t('signup.signup')}</Button>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default Signup;

