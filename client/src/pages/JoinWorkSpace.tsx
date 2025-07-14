// frontend/src/pages/JoinWorkspace.tsx
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { css } from '@emotion/react';
import { Button, Card } from 'react-bootstrap';
import { useTranslation, Trans } from 'react-i18next';
import { useQueryClient } from '@tanstack/react-query';

export default function JoinWorkspace() {
  const { isAuthenticated, token } = useAuth();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { search, pathname } = useLocation();
  const [isJoining, setIsJoining] = useState(false);
  const [workSpaceToJoin, setWorkSpaceToJoin] = useState('');
  const params = new URLSearchParams(search);
  const inviteToken = params.get('inviteToken');

  useEffect(() => {
    if (!inviteToken) {
      return navigate('/', { replace: true }); // no token → back home
    }
    if (!isAuthenticated) {
      const redirectUrl = encodeURIComponent(pathname + search);
      navigate(`/login?redirect=${redirectUrl}`, { replace: true });
      return;
    }

    fetch(`/api/workspaces/workspacetoken/${inviteToken}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch workspace details');
        return res.json();
      })
      .then((res) => {
        setWorkSpaceToJoin(res);
      })
      .catch(() => {
        setStatus('error');
      });
  }, [isAuthenticated, inviteToken, token, navigate, pathname, search]);

  const joinWorkSpace = () => {
    setIsJoining(true)
    fetch(`/api/workspaces/join`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ inviteToken }),
    })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to join');
        return res.json();
      })
      .then(() => {
        setIsJoining(false)
        queryClient.invalidateQueries('workspaces');
        navigate('/dashboard', { replace: true }); // or wherever makes sense
      })
      .catch(() => {
        setStatus('error');
      });
  };

  return (
    <div
      css={css({
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        gap: 30,
      })}>
      <Card style={{ width: '30rem' }}>
        <Card.Body>
          <Card.Title>{t('workspaces.joinWorkSpaceTitle')}</Card.Title>
          <Card.Text>
            {t('workspaces.joinWorkSpace', {
              workspaceName: workSpaceToJoin?.name,
            })}
          </Card.Text>
        </Card.Body>
        <Card.Footer css={css({
          display: "flex",
          justifyContent: "flex-end",
          gap: 10
        })}>
          <Button
            variant="secondary"
            onClick={() => console.log('Cancel clicked')}>
            {t('workspaces.cancel')}
          </Button>
          <Button css={css`
                    background: var(--button-color);
                    color: white;
                  `}
                  variant="primary" onClick={() => joinWorkSpace()}>
            {t('workspaces.joinWorkSpaceTitle')}
          </Button>
        </Card.Footer>
      </Card>
    </div>
  );
}
