import { css } from '@emotion/react';
import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Alert, Button, Modal } from 'react-bootstrap';
import { useCreateWorkspace } from '../../useQueries/useCreateWorkspace';
import { useTranslation } from 'react-i18next';
import { FaInfoCircle } from 'react-icons/fa';
import './settings.scss';
import { useSelector } from 'react-redux';
import useDeleteWorkspace from '../../useQueries/useDeleteWorkSpace';
import { styles } from './styles';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { IoCopySharp } from 'react-icons/io5';
import CreateOrEditWorkspace from '../Workspaces/CreateWorkpace';
import { toast } from 'react-toastify';


const Settings = () => {
  const [t] = useTranslation();
  const { mutate } = useCreateWorkspace();
  const { mutate: mutationToDeleteWorkSpace } = useDeleteWorkspace();
  const [deleteWorkSpace, setDeleteWorkspace] = useState(false);
  const [editWorkSpace, setEditWorkSpace] = useState(false);
  const selectedWorkspace = useSelector(
    (state) => state.workspace.selectedWorkspace,
  );
  const [generatedInviteLink, setGeneratedInvitedLink] = useState("");
  const allWorkSpaces = useSelector((state) => state.workspace.allWorkSpaces);

  console.log('allWorkSpaces', allWorkSpaces);

  useEffect(()=>{
    setGeneratedInvitedLink(selectedWorkspace?.inviteLink)
  },[selectedWorkspace])

  const deleteWorkSpacePermanently = async () => {
    try {
      await mutationToDeleteWorkSpace({ workspaceId: selectedWorkspace._id });
    } catch (error) {
      console.error('Error deleting workspace:', error);
    }
  };


async function regenerateInvite() {
  const token =   localStorage.getItem('token');
  const res = await fetch(`/api/workspaces/${selectedWorkspace?._id}/invite/regenerate`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || 'Failed to regenerate invite code');
  }

  const { inviteLink } = await res.json();
  setGeneratedInvitedLink(inviteLink)
}

  const copyToClipboard = () => {
    document.body.focus(); // Add this line to focus the document
    navigator.clipboard.writeText(generatedInviteLink).then(() => {
      toast.success("Invite code copied to clipboard!");
    });
  };

  return (
    <>
      {deleteWorkSpace && (
        <Modal show={true} appElement={document.getElementById('root')}>
          <Modal.Header>{t('workspaces.deleteWorkSpace')}</Modal.Header>
          <Modal.Body>{t('workspaces.deleteWorkspaceConfirmation')}</Modal.Body>
          <Modal.Footer>
            <Button
              disabled={false}
              onClick={() => setDeleteWorkspace(false)}
              variant="outline-light"
              className="cancel-btn"
            >
              {t('workspaces.cancel')}
            </Button>
            <Button
              css={css`
                background: #1d4ed8;
                color: white;
              `}
              type="submit"
              onClick={() => deleteWorkSpacePermanently()}
              disabled={false}
              variant="primary"
            >
              {t('workspaces.deleteWorkSpace')}
            </Button>
          </Modal.Footer>
        </Modal>
      )}
      {editWorkSpace && (
        <CreateOrEditWorkspace
          workspaces={allWorkSpaces}
          initialValues={initialValues}
          isEdit={true}
          show={true}
          handleClose={() => setEditWorkSpace(false)}
        />
      )}
      <div
        css={css({
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          gap: 30,
        })}
      >
        <div css={styles.workspaceDetailsContainer}>
          <div css={styles.workspaceDetailsTitle}>
            <h3>{t('workspaces.workspaceDetails')}</h3>
            <div>
              <FaEdit onClick={() => setEditWorkSpace(true)} />
              <MdDelete onClick={() => setDeleteWorkspace(true)} />
            </div>
          </div>
          <div css={styles.workspaceDetail}>
            <label>{t('workspaces.workspaceName')}</label>
            <div>{selectedWorkspace?.name}</div>
          </div>
          <div css={styles.workspaceDetail}>
            <label>{t('workspaces.workspaceDescription')}</label>
            <div>{selectedWorkspace?.description}</div>
          </div>
        </div>
        <div css={styles.workspaceDetailsContainer}>
          <div css={styles.inviteMembers}>
            <div>
              <h4>{t('workspaces.inviteMembers')}</h4>
            </div>
            <div>{t('workspaces.useTheInviteLink')}</div>
          </div>
          <div css={styles.inviteLink}>
            <input
              css={styles.inviteLinkInput}
              type="text"
              value={generatedInviteLink}
              disabled={true}
            />
            <IoCopySharp onClick={() => copyToClipboard()} />
          </div>
          <div
            css={css({
              display: 'flex',
              justifyContent: 'flex-end',
            })}
          >
            <Button
              css={css`
                background: var(--button-color);
                color: white;
              `}
              type="submit"
              onClick={() => regenerateInvite()}
              disabled={false}
              variant="primary"
              className="submit-btn"
            >
              {t('workspaces.resetInviteLink')}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;
